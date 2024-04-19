import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import Config from 'react-native-config';

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
    await getFCMToken();
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
    AsyncStorage.setItem('fireBaseToken', fcmToken);
  }

  return fcmToken;
}


export async function checkAndUpdateFCMToken(token) {
  await messaging().registerDeviceForRemoteMessages();


  const fcmToken = await messaging().getToken();

  const savedFirebaseToken = await AsyncStorage.getItem('fireBaseToken');

  if (!savedFirebaseToken || savedFirebaseToken !== fcmToken) {
    AsyncStorage.setItem('fireBaseToken', fcmToken);

    if (savedFirebaseToken !== fcmToken) {
      try {

        //let's assume the endpoinnt to update device token is auth/device-token`
        let response = await fetch(`${Config.API_URL}/user/updatefirebasetoken`, {
          method: 'PUT',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ fireBaseToken: fcmToken }),
        });


        const result = await response.json();

        return result;
      } catch (e) {
        console.error('Error fetching data:', error);
      }
    }

  }

  try {
    //let's assume the endpoinnt to update device token is auth/device-token`
    let response = await fetch(`${Config.API_URL}user/updatefirebasetoken`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fireBaseToken: fcmToken }),
    });


    const result = await response.json();

    return result;
  } catch (e) {
    console.error('Error fetching data:', error);
  }



  return fcmToken;
}