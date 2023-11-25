import React, { useContext, useEffect, useState } from "react";
import KContainer from "../../ui-components/KContainer";
import { Text, TouchableOpacity, View } from "react-native";
import { signOut } from "firebase/auth";
import { auth, database } from "../../../firebase/firebase";
import { setIsAnonAsync } from "../../../firebase/handleAnonRegLog";
import { IsAnonContext } from "../../../contexts/IsAnonContext";
import { KSpacer } from "../../ui-components/KSpacer";
import { useNavigation } from "@react-navigation/native";
import { KHeader } from "../../ui-components/KHeader";
import { onValue, ref } from "firebase/database";
import { KChatDuoStoryroom } from "../../ui-components/KChatDuoStoryroom";
import { KHomeStoryroom } from "../../ui-components/KHomeStoryroom";
import { KShowDetailsDialog } from "../../ui-components/KShowDetailsDialog";

function Home() {
  const [userRooms, setUserRooms] = useState([]);
  const [isVisibleRoomDialog, setIsVisibleRoomDialog] = useState(false);
  const [roomdDetails, setRoomDetails] = useState({});
  const roomsRef = ref(database, "story-rooms");

  useEffect(() => {
    onValue(roomsRef, (snapshot) => {
      if (snapshot.exists()) {
        let auxList = [];
        for (let key in snapshot.toJSON()) {
          if (
            snapshot.toJSON()[key]["openerID"] !== auth.currentUser.uid &&
            snapshot.toJSON()[key]["joinerID"] !== auth.currentUser.uid
          ) {
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
        <KSpacer h={50} />
        {
          // @ts-ignore
          userRooms.map((room) => (
            // @ts-ignore
            <View style={{ with: "100%" }}>
              <KHomeStoryroom
                onPress={() => {
                  setIsVisibleRoomDialog(true);
                  setRoomDetails(room);
                }}
                key={room["storyroomID"]}
                title={room["title"]}
                openerUsername={room["openerUsername"]}
                numberOfDays={room["numberOfDays"]}
                numberOfCharacters={room["numberOfChars"]}
                listOfTags={Object.values(room["tagsList"])}
              />
              <KSpacer h={10} />
            </View>
          ))
        }
      </KContainer>

      <KShowDetailsDialog
        isVisible={isVisibleRoomDialog}
        setIsVisible={() => setIsVisibleRoomDialog(false)}
        roomDetails={roomdDetails}
        onDismiss={() => setRoomDetails({})}
      />
    </>
  );
}

export default Home;
