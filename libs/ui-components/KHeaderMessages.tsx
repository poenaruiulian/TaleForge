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
import { KSpacer } from "./KSpacer";
import { auth } from "../../firebase/firebase";

export const KHeaderMessages = ({
  title,
  username,
  numberOfDays,
}: {
  title: string;
  username: string;
  numberOfDays: number;
}) => {
  const { top } = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const navigator = useNavigation();

  return (
    <View
      style={{
        width: "100%",
        height: top + width * 0.2,
        backgroundColor: Colors.tertiary1,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        padding: 10,
      }}
    >
      <View
        style={{
          top: top * 0.5,
          height: "100%",
          width: "96%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <FontAwesomeIcon
            icon={fasChevronLeft}
            size={35}
            color={Colors.secondary1}
          />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Raleway-Bold",
              letterSpacing: 0.5,
              color: Colors.secondary2,
            }}
          >
            {title}
          </Text>
          <KSpacer h={5} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Raleway-Medium",
              letterSpacing: 0.05,
              color: Colors.secondary2,
            }}
          >
            {"with "}
            <Text style={{ fontFamily: "Raleway-Bold" }}>{username}</Text>
          </Text>
        </View>
        <View
          style={{
            backgroundColor: Colors.tertiary2,
            padding: 10,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: Colors.secondary2,
              fontSize: 18,
              fontFamily: "Raleway-Medium",
            }}
          >
            {numberOfDays}
          </Text>
        </View>
      </View>
    </View>
  );
};
