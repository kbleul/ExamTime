import React, {useEffect, useState} from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {answersType} from '.';
import {screenHeight, screenWidth} from '../../../utils/Data/data';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {useNavContext} from '../../../context/bottomNav';

const gradeStatus = {
  Passed: 'Passed',
  Failed: 'Failed',
};
const calculateGrade = (correctAnswers: number, total: number) => {
  const gradePrercentage = Math.round((correctAnswers * 100) / total);
  console.log(correctAnswers, gradePrercentage, total);

  let result: any = {grade: gradePrercentage};

  if (gradePrercentage < 50) {
    result.status = 'Failed';
    result.color = '#bc1f26';
  } else if (gradePrercentage >= 50 && gradePrercentage < 55) {
    result.status = 'Poor';
    result.color = '#ef4723';
  } else if (gradePrercentage >= 55 && gradePrercentage < 60) {
    result.status = 'Fair';
    result.color = '#f68e1f';
  } else if (gradePrercentage >= 60 && gradePrercentage < 75) {
    result.status = 'Good';
    result.color = '#fdc808';
  } else if (gradePrercentage >= 75 && gradePrercentage < 85) {
    result.status = 'Very Good';
    result.color = '#7ebb42';
  } else {
    result.status = 'Excellent';
    result.color = '#0f9246';
  }
  return result;
};

const ExamResult = ({route}: {route: any}) => {
  const {setShowNavigation} = useNavContext();

  const navigationState = useNavigationState(state => state);
  const currentScreen = navigationState.routes[navigationState.index].name;
  const navigator: any = useNavigation();
  const {
    userAnswers,
    total,
    timeTaken,
    examQuestions,
    isPracticeMode,
    isStudy,
  } = route.params;
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const gradePrercentage = calculateGrade(correctAnswers, total);

  const navigateToReview = () => {
    navigator.navigate('Exam-Review', {
      userAnswers,
      examQuestions: examQuestions,
      isStudy: isStudy ? true : false,
    });
  };

  useEffect(() => {
    userAnswers.forEach((answer: answersType) => {
      answer.userAnswer === answer.correctAnswer &&
        setCorrectAnswers(prev => ++prev);
    });
  }, []);

  useEffect(() => {
    const backAction = () => {
      setShowNavigation(true);

      isStudy
        ? navigator.navigate('Study', {screen: 'StudySection'})
        : navigator.navigate('PracticeSection', {screen: 'Practice'});
      return true;
    };

    let backHandler: any;

    if (currentScreen === 'Exam-Result') {
      backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
    } else {
      backHandler && backHandler.remove();
    }

    // Clean up the event listener when the component is unmounted
    return () => {
      if (backHandler) {
        backHandler.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <CircularProgress
        value={correctAnswers}
        radius={screenWidth * 0.25}
        duration={1000}
        progressValueColor={'black'}
        activeStrokeColor={gradePrercentage.color}
        inActiveStrokeColor={'#f3f3f3'}
        maxValue={total}
        title={gradePrercentage.status}
        titleColor={gradePrercentage.color}
        titleStyle={{fontWeight: 'bold'}}
      />

      <View style={styles.midSection}>
        <View style={styles.gradeMainWrapper}>
          <View
            style={[
              styles.midSectionSubContainer,
              styles.midSectionSubContainerSecondary,
            ]}>
            <View style={styles.gradesContainer}>
              <View style={[styles.colorBox, {backgroundColor: '#0f9246'}]} />
              <View style={styles.textContainer}>
                <Text style={styles.gradesTitle}>{'>85%'}</Text>
                <Text style={styles.gradesSubTitle}>Excellent</Text>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.midSectionSubContainer,
              styles.midSectionSubContainerSecondary,
            ]}>
            <View style={styles.gradesContainer}>
              <View style={[styles.colorBox, {backgroundColor: '#7ebb42'}]} />

              <View style={styles.textContainer}>
                <Text style={styles.gradesTitle}>{'85% - 75%'}</Text>
                <Text style={styles.gradesSubTitle}>Very Good</Text>
              </View>
            </View>
          </View>
          <View style={styles.midSectionSubContainer}>
            <View style={styles.gradesContainer}>
              <View style={[styles.colorBox, {backgroundColor: '#fdc808'}]} />

              <View style={styles.textContainer}>
                <Text style={styles.gradesTitle}>{'75% - 60%'}</Text>
                <Text style={styles.gradesSubTitle}>Good</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.gradeMainWrapper}>
          <View
            style={[
              styles.midSectionSubContainer,
              styles.midSectionSubContainerSecondary,
            ]}>
            <View style={styles.gradesContainer}>
              <View style={[styles.colorBox, {backgroundColor: '#f68e1f'}]} />

              <View style={styles.textContainer}>
                <Text style={styles.gradesTitle}>{'60% - 55%'}</Text>
                <Text style={styles.gradesSubTitle}>Fair</Text>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.midSectionSubContainer,
              styles.midSectionSubContainerSecondary,
            ]}>
            <View style={styles.gradesContainer}>
              <View style={[styles.colorBox, {backgroundColor: '#ef4723'}]} />

              <View style={styles.textContainer}>
                <Text style={styles.gradesTitle}>{'55% - 50%'}</Text>
                <Text style={styles.gradesSubTitle}>Poor</Text>
              </View>
            </View>
          </View>
          <View style={styles.midSectionSubContainer}>
            <View style={styles.gradesContainer}>
              <View style={[styles.colorBox, {backgroundColor: '#bc1f26'}]} />

              <View style={styles.textContainer}>
                <Text style={styles.gradesTitle}>{'<50%'}</Text>
                <Text style={styles.gradesSubTitle}>Very Poor</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.lastSection}>
        <View style={styles.lastSectionContainer}>
          <View style={styles.lastSectionBox}>
            <Text style={[styles.midSectionTitle, styles.lastSectionText]}>
              {correctAnswers}
            </Text>
            <Text style={[styles.midSectionSubTitle, styles.lastSectionText]}>
              Correct Answer
            </Text>
          </View>
          <View style={styles.lastSectionBox}>
            <Text style={[styles.midSectionTitle, styles.lastSectionText]}>
              {userAnswers.length - correctAnswers}
            </Text>
            <Text style={[styles.midSectionSubTitle, styles.lastSectionText]}>
              Incorrect Answer
            </Text>
          </View>
        </View>
        <View style={styles.lastSectionContainer}>
          <View style={styles.lastSectionBox}>
            <Text style={[styles.midSectionTitle, styles.lastSectionText]}>
              {!isPracticeMode && timeTaken ? timeTaken : '-'}
            </Text>
            <Text style={[styles.midSectionSubTitle, styles.lastSectionText]}>
              Time Left
            </Text>
          </View>
          <View style={styles.lastSectionBox}>
            <Text style={[styles.midSectionTitle, styles.lastSectionText]}>
              {total - userAnswers.length}
            </Text>
            <Text style={[styles.midSectionSubTitle, styles.lastSectionText]}>
              Skipped
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          touchSoundDisabled
          style={styles.reviewButton}
          onPress={navigateToReview}>
          <Text style={styles.reviewButtonText}>Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFDFF',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: screenHeight * (1 / 10),
  },
  topSection: {
    borderWidth: 10,
    width: screenWidth * (3.3 / 6),
    height: screenWidth * (3.3 / 6),
    borderColor: '#1DB88F',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 200,
    overflow: 'hidden',
  },
  topSectionFaild: {
    borderColor: 'red',
  },
  topSectionHiddenSection: {
    width: '110%',
    height: '110%',
    backgroundColor: 'yellow',
    position: 'absolute',
    borderRadius: 200,
    overflow: 'hidden',
    zIndex: 10,
  },
  topTitleSection: {
    fontSize: 43,
    fontFamily: 'PoppinsSemiBold',
    color: '#000',
    lineHeight: 90,
    paddingTop: 15,
    position: 'relative',
  },
  topSubtitleSection: {
    fontSize: 20,
    fontFamily: 'PoppinsRegular',
    color: '#3CAB8C',
    paddingTop: 25,
    position: 'absolute',
    top: 105,
  },
  topSubtitleSectionFailed: {
    color: 'red',
  },
  midSection: {
    width: '92%',
    marginTop: screenHeight * 0.02,
    paddingVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.4,
    borderColor: '#D9D9D9',
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  gradeMainWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  gradesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingHorizontal: screenWidth * 0.01,
    paddingTop: screenWidth * 0.04,
  },
  colorBox: {
    width: screenWidth * 0.035,
    height: screenWidth * 0.035,
    borderRadius: 7,
  },
  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  gradesTitle: {
    textAlign: 'center',
    color: '#000',
    fontFamily: 'PoppinsBold',
    fontSize: screenWidth * 0.032,
    lineHeight: screenWidth * 0.04,
  },
  gradesSubTitle: {
    textAlign: 'center',
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.028,
    lineHeight: screenWidth * 0.03,
    paddingTop: 2,
    color: '#000',
    elevation: 40,
  },
  midSectionSubContainer: {
    width: '30%',
    marginVertical: 4,
  },
  midSectionSubContainerSecondary: {
    borderRightWidth: 3,
    borderColor: '#D9D9D9',
  },
  midSectionTitle: {
    textAlign: 'center',
    color: '#000',
    fontFamily: 'PoppinsBold',
    fontSize: screenWidth * 0.055,
    lineHeight: screenWidth * 0.055,
    paddingTop: 10,
  },
  midSectionSubTitle: {
    textAlign: 'center',
    fontFamily: 'PoppinsSemiBold',
    fontSize: 10,
    lineHeight: 10,
    paddingTop: 2,
    color: '#000',
    elevation: 40,
  },
  lastSection: {
    flexDirection: 'row',
    width: '72%',
    marginTop: screenHeight * 0.04,

    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#3FA0FF',
    paddingVertical: 10,
  },
  lastSectionContainer: {
    width: '50%',
  },
  lastSectionBox: {
    paddingVertical: 10,
  },
  lastSectionText: {
    color: 'white',
    fontFamily: 'PoppinsRegular',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 30,
    alignItems: 'flex-end',
  },
  reviewButton: {
    paddingHorizontal: 40,
    paddingVertical: 8,
    backgroundColor: '#3FA0FF',
    borderRadius: 6,
    overflow: 'hidden',
  },
  reviewButtonText: {
    color: 'white',
  },
});

export default ExamResult;
