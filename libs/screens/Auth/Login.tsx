import React, { useContext, useState } from "react";
import KContainer from "../../ui-components/KContainer";
import { Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { handleRegister } from "../../../firebase/handleRegister";
import { handleLogin } from "../../../firebase/handleLogin";
import { IsAnonContext } from "../../../contexts/IsAnonContext";
import { handleAnon, setIsAnonAsync } from "../../../firebase/handleAnonRegLog";
import { KAuthInput } from "../../ui-components/KAuthInput";
import { KSpacer } from "../../ui-components/KSpacer";
import { KTextButton } from "../../ui-components/KTextButton";
import { Colors } from "react-native-ui-lib";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { setIsAnon } = useContext(IsAnonContext);
  const navigator = useNavigation();

  return (
    <KContainer>
      <KSpacer h={"10%"} />
      <Image
        source={require("../../../assets/images/round-logo.png")}
        style={{ height: "35%", width: "60%" }}
      />
      <KAuthInput
        placeholder={"Email"}
        value={email}
        onChangeText={(val: string) => setEmail(val)}
        isPass={false}
      />
      <KSpacer h={15} />
      <KAuthInput
        placeholder={"Password"}
        value={pass}
        onChangeText={(text) => setPass(text)}
        isPass={true}
      />
      <KSpacer h={20} />
      <KTextButton
        label={"Login"}
        onPress={() => {
          setIsAnonAsync({ isUserAnon: false }).then(() =>
            handleLogin({ email: email, password: pass }),
          );
        }}
      />
      <KSpacer h={20} />
      {/*@ts-ignore*/}
      <TouchableOpacity onPress={() => navigator.navigate("Register")}>
        <Text
          style={{
            color: Colors.secondary2,
            fontFamily: "Raleway-Medium",
            fontSize: 14,
            letterSpacing: 0.5,
          }}
        >
          Need an account?
        </Text>
      </TouchableOpacity>
      <KSpacer h={10} />
      <TouchableOpacity
        onPress={() => {
          // we set the async storage value that holds if the user is anon to TRUE
          setIsAnonAsync({ isUserAnon: true })
            .then(() => setIsAnon(true))
            .then(() => handleAnon())
            .then(() => console.log("Success anon"));
        }}
      >
        <Text
          style={{
            color: Colors.secondary2,
            fontFamily: "Raleway-Medium",
            fontSize: 14,
            letterSpacing: 0.5,
          }}
        >
          Don’t want to use an account?
        </Text>
      </TouchableOpacity>
    </KContainer>
  );
}

export default Login;
