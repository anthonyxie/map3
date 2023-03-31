import { React, useState, useEffect, useCallback } from 'react';
import { Pressable, Text, View, Image } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import Icon from "react-native-vector-icons/Ionicons";

import ProfilePicture from '../assets/profile.png';

import 'firebase/storage';
import { getDatabase, ref, onValue, query } from 'firebase/database';
import { getAuth } from "firebase/auth";

import firebase from '../firebase';

import styles from '../styles';

const db = getDatabase(firebase);
const auth = getAuth(firebase);

const ProfileScreen = ({ navigation }) => {
  let [username, updateUsername] = useState("");
  let [numPins, updateNumPins] = useState("");
  let [profileImage, updateProfileImage] = useState("");

  useFocusEffect(
    useCallback(() => {
      console.log("profile");
    }, [])
  );

  useEffect(
    () => {
      const userInfoQuery = query(ref(db, 'test/users/' + auth.currentUser.uid));
      onValue(userInfoQuery, (snapshot) => {
        updateUsername(snapshot.val().displayName);
        updateNumPins(snapshot.val().numPins);
        updateProfileImage(snapshot.val().photoURL);
      });
    }
  )

  return (
    <View style={styles.container}>
      <View style={styles.cogView}>
        <Pressable onPress={() => navigation.navigate("SettingsStack")} style={styles.settingsButton}>
          <Icon name="cog" style={styles.cogIcon}></Icon>
        </Pressable>
      </View>
      <View style={styles.profileView}>
        <View style={styles.profileImageView}>
          <Image source={profileImage != '' ? { uri: profileImage } : ProfilePicture} style={styles.profileImage}></Image>
        </View>
        <View style={styles.profileContent}>
          <Text style={styles.profileName}>{username}</Text>
          <View style={styles.profilePinsPlaced}>
            <Icon name="musical-notes" style={styles.musicIcon}></Icon>
            <Text style={styles.profilePinsPlacedText}>Pins placed: {numPins}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ProfileScreen;