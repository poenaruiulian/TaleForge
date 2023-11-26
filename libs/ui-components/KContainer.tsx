import { Colors } from "react-native-ui-lib";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React from "react";
import { useHeaderHeight } from "react-native-screens/native-stack";

interface KContainerProps {
  children: React.ReactNode;
}
const KContainer = (props: KContainerProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor: Colors.background1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          backgroundColor: Colors.background1,
        }}
      >
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KContainer;
