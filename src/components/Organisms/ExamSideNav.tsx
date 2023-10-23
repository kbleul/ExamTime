import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import ViewQuestionHeader from '../Molecules/ViewQuestionHeader';
import {screenHeight} from '../../utils/Data/data';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ExamSideNav: React.FC<{
  setShowSideNav: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({setShowSideNav}) => {
  return (
    <View style={styles.container}>
      <ViewQuestionHeader
        title="Biology 2010 exam"
        isSideNav
        onPress={() => setShowSideNav(false)}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        {Array.from({length: 20}).map((item, index) => (
          <QuestionCard key={index} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};

const QuestionCard: React.FC<{index: number}> = ({index}) => {
  return (
    <View style={questionCardStyles.container}>
      <TouchableOpacity
        touchSoundDisabled
        style={
          index === 4
            ? [
                questionCardStyles.buttonContainer,
                questionCardStyles.buttonContainerActive,
              ]
            : questionCardStyles.buttonContainer
        }>
        <View style={questionCardStyles.leftBoxCOntainer}>
          <Text
            style={
              index === 4
                ? [questionCardStyles.title, questionCardStyles.titleActive]
                : questionCardStyles.title
            }>
            Question 1
          </Text>
          <Text style={questionCardStyles.questionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
        {index > 3 ? (
          <MaterialIcons
            name="check-box-outline-blank"
            size={22}
            color="#008E97"
          />
        ) : (
          <MaterialIcons name="check-box" size={22} color="#008E97" />
        )}
      </TouchableOpacity>
      {index === 4 && (
        <View style={questionCardStyles.optionsContainer}>
          <TouchableOpacity
            style={[
              questionCardStyles.optionButton,
              questionCardStyles.optionButtonSecondary,
            ]}>
            <Text
              style={[
                questionCardStyles.optionButtonText,
                questionCardStyles.optionButtonTextSecondary,
              ]}>
              Explanation
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={questionCardStyles.optionButton}>
            <Text style={questionCardStyles.optionButtonText}>Direction</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10,
    width: '95%',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 20,
    backgroundColor: '#fff',
    marginTop: 10,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 30,
    paddingRight: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
});

const questionCardStyles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F9FCFF',
    borderWidth: 1,
    borderColor: '#bdd8f2',
  },
  buttonContainerActive: {
    borderColor: '#FCCB06',
  },
  leftBoxCOntainer: {
    width: '90%',
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    paddingHorizontal: 10,
    color: '#008E97',
  },
  titleActive: {
    color: '#FCCB06',
  },
  questionText: {
    color: '#4D4D4D',
    lineHeight: 20,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    paddingHorizontal: 10,
    height: 40,
  },
  optionsContainer: {
    marginTop: 15,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  optionButton: {
    width: '42%',
    borderRadius: 7,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#008E97',
  },
  optionButtonSecondary: {
    backgroundColor: '#008E97',
    borderWidth: 0,
  },
  optionButtonText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: '#008E97',
  },
  optionButtonTextSecondary: {
    color: 'white',
  },
});
export default ExamSideNav;
