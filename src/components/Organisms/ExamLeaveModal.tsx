import React from 'react';
import {ImageBackground, TouchableOpacity, Image} from 'react-native';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';

const ExamLeaveModal: React.FC<{
  exitExamModalVisible: boolean;
  setExitExamModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  examStatusData: {
    total: number;
    answered: number;
  };
  resetViewQuesstions: () => void;
  handleSubmitExam: () => void;
  timeLeft?: string | boolean;
  isTimeOver?: boolean;
  showViewReviewBtn?: boolean;
}> = ({
  exitExamModalVisible,
  setExitExamModalVisible,
  examStatusData,
  resetViewQuesstions,
  handleSubmitExam,
  timeLeft,
  isTimeOver,
  showViewReviewBtn,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={exitExamModalVisible}
      onRequestClose={() => {
        setExitExamModalVisible(prev => !prev);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* <View style={styles.modalImageContaner}>
            <ImageBackground
              style={styles.modalImg}
              source={require('../../assets/Images/Practice/modal1.png')} // Replace with the correct path to your image
              resizeMode="cover"
            />
          </View> */}

          {/* {examStatusData.total - examStatusData.answered > 0 && (
            <Text style={styles.modalText}>
              You haven’t completed the exam!
            </Text>
          )} */}

          <ImageBackground
            style={styles.modalImageContaner}
            source={require('../../assets/Images/Practice/running_bg.png')} // Replace with the correct path to your image
            resizeMode="cover">
            <Image
              source={require('../../assets/Images/Practice/bell_bg.png')}
              style={styles.modalImg}
            />
          </ImageBackground>

          <Text style={styles.infoTextYellow}>
            {examStatusData.total - examStatusData.answered}{' '}
            <Text style={styles.infoTextYellowSubtext}>Questions left</Text>
          </Text>

          {!isTimeOver && (
            <Text style={styles.modalText}>
              You haven’t completed the exam! are you sure you want to finish?
            </Text>
          )}

          {timeLeft && (
            <View style={styles.infoText}>
              <Text style={styles.infoTextPurple}>{timeLeft} </Text>
              <Text style={styles.infoTextPurpleSecondary}>remaining </Text>
            </View>
          )}

          {/* <Text style={styles.modalText}>
            Are you sure you want to finish ?
          </Text>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              <Text style={styles.infoTextGreen}>{examStatusData.total} </Text>
              Questions
            </Text>
            <Text style={[styles.infoText, styles.infoTextSecondary]}>
              <Text style={styles.infoTextYellow}>
                {examStatusData.total - examStatusData.answered}{' '}
              </Text>
              Remaining
            </Text>
            {timeLeft && (
              <Text style={[styles.infoText, styles.infoTextThird]}>
                <Text style={styles.infoTextPurple}>{timeLeft} </Text>Time Left
              </Text>
            )}
          </View> */}

          {showViewReviewBtn && showViewReviewBtn === true && (
            <TouchableOpacity
              style={[styles.optionButton, styles.optionButtonAll]}>
              <Text
                style={[
                  styles.optionButtonText,
                  styles.optionButtonTextSecondary,
                ]}
                onPress={() => {
                  resetViewQuesstions();
                  setExitExamModalVisible(false);
                }}>
                View / Review All Questions
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.optionsContainer}>
            {!isTimeOver && (
              <TouchableOpacity
                style={[styles.optionButton, styles.optionButtonSecondary]}>
                <Text
                  style={[
                    styles.optionButtonText,
                    styles.optionButtonTextSecondary,
                  ]}
                  onPress={() => {
                    setExitExamModalVisible(false);
                    // filterUnansweredQuestions();
                  }}>
                  Cancle
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.optionButton, styles.optionButtonSecondary]}
              onPress={() => {
                setExitExamModalVisible(false);
                handleSubmitExam();
              }}>
              <Text
                style={[
                  styles.optionButtonText,
                  styles.optionButtonTextSecondary,
                ]}>
                Finish Now
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
    height: (screenHeight * 4.3) / 5,
    maxHeight: 620,
  },
  modalView: {
    height: (screenHeight * 4.8) / 5,
    maxHeight: 620,
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
  },
  modalImageContaner: {
    width: '100%',
    height: 280,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImg: {
    width: '45%',
    height: '55%',
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
    marginBottom: 10,
    marginHorizontal: 8,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: screenWidth * 0.04,
    width: '80%',
    color: '#505050',
  },
  infoContainer: {
    marginVertical: 10,
  },
  infoText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: screenWidth * 0.05,
    width: '100%',
    color: '#4d4d4d',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  infoTextSecondary: {
    color: '#F5A52D',
    fontSize: screenWidth * 0.035,
  },
  infoTextGreen: {
    fontFamily: 'Montserrat-Bold',
    color: '#008E97',
  },
  infoTextYellow: {
    fontFamily: 'Montserrat-Bold',
    color: '#FF7B52',
    marginVertical: 20,
    fontSize: screenWidth * 0.07,
  },
  infoTextYellowSubtext: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
    fontSize: screenWidth * 0.05,
  },
  infoTextPurple: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#FF7B52',
    fontSize: screenWidth * 0.08,
  },
  infoTextPurpleSecondary: {
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    fontSize: screenWidth * 0.04,
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
    width: '35%',
    borderRadius: 7,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#F5A52D',
  },
  optionButtonSecondary: {
    backgroundColor: '#1E90FF',
    borderWidth: 0,
  },
  optionButtonAll: {
    backgroundColor: '#008E97',
    borderWidth: 0,
    width: '80%',
  },
  optionButtonText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#F5A52D',
  },
  optionButtonTextSecondary: {
    color: 'white',
  },
});

export default ExamLeaveModal;
