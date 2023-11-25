import { Colors, Dialog } from "react-native-ui-lib";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import { Text } from "react-native";
import { KSpacer } from "./KSpacer";
import { KTag } from "./KTag";
import { KTextButton } from "./KTextButton";
import { handleJoinRoom } from "../../firebase/handleJoinRoom";

export const KShowDetailsDialog = ({
  isVisible,
  setIsVisible,
  roomDetails,
  onDismiss,
}: {
  isVisible: boolean;
  setIsVisible: () => void;
  roomDetails: {};
  onDismiss: () => void;
}) => {
  const { height, width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  return (
    <Dialog
      bottom
      visible={isVisible}
      onDismiss={() => {
        setIsVisible();
        onDismiss();
      }}
      containerStyle={{
        height: height * 0.6,
        width: width * 0.92,
        backgroundColor: Colors.tertiary1,
        bottom: bottom + 50,
        alignSelf: "center",
        borderRadius: 10,
        paddingVertical: 20,
      }}
    >
      <ScrollView>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              letterSpacing: 0.05,
              fontFamily: "Raleway-Bold",
              color: Colors.secondary2,
            }}
          >
            {roomDetails["title"]}
          </Text>
          <KSpacer h={20} />
          <Text
            style={{
              fontSize: 16,
              letterSpacing: 0.05,
              fontFamily: "Raleway-Medium",
              color: Colors.secondary2,
            }}
          >
            by{" "}
            <Text style={{ fontFamily: "Raleway-Bold" }}>
              {roomDetails["openerUsername"]}
            </Text>
          </Text>
        </View>
        <KSpacer h={40} />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              letterSpacing: 0.05,
              fontFamily: "Raleway-Medium",
              color: Colors.secondary2,
            }}
          >
            Duration:
          </Text>
          <KTag
            label={`${roomDetails["numberOfDays"]} days`}
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
            alignItems: "center",
            gap: 10,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              letterSpacing: 0.05,
              fontFamily: "Raleway-Medium",
              color: Colors.secondary2,
            }}
          >
            Number of characters:
          </Text>
          <KTag
            label={`${roomDetails["numberOfChars"]}c`}
            onPress={() => {}}
            bgColor={Colors.tertiary2}
            color={Colors.secondary2}
          />
        </View>
        <KSpacer h={10} />
        <Text
          style={{
            fontSize: 16,
            letterSpacing: 0.05,
            fontFamily: "Raleway-Medium",
            color: Colors.secondary2,
            paddingHorizontal: 20,
          }}
        >
          Tags:
        </Text>
        <KSpacer h={10} />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingHorizontal: 20,
          }}
        >
          {roomDetails["tagsList"] !== undefined &&
            Object.values(roomDetails["tagsList"]).map((tag) => (
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
        <KSpacer h={10} />
        <Text
          style={{
            fontSize: 16,
            letterSpacing: 0.05,
            fontFamily: "Raleway-Medium",
            color: Colors.secondary2,
            paddingHorizontal: 20,
          }}
        >
          The story begins with:
        </Text>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Raleway-Medium",
              color: Colors.primary2,
              letterSpacing: 0.05,
            }}
          >
            {roomDetails["listOfOpenerSentences"] !== undefined &&
              Object.values(roomDetails["listOfOpenerSentences"])}
          </Text>
        </View>
        <KSpacer h={20} />
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <KTextButton
            label={"Join"}
            onPress={() =>
              handleJoinRoom({ roomData: roomDetails })
                .then(onDismiss)
                .then(setIsVisible)
            }
          />
        </View>
      </ScrollView>
    </Dialog>
  );
};
