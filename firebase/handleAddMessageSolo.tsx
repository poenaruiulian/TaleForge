import { child, get, ref, set } from "firebase/database";
import { auth, database } from "./firebase";
import { getAnonIdAsync } from "./handleAnonRegLog";

export const handleAddMessageSolo = async ({
  message,
  userID,
}: {
  message: string;
  userID: string;
}) => {
  let user;
  if (auth.currentUser !== null) {
    user = await get(child(ref(database), "users/" + auth.currentUser.uid));
    if (user.exists()) {
      let soloRef = ref(database, "solo-rooms/" + user.toJSON()["soloRoomID"]);
      let soloRoomData = await get(
        child(ref(database), "solo-rooms/" + user.toJSON()["soloRoomID"]),
      );
      if (soloRoomData.exists()) {
        let data = soloRoomData.toJSON();
        let aux = Object.values(data["listOfMessages"]);
        aux.push({
          message,
          userID,
          date: new Date().toString(),
        });
        data["listOfMessages"] = aux;

        set(soloRef, data).then();
      }
    }
  } else {
    getAnonIdAsync().then(async (userId) => {
      user = await get(child(ref(database), "users/" + userId));
      if (user.exists()) {
        let soloRef = ref(
          database,
          "solo-rooms/" + user.toJSON()["soloRoomID"],
        );
        let soloRoomData = await get(
          child(ref(database), "solo-rooms/" + user.toJSON()["soloRoomID"]),
        );
        if (soloRoomData.exists()) {
          let data = soloRoomData.toJSON();
          let aux = Object.values(data["listOfMessages"]);
          aux.push({
            message,
            userID,
            date: new Date().toString(),
          });
          data["listOfMessages"] = aux;

          set(soloRef, data).then();
        }
      }
    });
  }
};
