import React, { useContext, useEffect, useState } from "react";
import KContainer from "../../ui-components/KContainer";
import { Image, Text, TextInput, TouchableOpacity } from "react-native";
import { handleRegister } from "../../../firebase/handleRegister";
import { KSpacer } from "../../ui-components/KSpacer";
import { ApiConstants } from "../../../constants/ApiConstants";
import { KAuthInput } from "../../ui-components/KAuthInput";
import { KTextButton } from "../../ui-components/KTextButton";
import { Colors } from "react-native-ui-lib";
import { handleAnon, setIsAnonAsync } from "../../../firebase/handleAnonRegLog";
import { IsAnonContext } from "../../../contexts/IsAnonContext";
import { useNavigation } from "@react-navigation/native";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");

  const [securityCode, setSecurityCode] = useState("");
  const [inputedSecCode, setInputedSecCode] = useState("");
  const [shouldShowSecurity, setShouldShowSecurity] = useState(false);

  const { setIsAnon } = useContext(IsAnonContext);
  const navigator = useNavigation();

  // we create a security code that the user will receive via email
  useEffect(() => {
    setSecurityCode(
      (
        Math.floor(Math.random() * 10) * 1000 +
        Math.floor(Math.random() * 10) * 100 +
        Math.floor(Math.random() * 10) * 10 +
        Math.floor(Math.random() * 10)
      ).toString(),
    );
  }, []);
  return (
    // @ts-ignore
    <KContainer>
      <KSpacer h={"10%"} />
      <Image
        source={require("../../../assets/images/round-logo.png")}
        style={{ height: "35%", width: "60%" }}
      />
      {!shouldShowSecurity && (
        <>
          <KAuthInput
            placeholder={"Username"}
            value={username}
            onChangeText={(text) => setUsername(text)}
            isPass={false}
          />
          <KSpacer h={15} />
          <KAuthInput
            placeholder={"Email"}
            value={email}
            onChangeText={(text) => setEmail(text)}
            isPass={false}
          />
          <KSpacer h={15} />
          <KAuthInput
            placeholder={"Password"}
            value={pass}
            onChangeText={(text) => setPass(text)}
            isPass={true}
          />
          <KSpacer h={15} />
          <KAuthInput
            placeholder={"Re-Password"}
            value={repass}
            onChangeText={(text) => setRepass(text)}
            isPass={true}
          />
          <KSpacer h={15} />
          <KTextButton
            label={"Get security code"}
            onPress={() => {
              if (pass === repass && pass !== "" && pass.length >= 6) {
                // if the passwords match we create the body that will be sent to the email api
                let emailData = {
                  service_id: ApiConstants.email_service_id,
                  template_id: ApiConstants.email_template_id,
                  user_id: ApiConstants.email_public_key,
                  template_params: {
                    email: email,
                    body: securityCode,
                  },
                };
                // we send the email
                fetch("https://api.emailjs.com/api/v1.0/email/send", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: JSON.stringify(emailData),
                })
                  .then((res) => {
                    // after we send the email we show the security text input
                    setShouldShowSecurity(true);
                    console.log(
                      "Send security code: " + securityCode + " with success",
                    );
                  })
                  .catch((err) => console.log(err));
              }
            }}
          />
        </>
      )}
      {shouldShowSecurity && (
        <>
          <KAuthInput
            placeholder={"Security code"}
            value={inputedSecCode}
            // keyboardType={"number-pad"}
            onChangeText={(text) => setInputedSecCode(text)}
            isPass={false}
          />
          <KSpacer h={15} />
          <KTextButton
            onPress={() => {
              // if the user inputs the same security code as in the email
              if (inputedSecCode === securityCode) {
                handleRegister({
                  email: email,
                  password: pass,
                  username: username,
                })
                  .then((res) => {
                    setShouldShowSecurity(false);
                    console.log("Success");
                  })
                  .catch((err) => console.log(err));
              }
            }}
            label={"Register"}
          />
        </>
      )}
      <KSpacer h={20} />
      {!shouldShowSecurity && (
        <>
          {/*@ts-ignore*/}
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <Text
              style={{
                color: Colors.secondary2,
                fontFamily: "Raleway-Medium",
                fontSize: 14,
                letterSpacing: 0.5,
              }}
            >
              Already have an account?{" "}
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
        </>
      )}
    </KContainer>
  );
}

export default Register;
