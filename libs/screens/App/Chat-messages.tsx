import KContainer from "../../ui-components/KContainer";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { KSpacer } from "../../ui-components/KSpacer";
import { KHeaderMessages } from "../../ui-components/KHeaderMessages";
import { auth, database } from "../../../firebase/firebase";
import dateDiffInDays from "../../../helpers/dateDiffInDays";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Colors } from "react-native-ui-lib";
import { KInput } from "../../ui-components/KInput";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPaperPlane as fasPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { faLock as fasLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { handleSendMessage } from "../../../firebase/handleSendMessage";

export const ChatMessages = ({ route }) => {
  const roomsRef = ref(
    database,
    "story-rooms/" + route.params.roomData["storyroomID"],
  );

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { height } = useWindowDimensions();
  const [canSendMessage, setCanSendMessage] = useState(false);

  useEffect(() => {
    onValue(roomsRef, (snapshot) => {
      if (snapshot.exists()) {
        setMessages(Object.values(snapshot.toJSON()["listOfMessages"]));

        let aux = Object.values(snapshot.toJSON()["listOfMessages"]);
        aux = aux.filter((m) => m["userid"] === auth.currentUser.uid);
        if (aux.length > 0) {
          console.log(
            dateDiffInDays(new Date(aux[aux.length - 1]["date"]), new Date()),
          );
          setCanSendMessage(
            0 !==
              dateDiffInDays(new Date(aux[aux.length - 1]["date"]), new Date()),
          );
        } else {
          setCanSendMessage(aux.length === 0);
        }
      }
    });
  }, []);
  return (
    <>
      <KHeaderMessages
        title={route.params.roomData["title"]}
        username={
          route.params.roomData["openerID"] === auth.currentUser.uid
            ? route.params.roomData["joinerUsername"]
            : route.params.roomData["openerUsername"]
        }
        numberOfDays={
          route.params.roomData["numberOfDays"] -
          dateDiffInDays(
            new Date(route.params.roomData["joinedDate"]),
            new Date(),
          )
        }
      />
      <KContainer>
        <KSpacer h={20} />
        {messages !== undefined &&
          messages.map((message) => {
            return (
              <View style={{ width: "90%" }}>
                {message["userid"] === auth.currentUser.uid && (
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
                      {message["userid"] === route.params.roomData["openerID"]
                        ? route.params.roomData["openerUsername"]
                        : route.params.roomData["joinerUsername"]}
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
                {message["userid"] !== auth.currentUser.uid && (
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
                      {message["userid"] === route.params.roomData["openerID"]
                        ? route.params.roomData["openerUsername"]
                        : route.params.roomData["joinerUsername"]}
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
      </KContainer>

      <View
        style={{
          height: height * 0.12,
          backgroundColor: Colors.background1,
          padding: 10,
        }}
      >
        <Text
          style={{
            paddingHorizontal: 20,
            fontFamily: "Raleway-Medium",
            fontSize: 14,
            color: Colors.secondary1,
            paddingVertical: 2,
          }}
        >
          {message.length} / {route.params.roomData["numberOfChars"]}
        </Text>

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
                if (text.length <= route.params.roomData["numberOfChars"]) {
                  setMessage(text);
                }
              }}
            />
          </View>
          <View style={{ width: "15%", alignItems: "center" }}>
            <TouchableOpacity
              disabled={message === "" && !canSendMessage}
              onPress={() =>
                handleSendMessage({
                  roomData: route.params.roomData,
                  message: message,
                }).then(() => {
                  setMessage("");
                  setCanSendMessage(false);
                  console.log("Message sent with succes");
                })
              }
            >
              {canSendMessage ? (
                <FontAwesomeIcon
                  icon={fasPaperPlane}
                  size={25}
                  color={Colors.primary2}
                />
              ) : (
                <FontAwesomeIcon
                  icon={fasLock}
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
};
