import React from "react";
import KContainer from "../../ui-components/KContainer";
import { Text } from "react-native";
import { KSpacer } from "../../ui-components/KSpacer";
import { useNavigation } from "@react-navigation/native";
function Profile() {
  return (
    // @ts-ignore
    <KContainer>
      <KSpacer h={50} />

      <Text>Profile</Text>
    </KContainer>
  );
}

export default Profile;
