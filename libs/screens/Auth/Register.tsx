import React, { useEffect, useState } from "react";
import KContainer from "../../ui-components/KContainer";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { handleRegister } from "../../../firebase/handleRegister";
import { KSpacer } from "../../ui-components/KSpacer";
import { ApiConstants } from "../../../constants/ApiConstants";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");

  const [securityCode, setSecurityCode] = useState("");
  const [inputedSecCode, setInputedSecCode] = useState("");
  const [shouldShowSecurity, setShouldShowSecurity] = useState(false);

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
      <TextInput
        placeholder={"Username"}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <KSpacer />
      <TextInput
        placeholder={"Email"}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <KSpacer />
      <TextInput
        placeholder={"Password"}
        value={pass}
        onChangeText={(text) => setPass(text)}
        secureTextEntry
      />
      <KSpacer />
      <TextInput
        placeholder={"Re-Password"}
        value={repass}
        onChangeText={(text) => setRepass(text)}
        secureTextEntry
      />
      <KSpacer />
      {!shouldShowSecurity && (
        <TouchableOpacity
          onPress={() => {
            if (pass === repass) {
              console.log(securityCode);
              let data = {
                service_id: ApiConstants.email_service_id,
                template_id: ApiConstants.email_template_id,
                user_id: ApiConstants.email_public_key,
                template_params: {
                  email: email,
                  body: securityCode,
                },
              };
              fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
              })
                .then((res) => {
                  setShouldShowSecurity(true);
                  console.log(
                    "Send security code: " + securityCode + " with success",
                  );
                })
                .catch((err) => console.log(err));
            }
          }}
        >
          <Text>Get security code</Text>
        </TouchableOpacity>
      )}
      <KSpacer />
      <KSpacer />
      {shouldShowSecurity && (
        <>
          <TextInput
            placeholder={"Security code"}
            value={inputedSecCode}
            keyboardType={"number-pad"}
            onChangeText={(text) => setInputedSecCode(text)}
          />
          <TouchableOpacity
            onPress={() => {
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
          >
            <Text>Register</Text>
          </TouchableOpacity>
        </>
      )}
    </KContainer>
  );
}

export default Register;
