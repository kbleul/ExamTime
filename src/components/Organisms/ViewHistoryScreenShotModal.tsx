import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Platform,
} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';
import {
  deleteShareImage,
  handleShareImage,
} from '../../utils/Functions/Helper/Share';
import {style} from '../../screens/App/Study/styles';
const ViewHistoryScreenShotModal: React.FC<{
  screenShotImage: any;
  setScreenShotImage: React.Dispatch<React.SetStateAction<any>>;
}> = ({screenShotImage, setScreenShotImage}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={screenShotImage === null ? false : true}
      onRequestClose={() => {
        setScreenShotImage(null);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.closeBtnContainer}>
            <View style={styles.indicator} />
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                const imageUrl = screenShotImage;
                setScreenShotImage(null);
                deleteShareImage(imageUrl);
              }}>
              <AntDesign name="close" size={screenWidth * 0.05} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.previewText}>Image Preview</Text>

          <View style={styles.imageContainer}>
            <Image
              source={{uri: screenShotImage}}
              style={styles.previewImage}
            />
          </View>

          <View style={styles.share}>
            <Text style={[styles.challengeScoreText, styles.shareScoreText]}>
              Sharing this image with friends and family !
            </Text>

            <View style={styles.shareContainer}>
              <TouchableOpacity
                touchSoundDisabled
                onPress={() =>
                  handleShareImage(screenShotImage, {
                    title: 'Share Screenshoot',
                    message: 'Sharing image with friends and family !',
                  })
                }>
                <FontAwesome5Brands
                  name="facebook"
                  color={'#1877F2'}
                  size={34}
                />
              </TouchableOpacity>
              <TouchableOpacity
                touchSoundDisabled
                onPress={() =>
                  handleShareImage(screenShotImage, {
                    title: 'Share Screenshoot',
                    message: 'Sharing image with friends and family !',
                  })
                }>
                <AntDesign name="instagram" color={'red'} size={32} />
              </TouchableOpacity>
              <TouchableOpacity
                touchSoundDisabled
                onPress={() =>
                  handleShareImage(screenShotImage, {
                    title: 'Share Screenshoot',
                    message: 'Sharing image with friends and family !',
                  })
                }>
                <FontAwesome5Brands
                  name="telegram"
                  color={'#2AABEE'}
                  size={32}
                />
              </TouchableOpacity>
              <TouchableOpacity
                touchSoundDisabled
                onPress={() =>
                  handleShareImage(screenShotImage, {
                    title: 'Share Screenshoot',
                    message: 'Sharing image with friends and family !',
                  })
                }>
                <AntDesign name="link" size={32} color={'#000'} />
              </TouchableOpacity>
            </View>
          </View>
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
    position: 'relative',
  },
  modalView: {
    minHeight: (screenHeight * 1.2) / 2,
    height: (screenHeight * 1.6) / 2,
    marginTop: (screenHeight * 0.4) / 2,
    paddingTop: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  closeBtnContainer: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.06,
  },
  indicator: {
    width: screenWidth / 4,
    height: 5,
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: '#b3afa6',
    paddingHorizontal: screenWidth * 0.09,
  },

  closeBtn: {
    alignSelf: 'flex-end',
  },

  challengeScore: {
    height: '47%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F0E2A1',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  challengeScoreText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.035, //28
    color: '#364158',
    width: '65%',
    textAlign: 'center',
  },
  previewText: {
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.035, //28
    color: '#fff',
    borderColor: '#fcfcfc',
    textAlign: 'center',
    paddingTop: 6,
    paddingBottom: 2,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 200,
    marginBottom: 10,
    backgroundColor: '#000',
  },
  previewImage: {
    width: screenWidth / 1.8,
    height: screenHeight / 2.1,
  },
  share: {
    width: '80%',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#F1F1F1',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 45 : 35,
  },
  shareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  shareScoreText: {
    width: '100%',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  imageContainer: {
    backgroundColor: '#fcfcfc',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default ViewHistoryScreenShotModal;
