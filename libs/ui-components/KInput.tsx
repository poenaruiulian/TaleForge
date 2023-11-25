import { TextInput } from "react-native";
import { Colors } from "react-native-ui-lib";

export const KInput = ({
  placeholder,
  value,
  onChangeText,
}: {
  placeholder: string;
  value: string;
  onChangeText: (val: string) => void;
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize="none"
      autoCorrect={false}
      textAlign="center"
      placeholderTextColor={Colors.secondary2}
      style={{
        width: "90%",
        backgroundColor: Colors.background1,
        padding: 12,
        borderRadius: 10,
        fontSize: 16,
        color: Colors.secondary2,
        fontFamily: "Raleway-Medium",
      }}
    />
  );
};
