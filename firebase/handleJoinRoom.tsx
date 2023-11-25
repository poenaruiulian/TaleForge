import { child, get, ref, set } from "firebase/database";
import { auth, database } from "./firebase";

export const handleJoinRoom = async ({ roomData }: { roomData: {} }) => {
  const user = await get(child(ref(database), "users/" + auth.currentUser.uid));

  if (user.exists()) {
    roomData["joinerUsername"] = user.val()["username"];
    roomData["joinerID"] = auth.currentUser.uid;
    roomData["joinedDate"] = new Date().toString();

    let roomRef = ref(database, "story-rooms/" + roomData["storyroomID"]);
    set(roomRef, roomData).then(() => console.log("Successfully joined"));
  }
};
