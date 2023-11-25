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
          if (snapshot.toJSON()[key]["openerID"] === auth.currentUser.uid) {
            auxList.push(snapshot.toJSON()[key]);
          }
        }
        setUserRooms(auxList);
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
          Your Storyrooms
        </Text>
        <KSpacer h={20} />
        {
          // @ts-ignore
          userRooms.map((room) => (
            // @ts-ignore
            <View style={{ with: "100%" }}>
              <KChatDuoStoryroom
                title={room["title"]}
                openerUsername={room["openerUsername"]}
                joinerUsername={room["joinerUsername"]}
                numberOfDays={room["numberOfDays"]}
                numberOfCharacters={room["numberOfChars"]}
                listOfTags={Object.values(room["tagsList"])}
              />
              <KSpacer h={10} />
            </View>
          ))
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
