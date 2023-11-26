import React, { useContext, useEffect, useState } from "react";
import KContainer from "../../ui-components/KContainer";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { KSpacer } from "../../ui-components/KSpacer";
import { useNavigation } from "@react-navigation/native";
import { KHeader } from "../../ui-components/KHeader";
import { Colors } from "react-native-ui-lib";
import { KInput } from "../../ui-components/KInput";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPaperPlane as fasPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { child, get, onValue, ref } from "firebase/database";
import { auth, database } from "../../../firebase/firebase";
import dateDiffInDays from "../../../helpers/dateDiffInDays";
import { generateStoryline } from "../../../helpers/generateStoryline";
import { handleAddMessageSolo } from "../../../firebase/handleAddMessageSolo";
import { getAnonIdAsync } from "../../../firebase/handleAnonRegLog";
function ChatSolo() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { height } = useWindowDimensions();
  const [anonUserID, setAnonUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const func = async () => {
      if (auth.currentUser !== null) {
        let user = await get(
          child(ref(database), "users/" + auth.currentUser.uid),
        );

        if (user.exists()) {
          let soloRef = ref(
            database,
            "solo-rooms/" + user.toJSON()["soloRoomID"],
          );
          onValue(soloRef, (snapshot) => {
            if (snapshot.exists()) {
              setMessages(Object.values(snapshot.toJSON()["listOfMessages"]));
            }
          });
        }
      } else {
        getAnonIdAsync().then(async (userId) => {
          setAnonUserId(userId);
          let user = await get(child(ref(database), "users/" + userId));

          if (user.exists()) {
            let soloRef = ref(
              database,
              "solo-rooms/" + user.toJSON()["soloRoomID"],
            );
            onValue(soloRef, (snapshot) => {
              if (snapshot.exists()) {
                setMessages(Object.values(snapshot.toJSON()["listOfMessages"]));
              }
            });
          }
        });
      }
    };

    func();
  }, []);

  return (
    <>
      <KHeader />
      <KContainer>
        <KSpacer h={20} />
        {messages !== undefined &&
          messages.slice(1).map((message) => {
            return (
              <View style={{ width: "90%" }}>
                {auth.currentUser !== null &&
                  message["userID"] === auth.currentUser.uid && (
                    <View style={{ width: "100%", alignItems: "flex-end" }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Raleway-Medium",
                          color: Colors.primary2,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}
                      >
                        {message["userID"] !== "TaleForger" && "(me)"}
                      </Text>
                      <View
                        style={{
                          backgroundColor: Colors.secondary2,
                          width: "70%",
                          borderBottomLeftRadius: 10,
                          borderTopRightRadius: 10,
                          borderTopLeftRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: "Raleway-Medium",
                            color: Colors.tertiary2,
                            padding: 10,
                          }}
                        >
                          {message["message"]}
                        </Text>
                      </View>
                    </View>
                  )}
                <KSpacer h={15} />
                {auth.currentUser !== null &&
                  message["userID"] !== auth.currentUser.uid && (
                    <>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Raleway-Medium",
                          color: Colors.primary2,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}
                      >
                        TaleForger
                      </Text>
                      <View
                        style={{
                          alignItems: "flex-start",
                          backgroundColor: Colors.tertiary2,
                          width: "70%",
                          borderBottomRightRadius: 10,
                          borderTopRightRadius: 10,
                          borderTopLeftRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: "Raleway-Medium",
                            color: Colors.primary2,
                            padding: 10,
                          }}
                        >
                          {message["message"]}
                        </Text>
                      </View>
                    </>
                  )}
                {auth.currentUser === null &&
                  message["userID"] !== "TaleForger" && (
                    <View style={{ width: "100%", alignItems: "flex-end" }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Raleway-Medium",
                          color: Colors.primary2,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}
                      >
                        {message["userID"] !== "TaleForger" && "(me)"}
                      </Text>
                      <View
                        style={{
                          backgroundColor: Colors.secondary2,
                          width: "70%",
                          borderBottomLeftRadius: 10,
                          borderTopRightRadius: 10,
                          borderTopLeftRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: "Raleway-Medium",
                            color: Colors.tertiary2,
                            padding: 10,
                          }}
                        >
                          {message["message"]}
                        </Text>
                      </View>
                    </View>
                  )}
                <KSpacer h={15} />
                {auth.currentUser === null &&
                  message["userID"] === "TaleForger" && (
                    <>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Raleway-Medium",
                          color: Colors.primary2,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}
                      >
                        TaleForger
                      </Text>
                      <View
                        style={{
                          alignItems: "flex-start",
                          backgroundColor: Colors.tertiary2,
                          width: "70%",
                          borderBottomRightRadius: 10,
                          borderTopRightRadius: 10,
                          borderTopLeftRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: "Raleway-Medium",
                            color: Colors.primary2,
                            padding: 10,
                          }}
                        >
                          {message["message"]}
                        </Text>
                      </View>
                    </>
                  )}
              </View>
            );
          })}
        <KSpacer h={50} />
      </KContainer>
      <View
        style={{
          height: height * 0.08,
          backgroundColor: Colors.background1,
          padding: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <View style={{ width: "85%", alignItems: "center" }}>
            <KInput
              bgColor={Colors.tertiary1}
              placeholder={""}
              value={message}
              onChangeText={(text) => {
                setMessage(text);
              }}
            />
          </View>
          <View style={{ width: "15%", alignItems: "center" }}>
            <TouchableOpacity
              disabled={message === "" || isLoading}
              onPress={() => {
                if (auth.currentUser !== null) {
                  handleAddMessageSolo({
                    message: message + ".",
                    userID: auth.currentUser.uid,
                  }).then(() => {
                    setIsLoading(true);
                    generateStoryline({ inputText: message }).then((answer) =>
                      handleAddMessageSolo({
                        message: answer,
                        userID: "TaleForger",
                      }).then(() => {
                        setIsLoading(false);
                        setMessage("");
                        console.log("Message sent with success solo");
                      }),
                    );
                  });
                } else {
                  handleAddMessageSolo({
                    message: message + ".",
                    userID: anonUserID,
                  }).then(() => {
                    setIsLoading(true);
                    generateStoryline({ inputText: message }).then((answer) =>
                      handleAddMessageSolo({
                        message: answer,
                        userID: "TaleForger",
                      }).then(() => {
                        setIsLoading(false);
                        setMessage("");
                        console.log("Message sent with success solo");
                      }),
                    );
                  });
                }
              }}
            >
              {!isLoading && (
                <FontAwesomeIcon
                  icon={fasPaperPlane}
                  size={25}
                  color={Colors.primary2}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

export default ChatSolo;
