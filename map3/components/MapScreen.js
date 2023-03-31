import { React, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import TargetIcon from '../assets/target.js';
import SongPinIcon from "../assets/songPin.js";
import UserPin from "../assets/userPin.js"

import 'firebase/storage';
import { getDatabase, ref, onValue, query, orderByChild, startAt, endAt } from 'firebase/database';
import firebase from '../firebase';

import styles from '../styles';

import CustomCallout from './callout.js';

const db = getDatabase(firebase);

const MapScreen = ({ passedRegion, passedCurrentLoc }) => {
    const [region, setRegion] = useState(null);
    const [currentLoc, setCurrentLoc] = useState(null);
    const [markers, setMarkers] = useState([]);
  
    useEffect(() => {
      const mapQuery = query(ref(db, 'test/notes'), orderByChild('latitude'), startAt(37, 'latitude'), endAt(38, 'latitude'));
      onValue(mapQuery, (snapshot) => {
        const arr = [];
        snapshot.forEach((child) => {
          arr.push(child.val());
        });
        setMarkers(arr);
  
      });
    }, []);
  
    let [_mapView] = useState(null);
  
    useEffect(() => {
      setCurrentLoc(passedCurrentLoc);
    }, [passedCurrentLoc]);
  
  
    useEffect(() => {
      (async () => {
        setRegion(passedRegion);
        setCurrentLoc(passedCurrentLoc);
  
      })();
    }, []);
  
  
  
    if (region) {
      // Retrieve the locations of the markers
      /**
      get(query(ref(db, 'test/notes'), orderByChild('latitude'), startAt(37, 'latitude'), endAt(38, 'latitude')))
      .then((val) => val.forEach((child) => {
        markers.push(child);
        console.log(child);
      })); 
      */
      /** Okay there's some real terrible awful programming madness going on right now where the markers I think on re-rendering each time the location changes?
       * Don't know how big of a deal it is for performance but haha it works!!
       */
  
      return (<View style={styles.container}>
        <MapView
          provider="google"
          ref={(mapView) => { _mapView = mapView; }}
          style={styles.map}
          initialRegion={passedRegion}
        >
          {currentLoc && <Marker coordinate={currentLoc} tappable={false}><UserPin /></Marker>}
          {markers.map((marker, index) => {
            return (
              /**
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={`${marker.band} - ${marker.song}`}
                description={marker.note}
              >
                <SongPinIcon></SongPinIcon>
              </Marker>
              */
             <CustomCallout key = {index} marker = {marker} index = {index}/>
            );
          })}
        </MapView>
        {/* <TouchableOpacity 
         onPress = {() => _mapView.animateToRegion({
          latitude: currentLoc.latitude,
          longitude: currentLoc.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
         }, 1000)}> */}
        <Pressable onPress={() => _mapView.animateToRegion({
          latitude: currentLoc.latitude,
          longitude: currentLoc.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000)}
          style={styles.mapRecenter}>
          <TargetIcon></TargetIcon>
        </Pressable>
  
        {/* </TouchableOpacity> */}
        <StatusBar style="auto" />
      </View>);
    }
    else {
      return (<View style={styles.container}>
        <Text>Loading...</Text>
        <StatusBar style="auto" />
      </View>);
    }
  };

export default MapScreen;