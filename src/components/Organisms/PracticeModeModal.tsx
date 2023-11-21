import React from 'react';
import {ImageBackground, TouchableOpacity, Image, Button} from 'react-native';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {examType} from '../../types';
import {screenHeight, screenWidth} from '../../utils/Data/data';

import AntDesign from 'react-native-vector-icons/AntDesign';

const PracticeModeModal: React.FC<{
  practiceModeModalVisible: boolean;
  setPracticeModeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedExam: React.Dispatch<React.SetStateAction<examType | null>>;
  selectedExam: examType | null;
}> = ({
  practiceModeModalVisible,
  setPracticeModeModalVisible,
  setSelectedExam,
  selectedExam,
}) => {
  const navigator: any = useNavigation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={practiceModeModalVisible}
      onRequestClose={() => {
        setPracticeModeModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ImageBackground
            style={styles.modalImageContaner}
            source={require('../../assets/Images/Practice/running_bg.png')} // Replace with the correct path to your image
            resizeMode="cover">
            <Image
              source={require('../../assets/Images/Practice/running.png')}
              style={styles.modalImg}
            />

            <TouchableOpacity
              touchSoundDisabled
              onPress={() => setPracticeModeModalVisible(false)}
              style={styles.cancelIconBtn}>
              <AntDesign
                name="closecircleo"
                style={styles.cancelIcon}
                size={26}
                color="white"
              />
            </TouchableOpacity>
          </ImageBackground>

          <Text style={styles.modalText}>
            Do you want practice mode to be on ?
          </Text>

          <View style={styles.modalSubTextContainer}>
            <Text style={styles.modalSubText}>
              If practice mode is on you will see the correct answer right away
              after answering each questions and note that your results will not
              be saved in your exams history.
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[styles.optionButton, styles.optionButtonSecondary]}
              onPress={() => {
                setPracticeModeModalVisible(false);
                navigator.navigate('Exam-View', {
                  exam: selectedExam,
                  isPracticeMode: false,
                });
                setSelectedExam(null);
              }}>
              <Text
                style={[
                  styles.optionButtonText,
                  styles.optionButtonTextSecondary,
                ]}>
                No
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, styles.optionButtonSecondary]}>
              <Text
                style={[
                  styles.optionButtonText,
                  styles.optionButtonTextSecondary,
                ]}
                onPress={() => {
                  setPracticeModeModalVisible(false);
                  navigator.navigate('Exam-View', {
                    exam: selectedExam,
                    isPracticeMode: true,
                  });
                  setSelectedExam(null);
                }}>
                Yes
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
    height: (screenHeight * 4.3) / 5,
    maxHeight: 600,
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
    width: '60%',
    height: '70%',
    borderRadius: 10,
  },
  button: {
    borderRadius: 20,
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
    fontSize: screenWidth * 0.05,
    width: '80%',
    color: '#505050',
    marginVertical: 20,
  },
  modalSubTextContainer: {
    paddingHorizontal: 8,
    borderRadius: 10,
    borderColor: '#e1e1e1',
    width: '92%',
    marginVertical: 10,
    borderWidth: 1,
  },
  modalSubText: {
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.035,
    color: '#505050',
    margin: 4,
  },
  optionsContainer: {
    marginTop: 25,
    paddingBottom: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
    marginHorizontal: 20,
  },
  optionButton: {
    width: '30%',
    borderRadius: 10,
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

export default PracticeModeModal;
