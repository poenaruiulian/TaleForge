import { initializeApp } from "firebase/app";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYsv1pU71wEL2Kz1aZ71Wcac588VhsnVo",
  authDomain: "talef-5870e.firebaseapp.com",
  projectId: "talef-5870e",
  storageBucket: "talef-5870e.appspot.com",
  messagingSenderId: "418088876543",
  appId: "1:418088876543:web:893b1979c87145c96a0fca",
  measurementId: "G-FT6FPJZMSR",
  databaseURL: "https://talef-5870e-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const database = getDatabase(app);
const firestore = getFirestore(app);

export { auth, database, firestore };
