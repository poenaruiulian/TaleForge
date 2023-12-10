import {
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Dialog } from "react-native-ui-lib";
import { KSpacer } from "./KSpacer";
import { KTag } from "./KTag";
import { KTextButton } from "./KTextButton";
import React, { useState } from "react";
import { faCircleXmark as fasCircleXmark } from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export const KFilterDialog = ({
  isVisible,
  setIsVisible,
  setFiltersApplyed,
  filtersApplyed,
  filters,
  setFilters,
}: {
  isVisible: boolean;
  setIsVisible: () => void;
  setFiltersApplyed: (b: boolean) => void;
  filtersApplyed: boolean;
  filters: React.SetStateAction<{
    numberOfDays: any;
    numberOfChars: any;
    tags: any;
  }>;
  setFilters: (
    f: React.SetStateAction<{
      numberOfDays: any;
      numberOfChars: any;
      tags: any;
    }>,
  ) => void;
}) => {
  const { height, width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
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

  const [numberOfDays, setNumberOfDays] = useState("");
  const [numberOfChars, setNumberOfChars] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <Dialog
      bottom
      visible={isVisible}
      onDismiss={() => {
        setIsVisible();
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
        {filtersApplyed && (
          <TouchableOpacity
            onPress={() => {
              setNumberOfChars("");
              setNumberOfDays("");
              setSelectedTags([]);
              setFilters({
                numberOfDays: undefined,
                numberOfChars: undefined,
                tags: undefined,
              });
              setFiltersApplyed(false);
            }}
            style={{
              alignSelf: "center",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              icon={fasCircleXmark}
              size={16}
              color={Colors.red40}
            />
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Raleway-Bold",
                color: Colors.red40,
              }}
            >
              Clear filters
            </Text>
          </TouchableOpacity>
        )}
        <KSpacer h={10} />
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Raleway-Bold",
            color: Colors.primary2,
            alignSelf: "center",
          }}
        >
          Select filters to apply
        </Text>
        <KSpacer h={20} />
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Raleway-SemiBold",
            color: Colors.secondary2,
            paddingLeft: 10,
          }}
        >
          Number of days:
        </Text>
        <KSpacer h={10} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            padding: 10,
          }}
        >
          <KTag
            label={"0-5"}
            onPress={() => setNumberOfDays("0-5")}
            bgColor={
              numberOfDays === "0-5" ? Colors.tertiary2 : Colors.secondary2
            }
            color={Colors.primary2}
          />
          <KTag
            label={"5-10"}
            onPress={() => setNumberOfDays("5-10")}
            bgColor={
              numberOfDays === "5-10" ? Colors.tertiary2 : Colors.secondary2
            }
            color={Colors.primary2}
          />
          <KTag
            label={"10-20"}
            onPress={() => setNumberOfDays("10-20")}
            bgColor={
              numberOfDays === "10-20" ? Colors.tertiary2 : Colors.secondary2
            }
            color={Colors.primary2}
          />
          <KTag
            label={"20+"}
            onPress={() => setNumberOfDays("20+")}
            bgColor={
              numberOfDays === "20+" ? Colors.tertiary2 : Colors.secondary2
            }
            color={Colors.primary2}
          />
        </View>
        <KSpacer h={10} />
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Raleway-SemiBold",
            color: Colors.secondary2,
            paddingLeft: 10,
          }}
        >
          Number of characters:
        </Text>
        <KSpacer h={10} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            padding: 10,
          }}
        >
          <KTag
            label={"0-50"}
            onPress={() => setNumberOfChars("0-50")}
            bgColor={
              numberOfChars === "0-50" ? Colors.tertiary2 : Colors.secondary2
            }
            color={Colors.primary2}
          />
          <KTag
            label={"50-100"}
            onPress={() => setNumberOfChars("50-100")}
            bgColor={
              numberOfChars === "50-100" ? Colors.tertiary2 : Colors.secondary2
            }
            color={Colors.primary2}
          />
          <KTag
            label={"100+"}
            onPress={() => setNumberOfChars("100+")}
            bgColor={
              numberOfChars === "100+" ? Colors.tertiary2 : Colors.secondary2
            }
            color={Colors.primary2}
          />
        </View>
        <KSpacer h={10} />
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Raleway-SemiBold",
            color: Colors.secondary2,
            paddingLeft: 10,
          }}
        >
          Tags:
        </Text>
        <KSpacer h={10} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            padding: 10,
            flexWrap: "wrap",
          }}
        >
          {tags.map((tag) => (
            <KTag
              key={tags.indexOf(tag)}
              bgColor={
                selectedTags.includes(tag)
                  ? Colors.tertiary2
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
        <KSpacer h={20} />
        <View style={{ width: "100%", alignItems: "center" }}>
          <KTextButton
            label={"Apply"}
            onPress={() => {
              console.log(numberOfChars);
              console.log(numberOfDays);
              console.log(selectedTags);

              const newFilters = {
                numberOfDays: numberOfDays.split("-").map((el) => parseInt(el)),
                numberOfChars: numberOfChars
                  .split("-")
                  .map((el) => parseInt(el)),
                tags: selectedTags,
              };

              setFilters(
                newFilters.tags.length > 0 ||
                  !isNaN(newFilters.numberOfChars[0]) ||
                  !isNaN(newFilters.numberOfDays[0])
                  ? newFilters
                  : filters,
              );
              setFiltersApplyed(
                newFilters.tags.length > 0 ||
                  !isNaN(newFilters.numberOfChars[0]) ||
                  !isNaN(newFilters.numberOfDays[0]),
              );

              console.log(newFilters);

              setIsVisible();
            }}
          />
        </View>
      </ScrollView>
    </Dialog>
  );
};
