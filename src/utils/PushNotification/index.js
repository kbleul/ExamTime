import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

export async function requestUserPermission() {
  let fcmToken;
  const authStatus = await messaging().requestPermission({
    sound: true,
    announcement: true,
    badge: true,
    alert: true,
    provisional: true,
  });

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    fcmToken = await getFCMToken();
  } else {
    console.log('User has disabled notification permissions', authStatus);
  }
  return fcmToken;
}

async function getFCMToken() {
  await messaging().registerDeviceForRemoteMessages();

  if (Platform.OS === 'android') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }

  const fcmToken = await messaging().getToken();

  const savedFirebaseToken = await AsyncStorage.getItem('fireBaseToken');

  if (!savedFirebaseToken || savedFirebaseToken !== fcmToken) {
    AsyncStorage.setItem('fireBaseToken', fcmToken)
  }

  console.log("fireBaseToken ---- > ", fcmToken)




  // try {
  //   const token = ''; // IMPORTANT
  //   const baseUrl = '';

  //   //let's assume the endpoinnt to update device token is auth/device-token`
  //   let response = await fetch(`${baseUrl}/auth/device-token`, {
  //     method: 'PATCH',
  //     headers: {
  //       accept: 'application/json',
  //       'content-type': 'application/json;charset=utf-8',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({ token: fcmToken }),
  //   });

  //   const result = await response.json();
  //   return result;
  // } catch (e) {
  //   console.error('Error fetching data:', error);
  // }

  return fcmToken;
}
