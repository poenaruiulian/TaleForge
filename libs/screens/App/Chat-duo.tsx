import React from "react";
import KContainer from "../../ui-components/KContainer";
import { Text } from "react-native";
import { KSpacer } from "../../ui-components/KSpacer";
import { useNavigation } from "@react-navigation/native";
import { KHeader } from "../../ui-components/KHeader";
function ChatDuo() {
  return (
    <>
      <KHeader />
      <KContainer>
        <KSpacer h={50} />
        <Text>ChatDuo</Text>
      </KContainer>
    </>
  );
}

export default ChatDuo;
