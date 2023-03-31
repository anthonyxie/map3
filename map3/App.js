/** 
 * MaP3 is a music sharing map application.
 * Made for CS194W, Winter 2022-23.
 */

// React basics
import { React, useState, useEffect, useCallback } from 'react';
import { Text, View, LogBox } from 'react-native';

// Fonts and appearances
import Icon from "react-native-vector-icons/Ionicons";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Location from 'expo-location';

// Styles and Component Screens
import styles from './styles';
import AddScreen from './components/AddScreen';
import LoginScreen from './components/LoginScreen';
import MapScreen from './components/MapScreen';
import ProfileScreen from './components/ProfileScreen';
import RegisterScreen from './components/RegisterScreen';
import SettingsStackScreen from './components/SettingsScreen';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from \'@react-native-async-storage/async-storage\' instead of \'react-native\'. See https://github.com/react-native-async-storage/async-storage', 'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead']);

export default function App() {

  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Medium': require('./assets/fonts/Nunito-Medium.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
  });


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (<NavigationContainer onLayout={onLayoutRootView}>
    <Stack.Navigator initialRouteName="Register">
      <Stack.Screen name="MaP3" component={MapTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  </NavigationContainer>);
}

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from \'@react-native-async-storage/async-storage\' instead of \'react-native\'. See https://github.com/react-native-async-storage/async-storage']);


function MapTabs() {
  const [region, setRegion] = useState(null);
  const [currentLoc, setCurrentLoc] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      let subscription = await Location.watchPositionAsync(
        {
          enableHighAccuracy: true,
          distanceInterval: 10,
          timeInterval: 10000,
        },
        ({ coords }) => {
          setCurrentLoc({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        }
      );

      return () => {
        subscription.remove();
      };
    })();
  }, []);

  // Icon types: See https://ionic.io/ionicons/
  // Navigator documentation: See https://reactnavigation.org/docs/tab-based-navigation
  if (region) {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Add Pin') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#000',
        })}>
        <Tab.Screen
          name="Map"
          children={() => <MapScreen passedRegion={region} passedCurrentLoc={currentLoc} />}
          options={{
            title: 'Map',
            headerStyle: {
              backgroundColor: '#135D1A',
              height: 100
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Montserrat-SemiBold',
            },
          }}
        />
        <Tab.Screen
          name="Add Pin"
          children={() => <AddScreen passedRegion={region} passedCurrentLoc={currentLoc} />}
          options={{
            title: 'Add Pin',
            headerStyle: {
              backgroundColor: '#135D1A',
              height: 100
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Montserrat-SemiBold',
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            headerStyle: {
              backgroundColor: '#135D1A',
              height: 100
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Montserrat-SemiBold',
            },
          }}
        />
        <Tab.Screen
          name="SettingsStack"
          component={SettingsStackScreen}
          options={{
            tabBarButton: () => null,
            title: 'Settings',
            headerStyle: {
              backgroundColor: '#135D1A',
              height: 100
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Montserrat-SemiBold',
            },
          }}
        />
      </Tab.Navigator>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <Text style={{ fontFamily: 'AvenirNext-Regular' }}>Loading...</Text>
      </View>
    );
  }
}