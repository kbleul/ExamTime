import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const ExamNavigateButtons: React.FC<{
  setExitExamModalVisible?: (value: boolean) => void;
  showFullPage: boolean;
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  totalQuestionsLength: number;
  isReview?: boolean;
  isStudy?: boolean;
}> = ({
  setExitExamModalVisible,
  showFullPage,
  currentQuestion,
  setCurrentQuestion,
  totalQuestionsLength,
  isReview,
  isStudy,
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
        isReview={isReview}
        setCurrentQuestion={setCurrentQuestion}
        isStudy={isStudy}
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
  isReview?: boolean;
  isStudy?: boolean;
}> = ({
  text,
  bgColor,
  setExitExamModalVisible,
  isEndBtn,
  isReview,
  isStudy,
}) => {
  const navigator: any = useNavigation();
  const handleAction = () => {
    if (isReview) {
      isStudy
        ? navigator.navigate('StudySection')
        : navigator.navigate('Practice');
    } else {
    }
    setExitExamModalVisible(true);
  };
  return (
    <TouchableOpacity
      touchSoundDisabled
      style={[ButtonStyles.button, {backgroundColor: bgColor}]}
      onPress={() => {
        isEndBtn ? handleAction() : setExitExamModalVisible(null);
      }}>
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
    overflow: 'hidden',
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
