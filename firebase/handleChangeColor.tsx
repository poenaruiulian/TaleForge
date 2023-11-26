import { child, get, ref, set } from "firebase/database";
import { auth, database } from "./firebase";

export const handleChangeColor = async ({ color }: { color: string }) => {
  const user = await get(child(ref(database), "users/" + auth.currentUser.uid));
  if (user.exists()) {
    let data = user.toJSON();
    data["colorOfChat"] = color;

    let userRef = ref(database, "users/" + auth.currentUser.uid);
    set(userRef, data);
  }
};
