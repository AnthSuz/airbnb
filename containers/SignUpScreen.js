import React, { useState } from "react";
import { View, Text, Platform, TextInput, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";

const SignUpScreen = ({ setToken, setId }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const HandleChange = async () => {
    const responses = await axios.post(
      "https://airbnb-api.herokuapp.com/api/user/sign_up",
      {
        email: email,
        password: password,
        username: username,
        name: name,
        description: description
      }
    );
    setToken(responses.data.token);
    setId(responses.data._id);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      behavior="position"
      //  keyboardVerticalOffset={300}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Ionicons
          name={
            Platform.OS === "ios"
              ? "ios-arrow-round-back"
              : "md-arrow-round-back"
          }
          color="white"
          size={50}
          style={{ marginHorizontal: 10 }}
        />
      </TouchableOpacity>
      <Text style={styles.welcome}>Créer un compte</Text>
      {/* ----------  */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="white"
        value={email}
        onChangeText={text => {
          setEmail(text);
        }}
        style={styles.input}
      />
      {/* ----------  */}
      <View
        style={{
          flexDirection: "row"
        }}
      >
        <TextInput
          value={password}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={text => {
            setPassword(text);
          }}
          style={[styles.input, { flex: 1 }]}
        />
        {/* ----------  */}
        <TextInput
          value={confirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={text => {
            setConfirmPassword(text);
          }}
          style={[styles.input, { flex: 1 }]}
        />
      </View>
      {/* ----------  */}
      <View
        style={{
          flexDirection: "row"
        }}
      >
        <TextInput
          value={username}
          placeholder="Username"
          placeholderTextColor="white"
          onChangeText={text => {
            setUsername(text);
          }}
          style={[styles.input, { flex: 1 }]}
        />
        {/* ----------  */}
        <TextInput
          value={name}
          placeholder="Name"
          placeholderTextColor="white"
          onChangeText={text => {
            setName(text);
          }}
          style={[styles.input, { flex: 1 }]}
        />
      </View>
      {/* ----------  */}
      {/* <View> */}
      <TextInput
        value={description}
        placeholder="Description"
        placeholderTextColor="white"
        onChangeText={text => {
          setDescription(text);
        }}
        style={[styles.input, { height: 200 }]}
        multiline={true}
      />
      {/* </View> */}
      <TouchableOpacity
        onPress={HandleChange}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Text style={styles.button}>Sign Up</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF5B60",
    paddingTop: Constants.statusBarHeight
  },
  input: {
    marginHorizontal: 10,
    textAlign: "center",
    /* backgroundColor: "rgba(255,255,255,0.5)", */
    borderBottomWidth: 1,
    borderBottomColor: "white",
    // paddingBottom: 20,
    marginBottom: 30,
    fontSize: 20,
    height: 40,
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  welcome: {
    color: "white",
    fontSize: 50,
    fontWeight: "200",
    marginBottom: 50,
    textAlign: "center"
  },
  button: {
    backgroundColor: "white",
    borderRadius: 25,
    overflow: "hidden",
    width: 130,
    lineHeight: 50,
    fontSize: 25,
    color: "#FF5B60",
    fontWeight: "300",
    textAlign: "center"
  }
});

export default SignUpScreen;
