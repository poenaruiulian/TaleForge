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
export const KChatDuoStoryroom = ({
  title,
  openerUsername,
  joinerUsername,
  numberOfDays,
  numberOfCharacters,
  listOfTags,
}: {
  title: string;
  openerUsername: string;
  joinerUsername: string;
  numberOfDays: number;
  numberOfCharacters: number;
  listOfTags: string[];
}) => {
  const { height, width } = useWindowDimensions();

  return (
    <TouchableOpacity
      style={{
        width: width * 0.9,
        alignItems: "flex-start",
        backgroundColor: Colors.tertiary2,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Raleway-Bold",
          color: Colors.secondary2,
          letterSpacing: 0.05,
        }}
      >
        {title}
      </Text>
      <KSpacer h={10} />
      <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
        <KTag
          label={`${numberOfDays} days`}
          onPress={() => {}}
          bgColor={Colors.secondary2}
          color={Colors.tertiary1}
        />
        <KTag
          label={`${numberOfCharacters}c`}
          onPress={() => {}}
          bgColor={Colors.secondary2}
          color={Colors.tertiary1}
        />
      </View>
      <KSpacer h={10} />
      <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
        {listOfTags.map((tag) => (
          <KTag
            key={listOfTags.indexOf(tag)}
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
            {openerUsername}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: Colors.secondary2,
            letterSpacing: 0.05,
            fontFamily:
              joinerUsername !== "" ? "Raleway-Medium" : "Raleway-MediumItalic",
          }}
        >
          {joinerUsername !== "" ? "with " : "waiting..."}
          <Text
            style={{
              fontFamily: "Raleway-Bold",
            }}
          >
            {joinerUsername !== "" && joinerUsername}
          </Text>
        </Text>
      </View>
      <KSpacer h={5} />
    </TouchableOpacity>
  );
};
