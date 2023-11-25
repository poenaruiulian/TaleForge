import { addDoc, collection } from "firebase/firestore";
import { auth, database, firestore } from "./firebase";
import { child, get, ref, set } from "firebase/database";

export const handleRoomCreation = async ({
  title,
  numberOfDays,
  numberOfChars,
  firstSentence,
  tagsList,
}: {
  title: string;
  numberOfDays: number;
  numberOfChars: number;
  firstSentence: string;
  tagsList: string[];
}) => {
  const user = await get(child(ref(database), "users/" + auth.currentUser.uid));
  if (user.exists()) {
    await addDoc(collection(firestore, "strory-rooms"), {
      "user-id": auth.currentUser.uid,
    }).then((documentRef) => {
      const data = {
        title,
        numberOfDays,
        numberOfChars,
        tagsList,
        listOfOpenerSentences: [firstSentence],
        listOfJoinerSenteces: [""],
        openerID: auth.currentUser.uid,
        joinerID: "",
        createdDate: new Date().toString(),
        joinedDate: "",
        storyroomID: documentRef.id,
        openerUsername: user.val()["username"],
        joinerUsername: "",
      };

      let storyroomRef = ref(database, "story-rooms/" + documentRef.id);
      set(storyroomRef, data);
    });
  }
};
