import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("arno@airbnb-api.com");
  const [password, setPassword] = useState("password01");
  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: ""
  });

  const setError = wrongMessage => {
    setErrorMessage({
      status: true,
      message: wrongMessage
    });
  };

  const handleChange = async () => {
    try {
      // -------
      if (!email) {
        return setError("Enter Mail");
      } else if (!password) {
        return setError("Enter Password");
      }
      // -------

      const response = await axios.post(
        "https://airbnb-api.now.sh/api/user/log_in",
        {
          email: email,
          password: password
        }
      );
      console.log(response.data);
      const token = response.data.token;
      console.log(token);

      setToken(token);
    } catch (error) {
      console.log("catch here");
      console.log(error.message);
      alert("Wrong Password or Email");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={300}
      enabled
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {Platform.OS === "ios" ? (
          <Ionicons
            name="ios-home"
            size={120}
            color={"white"}
            style={{ marginTop: 50, marginBottom: 30 }}
          />
        ) : (
          <Ionicons
            name="md-home"
            size={120}
            color={"white"}
            style={{ marginTop: 50, marginBottom: 30 }}
          />
        )}
        <Text style={styles.welcome}>Welcome</Text>
      </View>
      <View>
        <View>
          <TextInput
            placeholder="Username"
            placeholderTextColor="white"
            style={styles.input}
            value={email}
            onChangeText={text => {
              setEmail(text.toLowerCase());
            }}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry={true}
            style={styles.input}
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
          />
          {errorMessage.status && (
            <Text style={{ textAlign: "center", marginBottom: 10 }}>
              {errorMessage.message}
            </Text>
          )}
          <TouchableOpacity
            onPress={handleChange}
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={styles.button}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF5B60",
    paddingTop: Constants.statusBarHeight
  },
  input: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginHorizontal: 50,
    marginBottom: 30,
    paddingLeft: 20,
    paddingBottom: 10
  },
  welcome: {
    color: "white",
    fontSize: 50,
    fontWeight: "200",
    marginBottom: 50
  },
  button: {
    backgroundColor: "white",
    borderRadius: 30,
    overflow: "hidden",
    width: 130,
    lineHeight: 60,
    fontSize: 25,
    color: "#FF5B60",
    fontWeight: "300",
    textAlign: "center"
  }
});
