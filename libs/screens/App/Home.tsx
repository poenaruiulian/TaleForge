import React, { useEffect, useState } from "react";
import KContainer from "../../ui-components/KContainer";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { auth, database } from "../../../firebase/firebase";
import { KSpacer } from "../../ui-components/KSpacer";
import { KHeader } from "../../ui-components/KHeader";
import { onValue, ref } from "firebase/database";
import { KHomeStoryroom } from "../../ui-components/KHomeStoryroom";
import { KShowDetailsDialog } from "../../ui-components/KShowDetailsDialog";
import { Colors } from "react-native-ui-lib";
import LottieView from "lottie-react-native";
import { faFilter as fasFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import { faCircleInfo as fasCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import { faFilterCircleXmark as fasFilterCircleXmark } from "@fortawesome/free-solid-svg-icons/faFilterCircleXmark";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { KFilterDialog } from "../../ui-components/KFilterDialog";

function Home() {
  const [userRooms, setUserRooms] = useState([]);
  const [isVisibleRoomDialog, setIsVisibleRoomDialog] = useState(false);
  const [roomdDetails, setRoomDetails] = useState({});
  const roomsRef = ref(database, "story-rooms");
  const [filterModalOpened, setFilterModalOpened] = useState(false);
  const [filteredApplyed, setFilteredApplyed] = useState(false);
  const [filters, setFilters] = useState({
    numberOfDays: undefined,
    numberOfChars: undefined,
    tags: undefined,
  });

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
        setUserRooms(
          auxList
            .filter((room) => {
              if (filters.tags !== undefined && filters.tags.length > 0) {
                return (
                  Object.values(room["tagsList"]).filter((tag: string) =>
                    filters.tags.includes(tag),
                  ).length > 0
                );
              } else {
                return true;
              }
            })
            .filter((room) => {
              if (
                filters.numberOfDays !== undefined &&
                filters.numberOfDays.length > 0 &&
                !isNaN(filters.numberOfDays[0])
              ) {
                if (filters.numberOfDays.length === 1) {
                  return room["numberOfDays"] >= filters.numberOfDays[0];
                }
                return (
                  room["numberOfDays"] >= filters.numberOfDays[0] &&
                  room["numberOfDays"] <= filters.numberOfDays[1]
                );
              } else {
                return true;
              }
            })
            .filter((room) => {
              if (
                filters.numberOfChars !== undefined &&
                filters.numberOfChars.length > 0 &&
                !isNaN(filters.numberOfChars[0])
              ) {
                if (filters.numberOfChars.length === 1) {
                  return room["numberOfChars"] >= filters.numberOfChars[0];
                }
                return (
                  room["numberOfChars"] >= filters.numberOfChars[0] &&
                  room["numberOfChars"] <= filters.numberOfChars[1]
                );
              } else {
                return true;
              }
            }),
        );
      }
    });
  }, [filters]);

  return (
    <>
      <KHeader />
      <KContainer>
        <KSpacer h={20} />
        {/*@ts-ignore*/}
        <View style={{ flexDirection: "row", alignItems: "center", gap: "10" }}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Available Storyrooms",
                "If there are any available, below you will find the available storyrooms.\n\n" +
                  "By clicking on any of them a dialog will pop up, where all the details of the room are displayed with a button to join the room.\n\n" +
                  "In the left of the 'Available Storyrooms' you can see a filter icon, which will open a dialog where you can filter the available rooms to you choice.",
                [
                  {
                    text: "Ok",
                    style: "default",
                  },
                ],
              )
            }
          >
            <FontAwesomeIcon
              icon={fasCircleInfo}
              size={16}
              color={Colors.secondary2}
            />
          </TouchableOpacity>
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
          <TouchableOpacity onPress={() => setFilterModalOpened(true)}>
            <FontAwesomeIcon
              icon={filteredApplyed ? fasFilterCircleXmark : fasFilter}
              size={16}
              color={filteredApplyed ? Colors.red40 : Colors.secondary2}
            />
          </TouchableOpacity>
        </View>
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

      <KFilterDialog
        isVisible={filterModalOpened}
        setIsVisible={() => setFilterModalOpened(false)}
        filtersApplyed={filteredApplyed}
        setFiltersApplyed={(b) => setFilteredApplyed(b)}
        filters={filters}
        setFilters={(
          f: React.SetStateAction<{
            numberOfDays: any;
            numberOfChars: any;
            tags: any;
          }>,
        ) => setFilters(f)}
      />
    </>
  );
}

export default Home;
