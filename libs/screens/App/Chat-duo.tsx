import { Colors, Dialog, PanningProvider } from "react-native-ui-lib";
import React, { useEffect, useState } from "react";
import KContainer from "../../ui-components/KContainer";
import { Text, View } from "react-native";
import { KSpacer } from "../../ui-components/KSpacer";
import { useNavigation } from "@react-navigation/native";
import { KHeader } from "../../ui-components/KHeader";
import { KTextButton } from "../../ui-components/KTextButton";
import { KCreateStoryroomDialog } from "../../ui-components/KCreateStoryroomDialog";
import { ref, onValue } from "firebase/database";
import { auth, database } from "../../../firebase/firebase";
import { KChatDuoStoryroom } from "../../ui-components/KChatDuoStoryroom";
import dateDiffInDays from "../../../helpers/dateDiffInDays";
import LottieView from "lottie-react-native";

function ChatDuo() {
  const [showCreateStoryroomDialog, setShowCreateStoryroomDialog] =
    useState(false);
  const [userRooms, setUserRooms] = useState([]);

  const roomsRef = ref(database, "story-rooms");

  useEffect(() => {
    onValue(roomsRef, (snapshot) => {
      if (snapshot.exists()) {
        let auxList = [];
        for (let key in snapshot.toJSON()) {
          if (
            snapshot.toJSON()[key]["openerID"] === auth.currentUser.uid ||
            snapshot.toJSON()[key]["joinerID"] === auth.currentUser.uid
          ) {
            auxList.push(snapshot.toJSON()[key]);
          }
        }

        let roomsClosed = auxList.filter(
          (room) =>
            0 >=
            room["numberOfDays"] -
              dateDiffInDays(new Date(room["joinedDate"]), new Date()),
        );
        let roomsWhereShouldSendMessage = auxList.filter((room) => {
          const nrMessagesOfCurrent = Object.values(
            room["listOfMessages"],
          ).filter(
            (el: { [x: string]: string }) =>
              el["userid"] === auth.currentUser.uid,
          );

          const nrMessagesOfOther = Object.values(
            room["listOfMessages"],
          ).filter(
            (el: { [x: string]: string }) =>
              el["userid"] !== auth.currentUser.uid,
          );

          return (
            nrMessagesOfCurrent < nrMessagesOfOther &&
            0 <
              room["numberOfDays"] -
                dateDiffInDays(new Date(room["joinedDate"]), new Date())
          );
        });
        let roomsNotJoined = auxList.filter(
          (room) => room["joinedDate"] === "",
        );
        let roomsAllGood = auxList.filter(
          (room) =>
            !roomsClosed.includes(room) &&
            !roomsNotJoined.includes(room) &&
            !roomsWhereShouldSendMessage.includes(room),
        );

        setUserRooms(
          roomsWhereShouldSendMessage.concat(
            roomsAllGood.concat(roomsNotJoined.concat(roomsClosed)),
          ),
        );
      }
    });
  }, []);

  return (
    <>
      <KHeader />
      <KContainer>
        <KSpacer h={10} />
        <KTextButton
          label={"Create"}
          onPress={() => setShowCreateStoryroomDialog(true)}
        />
        <KSpacer h={20} />
        <Text
          style={{
            letterSpacing: 0.05,
            fontFamily: "Raleway-SemiBold",
            fontSize: 16,
            color: Colors.secondary2,
          }}
        >
          Your Storyrooms:
        </Text>
        <KSpacer h={20} />
        {
          // @ts-ignore
          userRooms.length > 0 ? (
            userRooms.map((room) => (
              // @ts-ignore
              <View style={{ with: "100%" }} key={room["storyroomID"]}>
                <KChatDuoStoryroom
                  roomData={room}
                  isDisabled={room["joinerID"] === ""}
                  isClosed={
                    0 >=
                    room["numberOfDays"] -
                      dateDiffInDays(new Date(room["joinedDate"]), new Date())
                  }
                  shouldSendMessage={() => {
                    const nrMessagesOfCurrent = Object.values(
                      room["listOfMessages"],
                    ).filter(
                      (el: { [x: string]: string }) =>
                        el["userid"] === auth.currentUser.uid,
                    );

                    const nrMessagesOfOther = Object.values(
                      room["listOfMessages"],
                    ).filter(
                      (el: { [x: string]: string }) =>
                        el["userid"] !== auth.currentUser.uid,
                    );

                    return (
                      nrMessagesOfCurrent < nrMessagesOfOther &&
                      0 <
                        room["numberOfDays"] -
                          dateDiffInDays(
                            new Date(room["joinedDate"]),
                            new Date(),
                          )
                    );
                  }}
                  didJoined={room["joinedDate"] !== ""}
                />
                <KSpacer h={10} />
              </View>
            ))
          ) : (
            <>
              <LottieView
                source={require("../../../assets/lotties/lottie1.json")}
                autoPlay
                // loop={false}
                style={{
                  height: "40%",
                  width: "100%",
                }}
              />
              <KSpacer h={90} />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Raleway-SemiBold",
                  color: Colors.secondary2,
                }}
              >
                No rooms created / joined
              </Text>
            </>
          )
        }

        <KCreateStoryroomDialog
          isVisible={showCreateStoryroomDialog}
          setVisible={() => setShowCreateStoryroomDialog(false)}
        />
      </KContainer>
    </>
  );
}

export default ChatDuo;
