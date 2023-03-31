import { React, useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View, TextInput, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';

import { useFocusEffect } from '@react-navigation/native';

import MapView, { Marker } from 'react-native-maps';
import SongPinIcon from "../assets/songPin.js";
import ColorTrack from '../assets/colorTrack.png';

import 'firebase/storage';
import { getDatabase, push, ref, serverTimestamp, child, set, increment } from 'firebase/database';
import firebase from '../firebase';
import { getAuth } from "firebase/auth";

import styles from '../styles';

import {SPOTIFY_CLIENT_SECRET, SPOTIFY_CLIENT_ID} from '@env';

const db = getDatabase(firebase);
const auth = getAuth(firebase);

const AddScreen = ({ passedRegion, passedCurrentLoc }) => {
  const [songText, onChangeText] = useState('');
  const [bandText, onChangeText2] = useState('');
  const [commentText, onChangeText3] = useState('');
  const [region, setRegion] = useState(null);
  const [currentLoc, setCurrentLoc] = useState(null);
  const [pinColor, setPinColor] = useState(0);
  let tokenExpirationTime = 0;
  const [accessToken, setAccessToken] = useState(null);

  /** 
   * This is probably really silly and might affect performance but whatever -- esentially updates location
   * on the first time its focused, so the first time you click to add it'll update to your current location
   * Any time you focus on the screen afterwards though it won't update the location
   */
  useFocusEffect(
    useCallback(() => {
      if (currentLoc) {
        setRegion({
          latitude: currentLoc.latitude,
          longitude: currentLoc.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        });
        console.log("weh");
      }
    }, []),
  );

  useEffect(() => {
    setCurrentLoc(passedCurrentLoc);
  }, [passedCurrentLoc]);

  useEffect(() => {
    setRegion(passedRegion);
  }, [passedRegion]);

  useEffect(() => {
    (async () => {
      setRegion(passedRegion);
      setCurrentLoc(passedCurrentLoc);
    })();
  }, []);

  const clearAll = async () => {
    // Add the note to the database
    const searchQuery = encodeURIComponent(`${songText} artist:${bandText}`);
    const searchUrl = `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`;

    const data = {
      grant_type: 'client_credentials',
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET,
    };
    console.log(SPOTIFY_CLIENT_ID);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    
    
    if (!accessToken || Date.now() > tokenExpirationTime) {
      const res = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers,
          body: new URLSearchParams(data).toString(),
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setAccessToken(data.access_token);
          tokenExpirationTime = data.expires_in;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    let imageUrl = ""
  
    const response = await fetch(searchUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(data.tracks.items[0].album.images[0].url);
      imageUrl = data.tracks.items[0].album.images[0].url;
    })
    .catch(error => {
      console.error(error);
    });

    const notesRef = await push(ref(db, 'test/notes/'), {
      band: bandText,
      song: songText,
      note: commentText,
      user_id: auth.currentUser.uid,
      timestamp: serverTimestamp(),
      latitude: currentLoc.latitude,
      longitude: currentLoc.longitude,
      display_name: auth.currentUser.displayName,
      pin_color: pinColor,
      album_cover: imageUrl
    });

    // Increment this user's numPins
    const userRef = ref(db, 'test/users/' + auth.currentUser.uid);
    await set(child(userRef, "numPins"), increment(1));

    onChangeText('');
    onChangeText2('');
    onChangeText3('');
    setRegion({
      latitude: currentLoc.latitude,
      longitude: currentLoc.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });
  }

  const resetRegion = () => {
    setRegion({
      latitude: currentLoc.latitude,
      longitude: currentLoc.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });
  }

  if (region) {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.spread} keyboardVerticalOffset={130}>
        <MapView
          provider="google"
          style={styles.static_map}
          initialRegion={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={region}
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
        >
          {region && <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}><SongPinIcon color={`hsl(${pinColor}, 100%, 93%)`} /></Marker>}
        </MapView>
        <SafeAreaView>

          <ScrollView style={styles.addsong} contentContainerStyle={{ alignItems: 'left' }}>

            <Pressable onPress={resetRegion} style={styles.reset}>
              <Text style={styles.submitlabel}>Reset Location!</Text>
            </Pressable>
            <Text style={{ marginBottom: 20, fontFamily: 'Nunito-Regular', }}>{region.latitude}, {region.longitude}</Text>

            <Text style={styles.inputlabel}>Song Title</Text>
            <TextInput
              style={styles.input}
              value={songText}
              onChangeText={onChangeText}
              maxLength={50}
              //placeholder="Song Name"
              returnKeyType={bandText !== '' ? "done" : "next"}
              autofocus={true}
            />

            <Text style={styles.inputlabel}>Artist Name</Text>
            <TextInput
              style={styles.input}
              value={bandText}
              onChangeText={onChangeText2}
              maxLength={50}
              //placeholder="Band Name"
              returnKeyType={songText !== '' ? "done" : "next"}
              autofocus={true}
            />
            <Text style={styles.inputlabel}>Your Note</Text>
            <TextInput
              style={styles.input}
              value={commentText}
              onChangeText={onChangeText3}
              maxLength={280}
              //placeholder="Your Note"
              autofocus={true}
            />
            <Slider
              style={styles.colorSlider}
              onValueChange={setPinColor}
              step={1}
              minimumValue={0}
              maximumValue={360}
              thumbTintColor={`hsl(${pinColor}, 100%, 93%)`}
              trackImage={ColorTrack}
            />

            <Pressable onPress={clearAll} style={styles.submitPin}>
              <Text style={styles.submitlabel}>Submit</Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>

    );
  }
  else {
    return (<View style={styles.container}>
      <Text>Loading...</Text>
      <StatusBar style="auto" />
    </View>
    );
  }
};

export default AddScreen;