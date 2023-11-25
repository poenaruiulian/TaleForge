import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Colors } from "react-native-ui-lib";

export const KTag = ({
  label,
  onPress,
  bgColor,
  color,
}: {
  label: string;
  onPress: () => void;
  bgColor: string;
  color: string;
}) => {
  return (
    <View style={{ padding: 7, backgroundColor: bgColor, borderRadius: 10 }}>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Raleway-SemiBold",
            color: color,
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
