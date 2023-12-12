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

const gradeStatus = {
  Passed: 'Passed',
  Failed: 'Failed',
};
const calculateGrade = (correctAnswers: number, total: number) => {
  const gradePrercentage = Math.round((correctAnswers * 100) / total);

  let status = gradePrercentage >= 50 ? gradeStatus.Passed : gradeStatus.Failed;

  return {
    grade: gradePrercentage,
    status,
  };
};

const ExamResult = ({route}: {route: any}) => {
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
      isStudy: true,
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
      isStudy
        ? navigator.navigate('StudySection')
        : navigator.navigate('Practice');
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
        activeStrokeColor={
          gradePrercentage.status === gradeStatus.Passed ? '#3CAB8C' : 'red'
        }
        inActiveStrokeColor={'#d9d9d9'}
        maxValue={total}
        title={gradePrercentage.status}
        titleColor={
          gradePrercentage.status === gradeStatus.Passed ? '#3CAB8C' : 'red'
        }
        titleStyle={{fontWeight: 'bold'}}
      />

      <View style={styles.midSection}>
        <View
          style={[
            styles.midSectionSubContainer,
            styles.midSectionSubContainerSecondary,
          ]}>
          <Text style={styles.midSectionTitle}>85%</Text>
          <Text style={styles.midSectionSubTitle}>PROBABILITY OF</Text>
          <Text style={styles.midSectionSubTitle}>PASSING</Text>
        </View>
        <View style={styles.midSectionSubContainer}>
          <Text style={styles.midSectionTitle}>25%</Text>
          <Text style={styles.midSectionSubTitle}>PROGRESS</Text>
          <Text style={styles.midSectionSubTitle}>COMPATISON</Text>
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
    width: '72%',
    flexDirection: 'row',
    marginTop: 30,
    paddingVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.4,
    borderColor: '#D9D9D9',
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  midSectionSubContainer: {
    width: '50%',
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
    fontSize: 22,
    lineHeight: 22,
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
    marginTop: 30,
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
