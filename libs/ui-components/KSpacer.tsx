import { View, Text } from "react-native";

export const KSpacer = ({ h = 10 }: { h: number | string }) => {
  return (
    // @ts-ignore
    <View style={{ height: h }}>
      <Text></Text>
    </View>
  );
};
