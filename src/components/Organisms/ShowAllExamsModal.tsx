import React from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {Alert, Modal, StyleSheet, Text, View} from 'react-native';
import {examsStyle} from './FullExams';
import {examType} from '../../types';

const ShowAllExamsModal: React.FC<{
  exitExamModalVisible: boolean;
  setExitExamModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  exams: examType[];
}> = ({exitExamModalVisible, setExitExamModalVisible, exams}) => {
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
          {exams.map((exam, index) => (
            <TouchableOpacity
              key={exam.id}
              touchSoundDisabled
              style={examsStyle.imgContainer}
              onPress={() => setExitExamModalVisible(false)}>
              <ImageBackground
                style={examsStyle.imageBG}
                source={
                  (index + 1) % 2 !== 0
                    ? (index + 1) % 3 === 0
                      ? require('../../assets/Images//Practice/exam_yellow.png')
                      : require('../../assets/Images//Practice/exam_blue.png')
                    : require('../../assets/Images//Practice/exam_green.png')
                } // Replace with the correct path to your image
                resizeMode="cover"
              />
              <Text style={examsStyle.buttonText}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default ShowAllExamsModal;
