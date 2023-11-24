import { TextInput } from "react-native";
import { Colors } from "react-native-ui-lib";

export const KAuthInput = ({
  placeholder,
  value,
  onChangeText,
  isPass,
}: {
  placeholder: string;
  value: string;
  onChangeText: (val: string) => void;
  isPass: boolean;
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={isPass}
      autoCapitalize="none"
      autoCorrect={false}
      textAlign="center"
      placeholderTextColor={Colors.secondary2}
      style={{
        width: "80%",
        backgroundColor: Colors.background2,
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.secondary2,
        borderStyle: "dashed",
        fontSize: 16,
        color: Colors.secondary2,
        fontFamily: "Raleway-Medium",
      }}
    />
  );
};
