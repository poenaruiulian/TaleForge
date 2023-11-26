import { ref, child, get, set } from "firebase/database";
import { database } from "./firebase";

export const handleSignOutAnon = async ({
  anonUserId,
}: {
  anonUserId: string;
}) => {
  try {
    const snapshot = await get(child(ref(database), "users/" + anonUserId));

    if (snapshot.exists()) {
      let anonUser = snapshot.val();

      const anonUserRoomRef = ref(
        database,
        "solo-rooms/" + anonUser["soloRoomID"],
      );
      const anonUserRef = ref(database, "users/" + anonUserId);
      set(anonUserRoomRef, null).then(() => set(anonUserRef, null));
    }
  } catch (err) {
    console.log("Erorare la sign out anon " + err);
  }
};
