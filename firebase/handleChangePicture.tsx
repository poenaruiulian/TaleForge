import * as ImagePicker from "expo-image-picker";
import { database, storage } from "./firebase";
import { update, ref as refDB } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const handleChangePicture = async ({ user }: { user: {} }) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  const photoPath = result.assets[0].uri;
  let photoExt: string[] | string = photoPath.split(".");
  photoExt = photoExt[photoExt.length - 1].toString();

  const userPhotoRef = ref(
    storage,
    `${user["userID"]}/${user["userID"]}.${photoExt}`,
  );
  const photo = await fetch(photoPath);
  const blob = await photo.blob();

  uploadBytes(userPhotoRef, blob).then((snapshot) => {
    let imageUrl = getDownloadURL(snapshot.ref).then((result) => {
      const userRef = refDB(database, "users/" + user["userID"]);
      user["photo"] = result.toString();
      update(userRef, user).then(() =>
        console.log("Photo updated with success"),
      );
    });
  });
};
