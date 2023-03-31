import { React, useState } from 'react';
import { Pressable, Text, TextInput, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';

import { getDatabase, ref, set } from 'firebase/database';
import firebase from '../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import styles from '../styles';

const db = getDatabase(firebase);
const auth = getAuth(firebase);

const RegisterScreen = ({ navigation }) => {
    let [displayName, onChangeName] = useState('Anonymous Mapper');
    let [email, onChangeEmail] = useState('');
    let [password, onChangePassword] = useState('');
    let [errorText, setErrorText] = useState('');
  
    function createAccount() {
      // Reset error text
      setErrorText("");
  
      // Create the user
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          const uid = userInfo.user.uid;
  
          // Add the display name
          updateProfile(auth.currentUser, {
            displayName: displayName, photoURL: "",
          })
            .then(() => {
              // Add the user to the database
              set(ref(db, 'test/users/' + uid), {
                email: email,
                displayName: displayName,
                photoURL: "",
                numPins: 0,
              })
                .then((res) => {
                  navigation.navigate("MaP3");
                })
                .catch((error) => {
                  // If we ran into an issue adding the user to the database,
                  // delete them so we don't run into additional issues
                  setErrorText(error);
                  deleteUser(auth.currentUser);
                });
            });
  
        })
        .catch((error) => {
          setErrorText(error.message);
        });
    }
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.spread}>
        <SafeAreaView>
          <ScrollView style={styles.login} keyboardShouldPersistTaps='always' contentContainerStyle={{ alignItems: 'left' }}>
            <Text style={styles.inputlabel}>Display Name</Text>
            <TextInput
              style={styles.input}
              value={displayName}
              onChangeText={onChangeName}
              maxLength={20}
              autofocus={true}
            />
  
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
            <Pressable onPress={createAccount} style={styles.submit}>
              <Text style={styles.submitlabel}>Create Account</Text>
            </Pressable>
            <Text>{errorText}</Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.link}>Login instead</Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
};

export default RegisterScreen;