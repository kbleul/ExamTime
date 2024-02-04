import {Alert, Share as ShareNative} from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

export const handleShareApp = async () => {
  try {
    const appLink =
      'https://play.google.com/store/apps/details?id=com.exam_time.exam';
    const message = `Download ExamTime from playstore: ${appLink}`;

    const result = await ShareNative.share({
      message: message,
    });

    if (result.action === ShareNative.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === ShareNative.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    Alert.alert(error.message);
  }
};

export const deleteShareImage = (imageUri: any) => {
  RNFS.unlink(imageUri)
    .then(() => console.log('Image deleted successfully'))
    .catch(error => console.log('Error deleting image:', error));
};

export const handleShareImage = async (
  imageUri: any,
  meta: {title: string; message: string},
) => {
  Share.open({url: imageUri, title: meta.title, message: meta.message})
    .then(res => {
      deleteShareImage(imageUri);
    })
    .catch((err: any) => {
      err && console.log('Share Image Error --> ', err);
    });
};
