import {Platform} from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const checkCameraPermission = async () => {
  try {
    const permissionStatus = await check(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA,
    );

    if (permissionStatus !== RESULTS.GRANTED) {
      const result = await request(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.CAMERA
          : PERMISSIONS.IOS.CAMERA,
      );

      return result;
    }

    return permissionStatus;
  } catch (error) {
    console.error('Error checking camera permission:', error);
    return RESULTS.DENIED; // Default to denied in case of an error
  }
};

export default checkCameraPermission;
