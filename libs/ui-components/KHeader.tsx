import { View, Image, TouchableOpacity } from "react-native";
import { Colors } from "react-native-ui-lib";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserCircle as fasUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { useNavigation } from "@react-navigation/native";

export const KHeader = () => {
  const { top } = useSafeAreaInsets();
  const navigator = useNavigation();

  return (
    <View
      style={{
        width: "100%",
        height: top + 50,
        backgroundColor: Colors.tertiary1,
        alignItems: "center",
        borderRadius: 10,
      }}
    >
      <View
        style={{
          width: "95%",
          height: "100%",
          top: top,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Image
          source={require("../../assets/images/logo_header.png")}
          style={{ height: "35%", width: "50%" }}
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
    </View>
  );
};
