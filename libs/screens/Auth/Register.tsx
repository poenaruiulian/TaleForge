import React, { useState } from "react";
import KContainer from "../../ui-components/KContainer";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { handleRegister } from "../../../firebase/handleRegister";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");
  return (
    // @ts-ignore
    <KContainer>
      <TextInput
        placeholder={"Username"}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
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
      <TextInput
        placeholder={"Re-Password"}
        value={repass}
        onChangeText={(text) => setRepass(text)}
        secureTextEntry
      />
      <TouchableOpacity
        onPress={() => {
          if (pass === repass) {
            handleRegister({
              email: email,
              password: pass,
              username: username,
            })
              .then((res) => console.log("Success"))
              .catch((err) => console.log(err));
          }
        }}
      >
        <Text>Register</Text>
      </TouchableOpacity>
    </KContainer>
  );
}

export default Register;
