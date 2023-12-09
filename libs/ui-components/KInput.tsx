import { TextInput } from "react-native";
import { Colors } from "react-native-ui-lib";

export const KInput = ({
  placeholder,
  value,
  onChangeText,
  bgColor,
  editable,
}: {
  placeholder: string;
  value: string;
  onChangeText: (val: string) => void;
  bgColor: string | undefined;
  editable: boolean | undefined;
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
      editable={editable}
      style={{
        width: "90%",
        backgroundColor: bgColor === undefined ? Colors.background1 : bgColor,
        padding: 12,
        borderRadius: 10,
        fontSize: 16,
        color: Colors.secondary2,
        fontFamily: "Raleway-Medium",
      }}
    />
  );
};
