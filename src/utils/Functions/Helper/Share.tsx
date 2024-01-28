import {Alert, Share} from 'react-native';

export const handleShareApp = async () => {
  try {
    const appLink =
      'https://play.google.com/store/apps/details?id=com.exam_time.exam';
    const message = `Download ExamTime from playstore: ${appLink}`;

    const result = await Share.share({
      message: message,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    Alert.alert(error.message);
  }
};
