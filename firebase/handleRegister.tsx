import { auth, database, firestore } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { collection, addDoc } from "firebase/firestore";
import { setIsAnonAsync } from "./handleAnonRegLog";

// through all the function I've used the solo-rooms or bot entrance terms,
// they refer to the same thing, the RTDB reffernce for the openAI chat part
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
            soloRoomID: documentRef.id,
            anonId: "",
            listOfStoryroomsCreatedTotal: [0],
            listOfStoryroomsCurrentlyOpened: [0],
            listOfStoryroomsFinished: [0],
            dateOfAccount: new Date().toString(),
            dateOfJoining: new Date().toString(),
          };
          // and then we sent the user data in RTDB
          set(usersRef, userData).then(() =>
            // specify that the user is not anon
            setIsAnonAsync({ isUserAnon: false }).then(() => {
              // we create an entrance in the RTDB for the solo-chat room of the user
              const botsRef = ref(database, "solo-rooms/" + documentRef.id);
              const botData = {
                soloRoomID: documentRef.id,
                listOfMessages: [0],
              };
              set(botsRef, botData).then(() =>
                console.log(
                  "Register with success user:" + userCredentials.user.uid,
                ),
              );
            }),
          );
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
