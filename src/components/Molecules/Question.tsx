import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {screenHeight} from '../../utils/Data/data';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Question: React.FC<{showFullPage: boolean}> = ({showFullPage}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showParagraph, setShowParagraph] = useState(false);

  return (
    <>
      {!showParagraph && (
        <View
          style={
            showFullPage
              ? [styles.container, styles.containerFullPage]
              : styles.container
          }>
          <View
            style={
              showFullPage
                ? [styles.questionContainer, styles.questionContainerFullpage]
                : styles.questionContainer
            }>
            <View style={styles.counterContainer}>
              <Text style={styles.counterTitle}>Question 3/65</Text>
              <TouchableOpacity
                touchSoundDisabled
                style={styles.readParagraphBtn}
                onPress={() => setShowParagraph(true)}>
                <Text style={styles.readParagraphText}>Directions</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.questionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>

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
              showFullPage={showFullPage}
            />
            <QuestionChoice
              choice="B"
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              showFullPage={showFullPage}
            />
            <QuestionChoice
              choice="C"
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              showFullPage={showFullPage}
            />
            <QuestionChoice
              choice="D"
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              showFullPage={showFullPage}
            />
          </ScrollView>
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
  showFullPage: boolean;
}> = ({choice, selectedAnswer, setSelectedAnswer, showFullPage}) => {
  const handleSelect = () => {
    selectedAnswer === choice
      ? setSelectedAnswer(null)
      : setSelectedAnswer(choice);
  };
  return (
    <TouchableOpacity
      touchSoundDisabled
      style={
        showFullPage
          ? [
              questionChoiceStyles.container,
              questionChoiceStyles.containerFullPage,
            ]
          : questionChoiceStyles.container
      }
      onPress={handleSelect}>
      <Text
        style={
          choice === selectedAnswer
            ? [
                questionChoiceStyles.choiceLetter,
                questionChoiceStyles.choiceLetterSelected,
              ]
            : questionChoiceStyles.choiceLetter
        }>
        {choice}
      </Text>
      <Text style={questionChoiceStyles.choiceText}>
        Lorem ipsum dolor sit amet lorem.
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
    flex: 1,
  },
  containerFullPage: {
    backgroundColor: '#fff',
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  questionContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  questionContainerFullpage: {
    borderWidth: 0,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  counterTitle: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'PoppinsSemiBold',
  },
  questionText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'PoppinsRegular',
    lineHeight: 24,
  },
  readParagraphBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#F5A52D',
  },
  readParagraphText: {
    fontSize: 12,
    fontFamily: 'PoppinsSemiBold',
    color: '#F5A52D',
    textAlign: 'center',
    paddingHorizontal: 25,
    paddingTop: 6,
    paddingBottom: 4,
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
    paddingTop: 25,
    flex: 1,
    marginHorizontal: 3,
  },
  choiceContainerContent: {
    flexGrow: 1,
    // paddingBottom: 35,
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
    borderColor: '#E3E3E3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  containerFullPage: {
    borderWidth: 0,
  },
  choiceLetter: {
    width: '9%',
    marginHorizontal: '3%',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'PoppinsRegular',
    color: '#757575',
    borderWidth: 1,
    borderColor: '#757575',
    paddingTop: 3,
  },
  choiceLetterSelected: {
    backgroundColor: '#1E90FF',
    fontFamily: 'PoppinsSemiBold',
    color: '#fff',
    borderWidth: 0,
  },
  choiceText: {
    width: '85%',
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
    color: '#000',
    paddingHorizontal: 2,
    lineHeight: 22,
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
