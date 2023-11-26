import { Colors } from "react-native-ui-lib";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft as fasChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export const KHeaderAuxPages = ({ label }: { label: string }) => {
  const { top } = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const navigator = useNavigation();

  return (
    <View
      style={{
        width: "100%",
        height: top + width * 0.1,
        backgroundColor: Colors.tertiary1,
        alignItems: "flex-end",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 10,
      }}
    >
      <TouchableOpacity onPress={() => navigator.goBack()}>
        <FontAwesomeIcon
          icon={fasChevronLeft}
          size={25}
          color={Colors.secondary1}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          fontFamily: "Raleway-Bold",
          letterSpacing: 0.5,
          color: Colors.secondary2,
        }}
      >
        {label}
      </Text>
    </View>
  );
};
