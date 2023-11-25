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
  return (
    <>
      <KHeader />
      <KContainer>
        <KSpacer h={50} />
        <Text>Home</Text>
      </KContainer>
    </>
  );
}

export default Home;
