import { auth, database } from "./firebase";
import { child, get, ref, update } from "firebase/database";

export const handleSendMessage = async ({
  roomData,
  message,
}: {
  roomData: {};
  message: string;
}) => {
  const room = await get(
    child(ref(database), "story-rooms/" + roomData["storyroomID"]),
  );

  if (room.exists()) {
    roomData = room.toJSON();
    let aux = Object.values(roomData["listOfMessages"]);
    aux.push({
      message: message,
      date: new Date().toString(),
      userid: auth.currentUser.uid,
    });
    roomData["listOfMessages"] = aux;
    let roomRef = ref(database, "story-rooms/" + roomData["storyroomID"]);
    update(roomRef, roomData).then(() =>
      console.log("Successfully sent message"),
    );
  }
};
