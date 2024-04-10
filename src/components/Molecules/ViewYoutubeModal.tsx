import React from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import AntDesign from 'react-native-vector-icons/AntDesign';
import YoutubePlayer from 'react-native-youtube-iframe';

const ViewYoutubeModal = ({
  viewYoutubeLink,
  setViewYoutubeLink,
}: {
  viewYoutubeLink: string | null;
  setViewYoutubeLink: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={viewYoutubeLink ? true : false}
      onRequestClose={() => {
        setViewYoutubeLink(null);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            touchSoundDisabled
            style={styles.icon}
            onPress={() => setViewYoutubeLink(null)}>
            <AntDesign name="close" size={25} color="#000" />
          </TouchableOpacity>
          {viewYoutubeLink && (
            <View style={styles.videoContainer}>
              <ActivityIndicator style={styles.loading} />
              <YoutubePlayer
                height={230}
                play={false}
                videoId={viewYoutubeLink}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
  },
  scrollContainer: {
    overflow: 'hidden',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    paddingVertical: screenHeight * 0.04,
    paddingHorizontal: screenHeight * 0.01,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 18,
    top: 18,
    padding: 5,
    zIndex: 10,
  },
  videoContainer: {
    position: 'relative',
    marginTop: 30,
    width: '100%',
    height: 230,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  loading: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
});

export default ViewYoutubeModal;
