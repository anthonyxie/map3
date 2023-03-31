import { React, useState, useEffect, useCallback } from 'react';
import { Pressable, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';

import { useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Icon from "react-native-vector-icons/Ionicons";

import DefaultProfilePicture from '../assets/profile.png';

import 'firebase/storage';
import { getDatabase, ref, onValue, query, child, set } from 'firebase/database';
import firebase from '../firebase';
import { getAuth, updateEmail, updatePassword, signInWithEmailAndPassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

import styles from '../styles';

const db = getDatabase(firebase);
const auth = getAuth(firebase);

const SettingsStack = createNativeStackNavigator();

const SettingsStackScreen = ({ navigation }) => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
      />
      <SettingsStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      {/* <SettingsStack.Screen
        name="ConnectSpotify"
        component={ConnectSpotifyScreen}
      /> */}
    </SettingsStack.Navigator>
  );
}

const SettingsScreen = ({ navigation }) => {
  let [username, updateUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [changedProfile, setChangedProfile] = useState(false);
  let [changedAccount, setChangedAccount] = useState(false);
  let [profileImage, updateProfileImage] = useState("");

  const userRef = ref(db, 'test/users/' + auth.currentUser.uid);

  useFocusEffect(
    useCallback(() => {
      console.log("profile settings");
      const userInfoQuery = query(ref(db, 'test/users/' + auth.currentUser.uid));
      onValue(userInfoQuery, (snapshot) => {
        updateUsername(snapshot.val().displayName);
        setEmail(snapshot.val().email);
        updateProfileImage(snapshot.val().photoURL);
      });
    }, [])
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      updateProfileImage(result.assets[0].uri);
      setChangedProfile(true);
      await set(child(userRef, "photoURL"), result.assets[0].uri);
    }
  };

  const updateProfile = () => {
    const userRef = ref(db, 'test/users/' + auth.currentUser.uid);
    if (changedProfile) {
      set(child(userRef, "displayName"), username);
      set(child(userRef, "email"), email);
      setChangedProfile(false);
    }
    if (changedAccount) {
      updateEmail(auth.currentUser, email).then(() => {
        console.log("Email updated!");
      }).catch((error) => { console.log(error); });
      updatePassword(auth.currentUser, password).then(() => {
        console.log("Password updated!");
        auth.signOut();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const uid = userCredential.user.uid;
            setChangedAccount(false);
          })
          .catch((error) => {
            console.log(error);
          })
      }).catch((error) => { console.log(error); })
    }
    navigation.navigate("Profile");
  }

  const logout = () => {
    auth.signOut();
    navigation.navigate("Register");
  }

  return (
    <KeyboardAwareScrollView>
      <ScrollView>
        <View style={styles.topPanel}>
          <Pressable onPress={updateProfile}>
            <Icon name="chevron-back-outline" style={styles.backArrow}></Icon>
          </Pressable>
        </View>
        <View style={styles.settingsContentPanel}>
          <View style={styles.profileImageWrapper}>
            <TouchableOpacity onPress={pickImage} style={styles.profileImageView}>
              <ImageBackground style={styles.profileImage} source={profileImage != '' ? { uri: profileImage } : DefaultProfilePicture} key={profileImage}>
                <Icon name="image-outline" style={styles.editImage}></Icon>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.settingsContent}>
            <Text style={styles.inputlabel}>Display Name</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={text => { setChangedProfile(true); updateUsername(text); }}
              maxLength={20}
              placeholder={username}
              autofocus={true}
            />
            <Text style={styles.inputlabel}>Change Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={text => { setChangedAccount(true); setEmail(text); }}
              maxLength={50}
              placeholder={email}
              autofocus={true}
            />
            <Text style={styles.inputlabel}>Change Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={text => { setChangedAccount(true); setPassword(text); }}
              secureTextEntry={true}
              autofocus={true}
            />
          </View>
        </View>
        <Pressable onPress={logout} style={styles.logout}>
          <Text style={styles.submitlabel}>Logout</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const ChangePasswordScreen = ({ navigation }) => {

}

export default SettingsStackScreen;