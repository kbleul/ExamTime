import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {screenHeight} from '../../utils/Data/data';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Question = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showParagraph, setShowParagraph] = useState(false);

  return (
    <>
      {!showParagraph && (
        <View style={styles.container}>
          <View style={styles.questionContainer}>
            <View style={styles.counterContainer}>
              <Text style={styles.counterTitle}>Question 3</Text>
              <Text style={styles.counterText}>1/100</Text>
            </View>
            <Text style={styles.questionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>

          <TouchableOpacity
            touchSoundDisabled
            style={styles.readParagraphBtn}
            onPress={() => setShowParagraph(true)}>
            <Text style={styles.readParagraphText}>Read Paragraph</Text>
          </TouchableOpacity>

          <ScrollView
            style={styles.choiceContainer}
            contentContainerStyle={styles.choiceContainerContent}
            showsVerticalScrollIndicator={false}>
            {/* <View style={styles.questionImageContainer}>
              <Image
                style={styles.questionImage}
                source={require('../../assets/Images/home/s2.png')}
                resizeMode="cover"
              />
            </View> */}

            <QuestionChoice
              choice="A"
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
            />
            <QuestionChoice
              choice="B"
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
            />
            <QuestionChoice
              choice="C"
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
            />
            <QuestionChoice
              choice="D"
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
            />
          </ScrollView>

          {selectedAnswer !== null && (
            <TouchableOpacity style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>Next Question</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {showParagraph && (
        <View style={styles.container}>
          <View style={paragraphStyle.container}>
            <Text style={paragraphStyle.title}>Title</Text>
            <TouchableOpacity
              touchSoundDisabled
              onPress={() => setShowParagraph(false)}>
              <AntDesign name="close" size={28} color="gray" />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={[styles.choiceContainer, paragraphStyle.paragraphContainer]}
            contentContainerStyle={styles.choiceContainerContent}
            showsVerticalScrollIndicator={false}>
            <Text style={paragraphStyle.paraText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Text style={paragraphStyle.paraText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Text style={paragraphStyle.paraText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Text style={paragraphStyle.paraText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Text style={paragraphStyle.paraText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Text style={paragraphStyle.paraText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const QuestionChoice: React.FC<{
  choice: string;
  selectedAnswer: string | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({choice, selectedAnswer, setSelectedAnswer}) => {
  const handleSelect = () => {
    selectedAnswer === choice
      ? setSelectedAnswer(null)
      : setSelectedAnswer(choice);
  };
  return (
    <TouchableOpacity
      touchSoundDisabled
      style={
        choice === selectedAnswer
          ? [
              questionChoiceStyles.container,
              questionChoiceStyles.containerActive,
            ]
          : questionChoiceStyles.container
      }
      onPress={handleSelect}>
      <Text
        style={
          choice === selectedAnswer
            ? [
                questionChoiceStyles.choiceLetter,
                questionChoiceStyles.activeText,
              ]
            : questionChoiceStyles.choiceLetter
        }>
        {choice}
      </Text>
      <Text
        style={
          choice === selectedAnswer
            ? [questionChoiceStyles.choiceText, questionChoiceStyles.activeText]
            : questionChoiceStyles.choiceText
        }>
        Lorem ipsum dolor sit amet lorem.
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 40,
    flex: 1,
  },
  questionContainer: {
    backgroundColor: '#F9F9F9',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  counterTitle: {
    fontSize: 24,
    color: '#008e97',
    fontFamily: 'Montserrat-SemiBold',
  },
  counterText: {
    fontSize: 18,
    color: '#008e97',
    fontFamily: 'Montserrat-SemiBold',
  },
  questionText: {
    fontSize: 18,
    color: '#4d4d4d',
    fontFamily: 'Montserrat-Regular',
    lineHeight: 25,
  },
  readParagraphBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  readParagraphText: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#1e90ff',
    borderBottomWidth: 1,
    borderColor: '#1e90ff',
  },
  questionImageContainer: {
    width: '80%',
    height: screenHeight * (3 / 10),
    alignSelf: 'center',
    marginBottom: 40,
  },
  questionImage: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  choiceContainer: {
    paddingTop: 40,
    flex: 1,
  },
  choiceContainerContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  submitBtn: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    position: 'absolute',
    bottom: 80,
    right: 15,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
});

const questionChoiceStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#a0c2eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingVertical: 10,
    paddingRight: 2,
  },
  containerActive: {
    borderColor: '#008E97',
    backgroundColor: '#008E97',
  },
  choiceLetter: {
    width: '15%',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: '#008E97',
  },
  choiceText: {
    width: '85%',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#4d4d4d',
    paddingHorizontal: 2,
    lineHeight: 25,
    paddingTop: 2,
  },
  activeText: {
    color: '#fff',
  },
});

const paragraphStyle = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 15,
  },
  paragraphContainer: {
    paddingTop: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
  },
  paraText: {
    marginBottom: 10,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#4d4d4d',
    lineHeight: 23,
  },
});

export default Question;
