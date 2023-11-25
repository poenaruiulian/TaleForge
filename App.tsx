import { Colors } from "react-native-ui-lib";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./libs/screens/Auth/Login";
import Register from "./libs/screens/Auth/Register";
import Home from "./libs/screens/App/Home";
import ChatSolo from "./libs/screens/App/Chat-solo";
import ChatDuo from "./libs/screens/App/Chat-duo";
import Profile from "./libs/screens/App/Profile";
import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { loadColors } from "./constants/Colors";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { getIsAnonAsync } from "./firebase/handleAnonRegLog";
import { IsAnonContext } from "./contexts/IsAnonContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { faHome as fasHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faComment as fasComment } from "@fortawesome/free-solid-svg-icons/faComment";
import { faComments as fasComments } from "@fortawesome/free-solid-svg-icons/faComments";
import { faUserCircle as fasUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { faChevronLeft as fasChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { library } from "@fortawesome/fontawesome-svg-core";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

library.add(fasHome, fasComment, fasComments, fasUserCircle, fasChevronLeft);

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={"Login"}
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"Register"}
        component={Register}
      />
    </Stack.Navigator>
  );
};
const AppTabNonAnonymously = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.background1,
          borderTopWidth: 0,
          borderTopColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon
              size={focused ? 35 : 28}
              icon={fasHome}
              color={focused ? Colors.secondary2 : Colors.secondary1}
            />
          ),
        }}
        name={"Home"}
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon
              size={focused ? 35 : 28}
              icon={fasComment}
              color={focused ? Colors.secondary2 : Colors.secondary1}
            />
          ),
        }}
        name={"ChatSolo"}
        component={ChatSolo}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon
              size={focused ? 35 : 28}
              icon={fasComments}
              color={focused ? Colors.secondary2 : Colors.secondary1}
            />
          ),
        }}
        name={"ChatDuo"}
        component={ChatDuo}
      />
    </Tab.Navigator>
  );
};
const AppStackNonAnonymously = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={"AppTab"}
        component={AppTabNonAnonymously}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"Profile"}
        component={Profile}
      />
    </Stack.Navigator>
  );
};
const AppTabAnonymously = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.background1,
          borderTopWidth: 0,
          borderTopColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon
              size={focused ? 35 : 28}
              icon={fasComment}
              color={focused ? Colors.secondary2 : Colors.secondary1}
            />
          ),
        }}
        name={"ChatSolo"}
        component={ChatSolo}
      />
    </Tab.Navigator>
  );
};
const AppStackAnonymously = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={"AppTab"}
        component={AppTabAnonymously}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"Profile"}
        component={Profile}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAnon, setIsAnon] = useState(true);
  const [fontsLoaded] = useFonts({
    "Raleway-SemiBold": require("./assets/fonts/Raleway-SemiBold.ttf"),
    "Raleway-Medium": require("./assets/fonts/Raleway-Medium.ttf"),
    "Raleway-MediumItalic": require("./assets/fonts/Raleway-MediumItalic.ttf"),
    "Raleway-Bold": require("./assets/fonts/Raleway-Bold.ttf"),
  });

  useEffect(() => {
    // AsyncStorage.clear();

    loadColors();

    getIsAnonAsync().then((isUserAnon) => setIsAnon(isUserAnon === "true"));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    // @ts-ignore
    <IsAnonContext.Provider value={{ isAnon, setIsAnon }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          {isAnon
            ? AppStackAnonymously()
            : !isLoggedIn
              ? AuthStack()
              : AppStackNonAnonymously()}
        </NavigationContainer>
      </GestureHandlerRootView>
    </IsAnonContext.Provider>
  );
}
