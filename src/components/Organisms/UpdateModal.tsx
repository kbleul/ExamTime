import React from 'react';
import {TouchableOpacity, Image, Platform, Linking} from 'react-native';
import {Modal, StyleSheet, Text, View} from 'react-native';

import {screenHeight, screenWidth} from '../../utils/Data/data';

const hadleOpenPlaystore = () => {
  const packageName = 'com.exam_time.exam';

  if (Platform.OS === 'android') {
    Linking.openURL(`market://details?id=${packageName}`).catch(() => {
      // If Play Store app is not available, open the URL in the browser
      Linking.openURL(
        `https://play.google.com/store/apps/details?id=${packageName}`,
      );
    });
  }
};

const UpdateModal: React.FC<{
  updateModalVisible: boolean;
}> = ({updateModalVisible}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={updateModalVisible}
      onRequestClose={() => {}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            source={require('../../assets/Images/Practice/tip.png')}
            style={styles.modalImg}
          />

          <Text style={styles.modalText}>
            A new update is available on Google Playstore.
          </Text>
          <Text style={styles.modalSubText}>
            Please update the app to continue.
          </Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              touchSoundDisabled
              style={[styles.optionButton, styles.optionButtonSecondary]}
              onPress={hadleOpenPlaystore}>
              <Text
                style={[
                  styles.optionButtonText,
                  styles.optionButtonTextSecondary,
                ]}>
                Update
              </Text>
            </TouchableOpacity>
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
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
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
    overflow: 'hidden',
    maxHeight: 600,
    paddingVertical: screenHeight * 0.04,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 18,
    top: 18,
  },
  modalImageContaner: {
    width: '100%',
    height: 280,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cancelIconBtn: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  modalImg: {
    width: screenHeight * 0.05,
    height: screenHeight * 0.1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.045,
    width: '80%',
    color: '#505050',
    marginTop: 20,
  },
  modalSubText: {
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.04,
    width: '80%',
    color: '#505050',
    marginBottom: 20,
  },
  optionsContainer: {
    marginTop: 5,
    paddingBottom: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
    marginHorizontal: 20,
  },
  optionButton: {
    width: '40%',
    borderRadius: 10,
    overflow: 'hidden',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#F5A52D',
  },
  optionButtonSecondary: {
    backgroundColor: '#1E90FF',
    borderWidth: 0,
  },
  optionButtonText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#F5A52D',
  },
  optionButtonTextSecondary: {
    color: 'white',
  },
});

export default UpdateModal;
