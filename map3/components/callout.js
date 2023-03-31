import { React, useState, useEffect, useCallback } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, ScrollView } from 'react-native';
import { Callout, CalloutSubview, Marker } from 'react-native-maps';
import SongPinIcon from "../assets/songPin.js";
import Cover from "../assets/cover.png";

function CustomCallout({ marker, index }) {
  const [modalVisible, setModalVisible] = useState(false);

  const changeVisibility = () => {
    let n = !modalVisible;
    setModalVisible(n);
  }
  const coverURL = marker.album_cover;
  return (
    <Marker
      key={index}
      coordinate={{
        latitude: marker.latitude,
        longitude: marker.longitude,
      }}
      zIndex={2}
      calloutAnchor={{ x: 0.35, y: 0.5 }}
    >
      <Callout style={styles.callOutWidth} onPress={changeVisibility}>
        <View style={styles.calloutView}>
          <Text style={styles.calloutText}>{marker.song}</Text>
        </View>
      </Callout>
      <View style={styles.centeredView}>
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.header}>
                <SongPinIcon color={`hsl(${marker.pin_color ? marker.pin_color : 126}, 100%, 93%)`} />
                <View style={styles.headerTextView}>
                  <Text numberOfLines={1} adjustsFontSizeToFit={true} style={styles.headerText}>{marker.band}</Text>
                  <Text numberOfLines={1} adjustsFontSizeToFit={true} style={styles.headerText}>{marker.song}</Text>
                </View>
              </View>
              <View style={styles.profileImageView}>
                <Image source={(coverURL != '' || coverURL) ? { uri: coverURL } : Cover} style={styles.profileImage}></Image>
              </View>
              <Text style={styles.modalDisplayNameText}>posted by: {marker.display_name}</Text>
              <View style={styles.noteStyle}>
                <Text numberOfLines={4} adjustsFontSizeToFit={true} style={styles.modalSubText}>{marker.note}</Text>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={changeVisibility}>
                <Text style={styles.textStyle}>x</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <SongPinIcon color={`hsl(${marker.pin_color ? marker.pin_color : 126}, 100%, 93%)`}></SongPinIcon>
    </Marker>

  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  calloutView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '70%',
    height: '50%',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignItems: 'center',
    flexDirection: 'column',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    position: "absolute",
    left: 10,
    top: 10,
    borderRadius: 10,
    paddingHorizontal: 5,
    elevation: 2,
  },
  header: {
    //backgroundColor: 'blue',
    flexDirection: 'row',
    
    marginTop: 25,
    marginBottom: 10,
    //marginLeft: ,
  
    width: '80%',
    flex: 1,
  },
  noteStyle: {
    width: '80%',
    flex: 1,
    borderRadius: 6,
    //backgroundColor: 'blue',
    borderWidth: 1,
    marginBottom: 10,
    marginHorizontal: 30
  },
  headerTextView: {
    paddingTop: 20,
    flex: 1,
    flexDirection: 'column',
  },
  profileImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black'
  },
  profileImageView: {
    //backgroundColor: 'blue',
    paddingBottom: 5,
    width: '80%',
    aspectRatio: 1
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#135D1A',
    width: 28,
    height: 28,
    borderRadius: 28
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  headerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    alignSelf: 'left'
  },
  modalDisplayNameText: {
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: '13',
    width: '90%',
    //flex: 1,
    marginLeft: 30,
    marginTop: 5,
    marginBottom: 10
  },
  modalSubText: {
    textAlign: 'left',
    fontSize: '13',
    padding: 5,
  },
  calloutText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    textAlign: 'center',
  },
  callOutWidth: {
    width: '300%'
  }
});

export default CustomCallout;
