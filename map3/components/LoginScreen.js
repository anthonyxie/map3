import { React, useState } from 'react';
import { Pressable, Text, TextInput, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';

import firebase from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import styles from '../styles';

const auth = getAuth(firebase);

const LoginScreen = ({ navigation }) => {
    let [email, onChangeEmail] = useState('');
    let [password, onChangePassword] = useState('');
    let [errorText, setErrorText] = useState('');
  
    function login() {
      // Reset error text
      setErrorText("");
  
      // Try to sign in
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const uid = userCredential.user.uid;
          navigation.navigate("MaP3", { "uid": uid });
        })
        .catch(_ => {
          setErrorText("Username or password was incorrect. Please try again.");
        })
    }
  
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.spread}>
        <SafeAreaView>
          <ScrollView style={styles.login} keyboardShouldPersistTaps='always' contentContainerStyle={{ alignItems: 'left' }}>
  
            <Text style={styles.inputlabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={onChangeEmail}
              maxLength={50}
              autoComplete={"email"}
              inputMode={"email"}
              autofocus={true}
            />
  
            <Text style={styles.inputlabel}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={onChangePassword}
              secureTextEntry={true}
              autofocus={true}
            />
            <Pressable onPress={login} style={styles.submit}>
              <Text style={styles.submitlabel}>Login</Text>
            </Pressable>
            <Text>{errorText}</Text>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={styles.link}>Register instead</Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  };
  
export default LoginScreen;