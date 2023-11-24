import React, { useContext } from "react";
import KContainer from "../../ui-components/KContainer";
import { Text, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { setIsAnonAsync } from "../../../firebase/handleAnonRegLog";
import { IsAnonContext } from "../../../contexts/IsAnonContext";
import { KSpacer } from "../../ui-components/KSpacer";
import { useNavigation } from "@react-navigation/native";
import { KHeader } from "../../ui-components/KHeader";

function Home() {
  const { setIsAnon } = useContext(IsAnonContext);

  return (
    <>
      <KHeader />
      <KContainer>
        <KSpacer h={50} />
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
    </>
  );
}

export default Home;
