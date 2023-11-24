import { KeyboardAvoidingView, ScrollView } from "react-native";
import React from "react";
import { Colors } from "react-native-ui-lib";
import { useNavigation } from "@react-navigation/native";

interface KContainerProps {
  children: React.ReactNode;
}
const KContainer = (props: KContainerProps) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background1 }}
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          backgroundColor: Colors.background,
        }}
      >
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KContainer;
