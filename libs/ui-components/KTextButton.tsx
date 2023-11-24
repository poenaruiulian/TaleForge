import { TouchableOpacity, Text } from "react-native";
import { Colors } from "react-native-ui-lib";

export const KTextButton = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "50%",
        alignItems: "center",
        paddingVertical: 15,
        backgroundColor: Colors.secondary2,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          letterSpacing: 0.5,
          fontFamily: "Raleway-SemiBold",
          color: Colors.background1,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
