import React from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {Modal, StyleSheet, Text, View} from 'react-native';
import Tips from '../Molecules/Tips';
import {useNavigation} from '@react-navigation/native';
import {examType} from '../../types';

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
  const navigator = useNavigation();
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
          <View style={styles.modalImageContaner}>
            <ImageBackground
              style={styles.modalImg}
              source={require('../../assets/Images/Practice/running.png')} // Replace with the correct path to your image
              resizeMode="cover"
            />
          </View>

          <Text style={styles.modalText}>
            Do you want practice mode to be on ?
          </Text>

          <Tips
            note="If practice mode is on you will see the correct answer immediately
            after answering each question and your results will not be saved in
            your exams hstory"
            readonly={true}
          />

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
    paddingTop: 10,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
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
    width: '60%',
    height: 180,
    overflow: 'hidden',
    marginBottom: 10,
  },
  modalImg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    marginTop: 10,
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
    fontSize: 16,
    width: '70%',
    color: '#4d4d4d',
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
    borderRadius: 100,
    paddingVertical: 6,
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
