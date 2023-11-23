// this functions will handle the case when the user want to use the app anonymously
// on the future these should be replaced by a better method -> firebase anonymously usage

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { database, firestore } from "./firebase";
import { ref, set } from "firebase/database";

// this function saves in the memory if the user is anonymously logged or not
export const setIsAnonAsync = async ({
  isUserAnon,
}: {
  isUserAnon: boolean;
}) => {
  try {
    await AsyncStorage.setItem("isAnon", `${isUserAnon}`);
  } catch (err) {
    console.log(err);
  }
};
export const setAnonIdAsync = async ({
  userAnonId,
}: {
  userAnonId: string;
}) => {
  try {
    await AsyncStorage.setItem("userAnonId", `${userAnonId}`);
  } catch (err) {
    console.log(err);
  }
};
export const getIsAnonAsync = async () => {
  try {
    const value = await AsyncStorage.getItem("isAnon");
    if (value !== null) {
      return value;
    }
  } catch (err) {
    console.log(err);
  }
};
export const getAnonIdAsync = async () => {
  try {
    const value = await AsyncStorage.getItem("userAnonId");
    if (value !== null) {
      return value;
    }
  } catch (err) {
    console.log(err);
  }
};

export const handleAnon = async () => {
  // we create an entrance in firestore to have an id for the anon users
  await addDoc(collection(firestore, "anon_users"), {
    joining_date: new Date().toString(),
  }).then(async (anonUserCredential) => {
    // the anon id is used to create the id for the chatbot we are going to use
    await addDoc(collection(firestore, "bot_chats"), {
      "user-id": anonUserCredential.id,
    }).then((documentRef) => {
      // the with the two ids we create an anon user in the RTDB
      const userData = {
        username: "",
        email: "",
        colorOfChat: "#F9E0BB",
        userID: "",
        chatWithBotID: documentRef.id,
        anonId: anonUserCredential.id,
        listOfSoryroomsCreatedTotal: [],
        listOfStoryroomsCurrentlyOpened: [],
        listOfStoryroomsFinished: [],
        dateOfAccount: new Date().toString(),
        dateOfJoining: "",
      };
      const usersRef = ref(database, "users/" + anonUserCredential.id);
      // after creating the user we add it to RTDB
      set(usersRef, userData).then(() =>
        // and set the async storage that holds the anon users id
        setAnonIdAsync({ userAnonId: anonUserCredential.id }).then(() =>
          console.log("Success register of " + anonUserCredential.id + " anon"),
        ),
      );
    });
  });
};
