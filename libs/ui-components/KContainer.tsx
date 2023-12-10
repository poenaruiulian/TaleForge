import { Colors } from "react-native-ui-lib";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React from "react";
import { useHeaderHeight } from "react-native-screens/native-stack";
import useKeyboard from "../hooks/useKeyboard";

interface KContainerProps {
  children: React.ReactNode;
  bgColor?: string | undefined;
}
const KContainer = (props: KContainerProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor:
          props.bgColor === undefined ? Colors.background1 : props.bgColor,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          backgroundColor:
            props.bgColor === undefined ? Colors.background1 : props.bgColor,
        }}
      >
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KContainer;
