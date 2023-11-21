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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
    <Tab.Navigator>
      <Tab.Screen
        options={{ headerShown: false }}
        name={"Home"}
        component={Home}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={"ChatSolo"}
        component={ChatSolo}
      />
      <Tab.Screen
        options={{ headerShown: false }}
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
    <Tab.Navigator>
      <Tab.Screen
        options={{ headerShown: false }}
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
      <NavigationContainer>
        {isAnon
          ? AppStackAnonymously()
          : !isLoggedIn
            ? AuthStack()
            : AppStackNonAnonymously()}
      </NavigationContainer>
    </IsAnonContext.Provider>
  );
}
