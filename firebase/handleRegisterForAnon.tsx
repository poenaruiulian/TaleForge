import { child, get, ref, set } from "firebase/database";
import { auth, database } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setIsAnonAsync } from "./handleAnonRegLog";

export const handleRegisterForAnon = async ({
  email,
  username,
  password,
  anonUserId,
}: {
  email: string;
  username: string;
  password: string;
  anonUserId: string;
}) => {
  try {
    const snapshot = await get(child(ref(database), "users/" + anonUserId));

    if (snapshot.exists()) {
      let anonUser = snapshot.val();
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredentials) => {
          const usersRef = ref(database, "users/" + userCredentials.user.uid);
          const userData = {
            username,
            email,
            colorOfChat: "#F9E0BB",
            userID: userCredentials.user.uid,
            soloRoomID: anonUser["soloRoomID"],
            anonId: anonUserId,
            listOfStoryroomsCreatedTotal: [0],
            listOfStoryroomsCurrentlyOpened: [0],
            listOfStoryroomsFinished: [0],
            dateOfAccount: anonUser["dateOfAccount"],
            dateOfJoining: new Date().toString(),
          };

          set(usersRef, userData).then(() => {
            let anonUserRef = ref(database, "users/" + anonUserId);
            set(anonUserRef, null).then(() =>
              // specify that the user is no longer anon
              setIsAnonAsync({ isUserAnon: false }),
            );
          });
        },
      );
    }
  } catch (err) {
    console.log("Erorare la sign out anon " + err);
  }
};
