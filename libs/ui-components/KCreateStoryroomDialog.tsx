import { Colors, Dialog, PanningProvider } from "react-native-ui-lib";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KSpacer } from "./KSpacer";
import { KInput } from "./KInput";
import { KTag } from "./KTag";
import { KTextButton } from "./KTextButton";
import { handleRoomCreation } from "../../firebase/handleRoomCreation";

interface KCreateStoryroomDialogProps {
  isVisible: boolean;
  setVisible: (b: boolean) => void;
}
export const KCreateStoryroomDialog = (props: KCreateStoryroomDialogProps) => {
  const { height, width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  const [title, setTitle] = useState("");
  const [days, setDays] = useState(0);
  const [numberOfChars, setNumberOfChars] = useState(0);
  const [firstSentanceOfTheStory, setFirstSentanceOfTheStory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tags, setTags] = useState([
    "Adventure ⛰️",
    "Fantasy 🔮",
    "Mystery 🕵️‍♂️",
    "Sci-Fi 🚀",
    "Romance 💖",
    "Horror 👻",
    "Thriller 🎬",
    "Historical 🏰",
    "Comedy 😂",
    "Drama 🎭",
  ]);
  return (
    <Dialog
      bottom
      visible={props.isVisible}
      onDismiss={() => {
        setSelectedTags([]);
        setTitle("");
        setDays(0);
        setFirstSentanceOfTheStory("");
        setNumberOfChars(0);
        props.setVisible(false);
      }}
      containerStyle={{
        height: height * 0.7,
        width: width * 0.95,
        backgroundColor: Colors.tertiary1,
        bottom: bottom + 50,
        alignSelf: "center",
        borderRadius: 10,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Raleway-Bold",
            color: Colors.secondary2,
            letterSpacing: 0.05,
          }}
        >
          Create a storyroom:
        </Text>
        <KSpacer h={40} />
        <KInput
          placeholder={"Title of the story"}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <KSpacer h={10} />
        <KInput
          placeholder={"Number of days"}
          value={days == 0 ? "" : days.toString()}
          onChangeText={(text) => setDays(parseInt(text))}
        />
        <KSpacer h={10} />
        <KInput
          placeholder={"Number of characters"}
          value={numberOfChars == 0 ? "" : numberOfChars.toString()}
          onChangeText={(text) => setNumberOfChars(parseInt(text))}
        />
        <KSpacer h={10} />
        <KInput
          placeholder={"First sentence of the story"}
          value={firstSentanceOfTheStory}
          onChangeText={(text) => setFirstSentanceOfTheStory(text)}
        />
        <KSpacer h={10} />
        <Text
          style={{
            fontSize: 16,
            color: Colors.secondary2,
            fontFamily: "Raleway-SemiBold",
          }}
        >
          Select the story theme:
        </Text>
        <KSpacer h={10} />
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
          }}
        >
          {tags.map((tag) => (
            <KTag
              key={tags.indexOf(tag)}
              bgColor={
                selectedTags.includes(tag)
                  ? Colors.secondary2
                  : Colors.background1
              }
              color={
                !selectedTags.includes(tag)
                  ? Colors.secondary2
                  : Colors.background1
              }
              label={tag}
              onPress={() => {
                if (selectedTags.includes(tag)) {
                  setSelectedTags(selectedTags.filter((el) => el != tag));
                } else {
                  // @ts-ignore
                  setSelectedTags((prev) => prev.concat([tag]));
                }
              }}
            />
          ))}
        </View>
        <KSpacer h={40} />
        <KTextButton
          label={"Create"}
          onPress={() => {
            handleRoomCreation({
              title: title,
              numberOfChars: numberOfChars,
              numberOfDays: days,
              firstSentence: firstSentanceOfTheStory,
              tagsList: selectedTags,
            }).then(() => {
              console.log("Room created with success");
              setSelectedTags([]);
              setTitle("");
              setDays(0);
              setFirstSentanceOfTheStory("");
              setNumberOfChars(0);
              props.setVisible(false);
            });
          }}
        />
        <KSpacer h={40} />
      </ScrollView>
    </Dialog>
  );
};
