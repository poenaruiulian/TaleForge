import { auth, database, firestore } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { collection, addDoc } from "firebase/firestore";
import { setIsAnonAsync } from "./handleAnonRegLog";

export const handleRegister = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredentials) => {
      const usersRef = ref(database, "users/" + userCredentials.user.uid);
      // we create an entrance in the Firestore to have an id for the chatbot
      await addDoc(collection(firestore, "bot_chats"), {
        "user-id": userCredentials.user.uid,
      })
        .then((documentRef) => {
          // we create the user data
          const userData = {
            username,
            email,
            colorOfChat: "#F9E0BB",
            userID: userCredentials.user.uid,
            chatWithBotID: documentRef.id,
            anonId: "",
            listOfSoryroomsCreatedTotal: [],
            listOfStoryroomsCurrentlyOpened: [],
            listOfStoryroomsFinished: [],
            dateOfAccount: new Date().toString(),
            dateOfJoining: new Date().toString(),
          };
          // and then we sent the user data in RTDB
          set(usersRef, userData).then(() =>
            setIsAnonAsync({ isUserAnon: false }).then(() =>
              console.log("Success register of " + userCredentials.user.uid),
            ),
          );
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
