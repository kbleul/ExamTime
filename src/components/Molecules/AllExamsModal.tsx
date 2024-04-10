import React from 'react';
import {
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {examType} from '../../types';

const AllExamsModal = ({
  exams,
  showModalsModal,
  setShowModalsModal,
  setPracticeModeModalVisible,
  setSelectedExam,
}: {
  exams: examType[];
  showModalsModal: boolean;
  setShowModalsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPracticeModeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedExam: React.Dispatch<React.SetStateAction<examType | null>>;
}) => {
  const renderItem = (item: examType, index: number) => {
    return (
      <TouchableOpacity
        key={item.id + 'modal-exams-' + index}
        touchSoundDisabled
        style={styles.imgContainer}
        onPress={() => {
          //  navigator.navigate('item-View', {item});
          setPracticeModeModalVisible(true);
          setSelectedExam(item);
        }}>
        <ImageBackground
          style={styles.imageBG}
          source={
            (index + 1) % 2 !== 0
              ? (index + 1) % 3 === 0
                ? require('../../assets/Images//Practice/exam_yellow.png')
                : require('../../assets/Images//Practice/exam_blue.png')
              : require('../../assets/Images//Practice/exam_green.png')
          } // Replace with the correct path to your image
          resizeMode="cover"
        />
        <Text style={styles.buttonText}>
          {item?.year?.year ? item?.year?.year : item.year}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModalsModal}
      onRequestClose={() => {
        setShowModalsModal(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            touchSoundDisabled
            style={styles.icon}
            onPress={() => setShowModalsModal(false)}>
            <AntDesign name="close" size={25} color="#000" />
          </TouchableOpacity>

          <View style={styles.examsContainer}>
            {exams.map((exam, index) => renderItem(exam, index))}
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
    position: 'relative',
  },
  examsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  icon: {
    position: 'absolute',
    right: 18,
    top: 18,
    padding: 5,
    zIndex: 10,
  },
  imgContainer: {
    width: '18%',
    height: screenHeight * 0.1,
    marginTop: screenWidth * 0.02,
    maxHeight: 100,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginRight: '3%',
    marginBottom: 10,
  },
  imageBG: {
    width: '100%',
    height: '100%',
  },
  buttonText: {
    position: 'absolute',
    bottom: -2,
    fontFamily: 'PoppinsBold',
    fontSize: screenWidth * 0.028,
    color: 'white',
  },
});

export default AllExamsModal;
