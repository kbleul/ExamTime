import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const ExamNavigateButtons: React.FC<{
  setExitExamModalVisible?: (value: boolean) => void;
  showFullPage: boolean;
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  totalQuestionsLength: number;
}> = ({
  setExitExamModalVisible,
  showFullPage,
  currentQuestion,
  setCurrentQuestion,
  totalQuestionsLength,
}) => {
  return (
    <View style={ButtonStyles.contaienr}>
      {!showFullPage && currentQuestion !== 0 && (
        <Buttons
          text="Prev."
          bgColor="#0081BA"
          setExitExamModalVisible={() => setCurrentQuestion(prev => --prev)}
          isEndBtn={false}
        />
      )}
      <Buttons
        text="End"
        bgColor="#4CB050"
        setExitExamModalVisible={setExitExamModalVisible}
        isEndBtn={true}
      />
      {!showFullPage && currentQuestion !== totalQuestionsLength - 1 && (
        <Buttons
          text="Next."
          bgColor="#0081BA"
          setExitExamModalVisible={() => setCurrentQuestion(prev => ++prev)}
          isEndBtn={false}
        />
      )}
    </View>
  );
};

const Buttons: React.FC<{
  text: string;
  bgColor: string;
  setExitExamModalVisible: (value: boolean | null) => void;
  isEndBtn: boolean;
}> = ({text, bgColor, setExitExamModalVisible, isEndBtn}) => {
  return (
    <TouchableOpacity
      touchSoundDisabled
      style={[ButtonStyles.button, {backgroundColor: bgColor}]}
      onPress={() =>
        isEndBtn ? setExitExamModalVisible(true) : setExitExamModalVisible(null)
      }>
      <Text style={ButtonStyles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const ButtonStyles = StyleSheet.create({
  contaienr: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 20,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'PoppinsSemiBold',
    color: 'white',
    fontSize: 12,
  },
});
export default ExamNavigateButtons;
