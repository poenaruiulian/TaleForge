import { Colors } from "react-native-ui-lib";
import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserCircle as fasUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { useNavigation } from "@react-navigation/native";

export const KHeader = () => {
  const { top } = useSafeAreaInsets();
  const navigator = useNavigation();
  const { height, width } = useWindowDimensions();

  return (
    <View
      style={{
        width: "100%",
        height: top + width * 0.15,
        backgroundColor: Colors.tertiary1,
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingRight: 20,
        paddingLeft: 10,
        paddingVertical: 10,
        flexDirection: "row",
        borderRadius: 10,
      }}
    >
      <Image
        source={require("../../assets/images/logo_header.png")}
        style={{ height: 40, width: 200 }}
      />
      {/*@ts-ignore*/}
      <TouchableOpacity onPress={() => navigator.navigate("Profile")}>
        <FontAwesomeIcon
          icon={fasUserCircle}
          color={Colors.secondary1}
          size={34}
        />
      </TouchableOpacity>
    </View>
  );
};
