import React, { useContext } from "react";
import KContainer from "../../ui-components/KContainer";
import { Text, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { setIsAnonAsync } from "../../../firebase/handleAnonRegLog";
import { IsAnonContext } from "../../../contexts/IsAnonContext";

function Home() {
  const { setIsAnon } = useContext(IsAnonContext);

  return (
    // @ts-ignore
    <KContainer>
      <Text>Home</Text>
      <TouchableOpacity
        onPress={() => {
          signOut(auth)
            .then(
              async () =>
                await setIsAnonAsync({ isUserAnon: false })
                  .then(() => setIsAnon(false))
                  .then(() => console.log("Sign out success"))
                  .catch((err) => console.log(err)),
            )
            .catch((err) => console.log(err));
        }}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </KContainer>
  );
}

export default Home;
