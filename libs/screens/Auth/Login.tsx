import React, { useContext, useState } from "react";
import KContainer from "../../ui-components/KContainer";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { handleRegister } from "../../../firebase/handleRegister";
import { handleLogin } from "../../../firebase/handleLogin";
import { IsAnonContext } from "../../../contexts/IsAnonContext";
import { handleAnon, setIsAnonAsync } from "../../../firebase/handleAnonRegLog";

function Login() {
  const navigator = useNavigation();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { setIsAnon } = useContext(IsAnonContext);
  return (
    <KContainer>
      <TextInput
        placeholder={"Email"}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder={"Password"}
        value={pass}
        onChangeText={(text) => setPass(text)}
        secureTextEntry
      />
      <TouchableOpacity
        onPress={() => {
          setIsAnonAsync({ isUserAnon: false }).then(() =>
            handleLogin({ email: email, password: pass }),
          );
        }}
      >
        <Text>Log in</Text>
      </TouchableOpacity>
      {/*@ts-ignore*/}
      <TouchableOpacity onPress={() => navigator.navigate("Register")}>
        <Text>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // we set the async storage value that holds if the user is anon to TRUE
          setIsAnonAsync({ isUserAnon: true })
            .then(() => setIsAnon(true))
            .then(() => handleAnon())
            .then(() => console.log("Success anon"));
        }}
      >
        <Text>Anon?</Text>
      </TouchableOpacity>
    </KContainer>
  );
}

export default Login;
