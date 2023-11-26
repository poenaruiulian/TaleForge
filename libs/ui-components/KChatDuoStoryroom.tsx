import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors } from "react-native-ui-lib";
import { KTag } from "./KTag";
import { KSpacer } from "./KSpacer";
import { useNavigation } from "@react-navigation/native";
export const KChatDuoStoryroom = ({
  roomData,
  isDisabled,
}: {
  roomData: {};
  isDisabled: boolean;
}) => {
  const { height, width } = useWindowDimensions();
  const navigator = useNavigation();

  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={{
        width: width * 0.9,
        alignItems: "flex-start",
        backgroundColor: Colors.tertiary2,
        padding: 10,
        borderRadius: 10,
      }}
      // @ts-ignore
      onPress={() => navigator.navigate("ChatMessages", { roomData: roomData })}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Raleway-Bold",
          color: Colors.secondary2,
          letterSpacing: 0.05,
        }}
      >
        {roomData["title"]}
      </Text>
      <KSpacer h={10} />
      <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
        <KTag
          label={`${roomData["numberOfDays"]} days`}
          onPress={() => {}}
          bgColor={Colors.secondary2}
          color={Colors.tertiary1}
        />
        <KTag
          label={`${roomData["numberOfChars"]} chars`}
          onPress={() => {}}
          bgColor={Colors.secondary2}
          color={Colors.tertiary1}
        />
      </View>
      <KSpacer h={10} />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        {Object.values(roomData["tagsList"]).map((tag) => (
          <KTag
            // @ts-ignore
            key={tag}
            // @ts-ignore
            label={tag}
            onPress={() => {}}
            bgColor={Colors.background1}
            color={Colors.secondary2}
          />
        ))}
      </View>
      <KSpacer h={20} />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: Colors.secondary2,
            letterSpacing: 0.05,
            fontFamily: "Raleway-Medium",
          }}
        >
          {" "}
          by{" "}
          <Text
            style={{
              fontFamily: "Raleway-Bold",
            }}
          >
            {roomData["openerUsername"]}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: Colors.secondary2,
            letterSpacing: 0.05,
            fontFamily:
              roomData["joinerUsername"] !== ""
                ? "Raleway-Medium"
                : "Raleway-MediumItalic",
          }}
        >
          {roomData["joinerUsername"] !== "" ? "with " : "waiting..."}
          <Text
            style={{
              fontFamily: "Raleway-Bold",
            }}
          >
            {roomData["joinerUsername"] !== "" && roomData["joinerUsername"]}
          </Text>
        </Text>
      </View>
      <KSpacer h={5} />
    </TouchableOpacity>
  );
};
