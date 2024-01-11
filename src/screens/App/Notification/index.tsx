import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {screenHeight, screenWidth} from '../../../utils/Data/data';
import {useNavigation} from '@react-navigation/native';
import ViewFullMessage from './ViewFullMessage';
import {useNotification} from '../../../context/notification';
import {convertTimestampToRelativeTime} from './logic';
import MessageBox from '../../../components/Atoms/MessageBox';

const Notification = () => {
  const navigator: any = useNavigation();

  const {notifications} = useNotification();
  const [notification, setNotification] = useState<string | null>(null);

  return (
    <SafeAreaView style={IndexStyle.container}>
      <TouchableOpacity
        touchSoundDisabled
        style={styles.headerContainerTop}
        onPress={() =>
          notification ? setNotification(null) : navigator.goBack()
        }>
        <AntDesign name="left" size={screenWidth * 0.05} color="#000" />
        <Text style={styles.headerTitle}>Notifications</Text>
      </TouchableOpacity>

      {!notifications ||
        (notifications?.length === 0 && (
          <MessageBox
            title="No notifications to show right now!"
            subTitle="Check back after a while."
          />
        ))}
      {!notification && notifications && (
        <ScrollView
          contentContainerStyle={IndexStyle.ScrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.messageBox}>
            {notifications.map((item: any, index: number) => (
              <NotificationMsg
                key={item.id + 'notif' + index}
                message={item}
                setNotification={setNotification}
              />
            ))}
          </View>
        </ScrollView>
      )}

      {notification && (
        <ViewFullMessage
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </SafeAreaView>
  );
};

const NotificationMsg = ({
  message,
  setNotification,
}: {
  message: any;
  setNotification: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const {updateNotificationStatus} = useNotification();

  const handlePress = () => {
    setNotification(
      message && message.notification
        ? {...message.notification, wasRead: true}
        : ' ',
    );

    if (message.wasRead === false) {
      updateNotificationStatus(message.id);
    }
  };


  const notificationObject = message.notification;
  return (
    <TouchableOpacity
      touchSoundDisabled
      style={messageStyle.button}
      onPress={() => handlePress()}>
      <Text
        style={
          message.wasRead
            ? [messageStyle.msgText, messageStyle.msgTextViewed]
            : messageStyle.msgText
        }>
        {notificationObject.notification
          ? notificationObject.notification
          : ' '}
      </Text>
      <Text
        style={
          notificationObject.wasRead
            ? [messageStyle.dateText, messageStyle.msgTextViewed]
            : messageStyle.dateText
        }>
        {convertTimestampToRelativeTime(notificationObject.createdAt)}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  headerContainerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: screenHeight * 0.045,

    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    marginBottom: screenWidth * 0.03,
    paddingHorizontal: 10,
    paddingBottom: screenWidth * 0.04,
  },
  headerTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.055, //28
    color: '#000',
    lineHeight: screenHeight * 0.05, //34
    marginTop: screenWidth * 0.009,
    marginLeft: 10,
  },
  messageBox: {
    paddingHorizontal: 20,
  },
});

const messageStyle = StyleSheet.create({
  button: {
    paddingVertical: screenWidth * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  msgText: {
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.04,
    color: '#000',
    width: '65%',
    maxHeight: screenWidth * 0.045,
    overflow: 'hidden',
  },
  msgTextViewed: {
    fontFamily: 'PoppinsLight',
  },
  dateText: {
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.028,
    color: '#000',
    textTransform: 'capitalize',
  },
});

export default Notification;
