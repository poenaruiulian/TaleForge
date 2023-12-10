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
            photo: "",
          };

          set(usersRef, userData).then(() => {
            let anonUserRef = ref(database, "users/" + anonUserId);
            set(anonUserRef, null).then(() =>
              // specify that the user is no longer anon
              setIsAnonAsync({ isUserAnon: false }).then(async () => {
                // here we replace all the ids in the messages of the solo room with the registered user one
                const soloRoom = await get(
                  child(ref(database), "solo-rooms/" + anonUser["soloRoomID"]),
                );
                const soloRoomRef = ref(
                  database,
                  "solo-rooms/" + anonUser["soloRoomID"],
                );
                if (soloRoom.exists()) {
                  let data = soloRoom.toJSON();
                  let aux = Object.values(soloRoom.toJSON()["listOfMessages"]);
                  aux
                    .filter((message) => message["userID"] !== "TaleForger")
                    .forEach(
                      (message) => (message["userID"] = auth.currentUser.uid),
                    );
                  data["listOfMessages"] = aux;

                  set(soloRoomRef, data).then(() =>
                    console.log("Modified the ids"),
                  );
                }
              }),
            );
          });
        },
      );
    }
  } catch (err) {
    console.log("Erorare la sign out anon " + err);
  }
};
