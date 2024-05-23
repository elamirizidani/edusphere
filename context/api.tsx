import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants'
import {Platform} from 'react-native'


Notifications.setNotificationHandler({
  handleNotification: async() => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
  }),
});


export const fetchAllDataWF = async (endpoint, options) => {
    try {
      const response = await fetch(`https://eduspherenetworksltd.rw/new/parent/apis${endpoint}`, options);
      if (!response.ok) {
        // throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
    //   console.log(`Endpoint called: ${endpoint}`);
    //   console.log(data); // Log the fetched data
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };
  

  export const storeData = async(key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log('Error storing value: ', error);
    }
};


export const getData = async(key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        console.log('Error retrieving value: ', error);
    }
};



export const registerForPushNotificationsAsync = async () => {
  let token;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId
    })).data;
  //   console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }
  return token;
}