import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {screenWidth} from '../../../utils/Data/data';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {convertTimestampToRelativeTime} from './logic';
import {useNotification} from '../../../context/notification';
import Toast from 'react-native-toast-message';

const ViewFullMessage = ({
  notification,
  setNotification,
}: {
  notification: any;
  setNotification: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const {deleteNotification} = useNotification();

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await deleteNotification(notification.id);

    if (response) {
      Toast.show({
        type: 'success',
        text1: 'Notification deleted successfully!',
        visibilityTime: 3000,
      });

      setTimeout(() => setNotification(null), 3000);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Notification deleted unsuccessfully!',
        visibilityTime: 3000,
      });
    }

    setIsLoading(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.msgText}>
        {notification.notification ? notification.notification : ' '}
      </Text>
      <View style={styles.msgFooter}>
        <Text style={styles.dateText}>
          {convertTimestampToRelativeTime(notification.createdAt)}
        </Text>
        <TouchableOpacity
          touchSoundDisabled
          onPress={handleDelete}
          style={styles.deleteBtn}>
          {isLoading ? (
            <ActivityIndicator color="black" size={24} />
          ) : (
            <AntDesign
              name="delete"
              color="#c2c2c2"
              size={screenWidth * 0.06}
            />
          )}
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  msgText: {
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.042,
    color: '#000',
    marginBottom: 15,
    lineHeight: 27,
    letterSpacing: 0.6,
  },
  msgFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  dateText: {
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.035,
    color: '#c2c2c2',
    textTransform: 'capitalize',
  },
  deleteBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewFullMessage;
