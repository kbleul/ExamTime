import React, {useState} from 'react';
import {
  ActivityIndicator,
  Linking,
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
import {getYoutubeVidId} from '../../../utils/Functions/Get';
import ViewYoutubeModal from '../../../components/Molecules/ViewYoutubeModal';

const ViewFullMessage = ({
  notification,
  setNotification,
}: {
  notification: any;
  setNotification: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const {deleteNotification} = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const [viewYoutubeLink, setViewYoutubeLink] = useState<string | null>(null);

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
        text1: 'Delete Notification failed!',
        visibilityTime: 3000,
      });
    }

    setIsLoading(false);
  };

  const handleClickLink = (link: {type: string; link: string}) => {
    if (link.type === 'youtube' || link.type === 'Youtube') {
      setViewYoutubeLink(getYoutubeVidId(link.link));
    } else {
      Linking.openURL(link.link);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.msgText}>
        {notification.notification
          ? notification.notification.notification
          : ' '}
      </Text>

      {notification.notification.links &&
        notification.notification.links.length > 0 && (
          <View style={styles.linksContainer}>
            {notification.notification.links.map((link: any, index: number) => (
              <TouchableOpacity
                key={index + '--notification--' + index}
                touchSoundDisabled
                onPress={() => handleClickLink(link)}>
                <Text style={styles.linksButtonText}>{link.link}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

      <View style={styles.msgFooter}>
        <Text style={styles.dateText}>
          {convertTimestampToRelativeTime(
            notification.createdAt
              ? notification.createdAt
              : notification.notification.createdAt,
          )}
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

      {viewYoutubeLink && (
        <ViewYoutubeModal
          viewYoutubeLink={viewYoutubeLink}
          setViewYoutubeLink={setViewYoutubeLink}
        />
      )}
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
  linksContainer: {
    marginVertical: 20,
    gap: 20,
  },
  linksButtonText: {
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.035,
    color: '#5a8edb',
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
