import { ref, update } from "firebase/database";
import { database } from "./firebase";

export const handleEditName = ({
  user,
  newName,
}: {
  user: {};
  newName: string;
}) => {
  const userRef = ref(database, "users/" + user["userID"]);
  user["username"] = newName;
  update(userRef, user).then(() => console.log("Name updated with success"));
};
