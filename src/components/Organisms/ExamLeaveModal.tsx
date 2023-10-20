import React, {useState} from 'react';
import {Image, ImageBackground, TouchableOpacity} from 'react-native';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

const ExamLeaveModal: React.FC<{
  exitExamModalVisible: boolean;
  setExitExamModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({exitExamModalVisible, setExitExamModalVisible}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={exitExamModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setExitExamModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalImageContaner}>
            <ImageBackground
              style={styles.modalImg}
              source={require('../../assets/Images/Practice/modal1.png')} // Replace with the correct path to your image
              resizeMode="cover"
            />
          </View>

          <Text style={styles.modalText}>You haven’t completed the exam!</Text>

          <Text style={styles.modalText}>
            Are you sure you want to finish ?
          </Text>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              <Text style={styles.infoTextGreen}>40 </Text>answers
            </Text>
            <Text style={[styles.infoText, styles.infoTextSecondary]}>
              <Text style={styles.infoTextYellow}>10 </Text>remaining
            </Text>
            <Text style={[styles.infoText, styles.infoTextThird]}>
              <Text style={styles.infoTextPurple}>2:20 </Text>time left
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionButton}>
              <Text
                style={styles.optionButtonText}
                onPress={() => setExitExamModalVisible(false)}>
                cancle
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, styles.optionButtonSecondary]}>
              <Text
                style={[
                  styles.optionButtonText,
                  styles.optionButtonTextSecondary,
                ]}>
                Finish now
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
    paddingTop: 10,

    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
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
  },
  modalImageContaner: {
    width: '40%',
    height: 140,
    overflow: 'hidden',
    marginBottom: 10,
  },
  modalImg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginVertical: 4,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    width: '100%',
    color: '#4d4d4d',
  },
  infoContainer: {
    marginVertical: 10,
  },
  infoText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    width: '100%',
    color: '#4d4d4d',
  },
  infoTextSecondary: {
    color: '#F5A52D',
  },
  infoTextThird: {
    color: '#6A5ACD',
  },
  infoTextGreen: {
    fontFamily: 'Montserrat-Bold',
    color: '#008E97',
  },
  infoTextYellow: {
    fontFamily: 'Montserrat-Bold',
    color: '#F5A52D',
  },
  infoTextPurple: {
    fontFamily: 'Montserrat-Bold',
    color: '#6A5ACD',
  },
  optionsContainer: {
    marginTop: 10,
    paddingBottom: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
    marginHorizontal: 20,
  },
  optionButton: {
    width: '42%',
    borderRadius: 7,
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

export default ExamLeaveModal;
