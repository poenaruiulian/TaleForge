import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { setIsAnonAsync } from "./handleAnonRegLog";
export const handleLogin = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setIsAnonAsync({ isUserAnon: false }).then(() =>
        console.log("Succes log in of " + userCredential.user.uid),
      );
    })
    .catch((err) => alert(err));
};
