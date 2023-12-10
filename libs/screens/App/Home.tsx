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
import { Colors } from "react-native-ui-lib";
import LottieView from "lottie-react-native";

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
            snapshot.toJSON()[key]["joinerID"] !== auth.currentUser.uid &&
            snapshot.toJSON()[key]["joinerID"] == ""
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
        <KSpacer h={20} />
        <Text
          style={{
            letterSpacing: 0.05,
            fontFamily: "Raleway-SemiBold",
            fontSize: 16,
            color: Colors.secondary2,
          }}
        >
          Available Storyrooms:
        </Text>
        <KSpacer h={20} />
        {userRooms.length > 0 ? (
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
        ) : (
          <>
            <LottieView
              source={require("../../../assets/lotties/lottie1.json")}
              autoPlay
              // loop={false}
              style={{
                height: "52%",
                width: "100%",
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Raleway-SemiBold",
                color: Colors.secondary2,
              }}
            >
              No rooms found
            </Text>
          </>
        )}
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
