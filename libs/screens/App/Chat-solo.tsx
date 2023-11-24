import React from "react";
import KContainer from "../../ui-components/KContainer";
import { Text } from "react-native";
import { KSpacer } from "../../ui-components/KSpacer";
import { useNavigation } from "@react-navigation/native";
import { KHeader } from "../../ui-components/KHeader";
function ChatSolo() {
  return (
    <>
      <KHeader />
      <KContainer>
        <KSpacer h={50} />

        <Text>ChatSolo</Text>
      </KContainer>
    </>
  );
}

export default ChatSolo;
