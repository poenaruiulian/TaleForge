import React, { useContext, useEffect, useState } from "react";
import KContainer from "../../ui-components/KContainer";
import { Alert, Image, Text, TouchableOpacity } from "react-native";
import { KSpacer } from "../../ui-components/KSpacer";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import {
  getAnonIdAsync,
  handleAnon,
  setIsAnonAsync,
} from "../../../firebase/handleAnonRegLog";
import { IsAnonContext } from "../../../contexts/IsAnonContext";
import { KTextButton } from "../../ui-components/KTextButton";
import { handleSignOutAnon } from "../../../firebase/handleSignOutAnon";
import { KAuthInput } from "../../ui-components/KAuthInput";
import { ApiConstants } from "../../../constants/ApiConstants";
import { handleRegister } from "../../../firebase/handleRegister";
import { Colors } from "react-native-ui-lib";
import { handleRegisterForAnon } from "../../../firebase/handleRegisterForAnon";
import { KHeaderAuxPages } from "../../ui-components/KHeaderAuxPages";
function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");

  const [securityCode, setSecurityCode] = useState("");
  const [inputedSecCode, setInputedSecCode] = useState("");
  const [shouldShowSecurity, setShouldShowSecurity] = useState(false);

  const { setIsAnon, isAnon } = useContext(IsAnonContext);
  const [anonUserId, setAnonUserId] = useState("");
  const navigator = useNavigation();

  useEffect(() => {
    const func = async () =>
      await getAnonIdAsync().then((resp) => setAnonUserId(resp));

    setSecurityCode(
      (
        Math.floor(Math.random() * 10) * 1000 +
        Math.floor(Math.random() * 10) * 100 +
        Math.floor(Math.random() * 10) * 10 +
        Math.floor(Math.random() * 10)
      ).toString(),
    );

    func();
  }, []);
  return (
    // @ts-ignore
    <>
      <KHeaderAuxPages label={"Profile"} />
      <KContainer>
        <KSpacer h={50} />

        {isAnon ? (
          // code for if is anon user
          <>
            <KSpacer h={50} />
            <Image
              source={require("../../../assets/images/logo_header.png")}
              style={{ height: "7%", width: "72%" }}
            />
            <KSpacer h={20} />
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
                            "Send security code: " +
                              securityCode +
                              " with success",
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
                      handleRegisterForAnon({
                        email: email,
                        password: pass,
                        username: username,
                        anonUserId: anonUserId,
                      })
                        .then((res) => {
                          setIsAnon(false);
                          setShouldShowSecurity(false);
                          // @ts-ignore
                          navigator.navigate("Home");
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
                <KSpacer h={30} />
                <KTextButton
                  label={"Sign out"}
                  onPress={() =>
                    Alert.alert(
                      "Sign out?",
                      "\nYou are currently using an anonymously account and if you sign out you will lose the solo chat.\n\nWe recommend making an account.",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "I understand",
                          style: "destructive",
                          onPress: async () =>
                            await setIsAnonAsync({ isUserAnon: false })
                              .then(() => setIsAnon(false))
                              .then(() =>
                                handleSignOutAnon({ anonUserId: anonUserId }),
                              )
                              .then(() => console.log("Sign out success"))
                              .catch((err) => console.log(err)),
                        },
                      ],
                    )
                  }
                />
              </>
            )}
          </>
        ) : (
          <>
            <KSpacer h={50} />
            <KTextButton
              label={"Sign out"}
              onPress={() => {
                signOut(auth)
                  .then(
                    async () =>
                      await setIsAnonAsync({ isUserAnon: false })
                        .then(() => setIsAnon(false))
                        .then(() => console.log("Sign out success"))
                        .catch((err) => console.log(err)),
                  )
                  .catch((err) => console.log(err));
              }}
            />
          </>
        )}
      </KContainer>
    </>
  );
}

export default Profile;
