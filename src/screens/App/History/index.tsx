import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../../../Realm/model';
import {Exam, ExamAnswers, Subject, UserData} from '../../../Realm';
import {PushFavorateToFront} from '../../../utils/Functions/Helper';
import {subjectType} from '../../../types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {screenWidth} from '../../../utils/Data/data';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import {answersType} from '../PracticeQuestion';
import {useIsFocused} from '@react-navigation/native';
import MessageBox from '../../../components/Atoms/MessageBox';

function convertDateFormat(dateString: string) {
  const date = new Date(dateString);

  const month = date.toLocaleString('en-US', {month: 'short'});
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;

  const formattedDate = `${month} ${day} ${formattedHours}:${minutes
    .toString()
    .padStart(2, '0')} ${amOrPm}`;
  return formattedDate;
}

const History = () => {
  const {useQuery} = AuthContext;
  const isFocused = useIsFocused();

  const savedSubjects = useQuery(Subject);
  const savedUserData = useQuery(UserData);

  const formatedSubjectSArr: subjectType[] = PushFavorateToFront(
    savedUserData && savedUserData.length > 0
      ? savedUserData[0].selectedSubjects
      : null,
    savedSubjects,
  );

  const [selectedSubject, setSelectedSubject] = useState(
    formatedSubjectSArr.length > 0 ? formatedSubjectSArr[0] : null,
  );

  const savedExams = useQuery(
    Exam,
    exams => {
      return exams
        .filtered(
          `isExamTaken = true AND subject.subject = "${
            selectedSubject ? selectedSubject.subject.subject : 'unknown'
          }"`,
        )
        .sorted('lastTaken', true);
    },
    [selectedSubject],
  );
  const [savedExamsArr, setSavedExamsArr] = useState([...savedExams]);

  useEffect(() => {
    if (isFocused) {
      setSavedExamsArr([...savedExams]);
    } else {
      setSelectedSubject(null);
      setSavedExamsArr([]);
    }
  }, [savedExams, isFocused]);

  const renderSubjects = ({item}: {item: subjectType}) => {
    return (
      <TouchableOpacity
        style={
          selectedSubject && selectedSubject.id === item.id
            ? [renderSubjectsStyle.button, renderSubjectsStyle.buttonActive]
            : renderSubjectsStyle.button
        }
        onPress={() => setSelectedSubject(item)}>
        <Text
          style={
            selectedSubject && selectedSubject.id === item.id
              ? [
                  renderSubjectsStyle.buttonText,
                  renderSubjectsStyle.buttonTextActive,
                ]
              : renderSubjectsStyle.buttonText
          }>
          {item.subject.subject}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>History</Text>

      <View style={styles.buttonsContainer}>
        <FlatList
          keyExtractor={(item, index) => item.id + 'histry_study' + index}
          data={formatedSubjectSArr}
          renderItem={renderSubjects}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {savedExams && savedExams.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {savedExams.map((exam, index) => (
            <HistoryCard
              key={exam.id + '==' + index}
              selectedSubject={selectedSubject}
              exam={exam}
            />
          ))}
        </ScrollView>
      ) : (
        <MessageBox
          title="No history found for this subject!"
          subTitle="Try taking some more exams."
        />
      )}

      <MainBottomNav />
    </View>
  );
};

const HistoryCard = ({
  selectedSubject,
  exam,
}: {
  selectedSubject: subjectType | null;
  exam: Exam;
}) => {
  const isFocused = useIsFocused();
  const {useQuery} = AuthContext;

  const examAnswers = useQuery(
    ExamAnswers,
    examsanswers => {
      return examsanswers
        .filtered(`examId = "${exam?.id}"`)
        .sorted('timeStamp', true);
    },
    [selectedSubject, isFocused],
  );

  return (
    <View style={cardStyle.container}>
      <Text style={cardStyle.title}>{exam.examName}</Text>

      {examAnswers &&
        examAnswers.length > 0 &&
        examAnswers.map((examAnswer, index) => (
          <View
            style={
              examAnswers.length > 1 && index !== examAnswers.length - 1
                ? [cardStyle.testContainer, cardStyle.testContainerBorder]
                : cardStyle.testContainer
            }
            key={examAnswer.examId + 'history' + index}>
            <CardData exam={exam} examAnswers={examAnswer} />
          </View>
        ))}
    </View>
  );
};

const CardData = ({
  exam,
  examAnswers,
}: {
  exam: Exam;
  examAnswers: ExamAnswers;
}) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    examAnswers.userExamAnswers.forEach((answer: answersType) => {
      answer.userAnswer === answer.correctAnswer &&
        setCorrectAnswers(prev => ++prev);
    });
  }, []);

  return (
    <View>
      <View style={cardStyle.flexed}>
        <View style={cardStyle.flexedBox}>
          <Text style={cardStyle.flexedBoxTitle}>CORRECT ANSWER</Text>
          <Text style={cardStyle.flexedBoxValues}>
            {correctAnswers} Questions
          </Text>
        </View>
        <View style={cardStyle.flexedBox}>
          <Text style={cardStyle.flexedBoxTitle}>Taken ON</Text>
          <Text style={cardStyle.flexedBoxValues}>
            {convertDateFormat(examAnswers.examDate)}
          </Text>
        </View>
      </View>
      <View style={cardStyle.flexed}>
        <View style={cardStyle.flexedBox}>
          <Text style={cardStyle.flexedBoxTitle}>SKIPPED</Text>
          <Text style={cardStyle.flexedBoxValues}>
            {exam.examQuestion &&
              examAnswers &&
              exam.examQuestion.length - examAnswers.userExamAnswers.length}
          </Text>
        </View>
        <View style={cardStyle.flexedBox}>
          <Text style={cardStyle.flexedBoxTitle}>INCORRECT ANSWER</Text>
          <Text style={cardStyle.flexedBoxValues}>
            {examAnswers.userExamAnswers.length - correctAnswers}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    backgroundColor: '#F9FCFF',
    paddingTop: 40,
    paddingBottom: 70,
    paddingHorizontal: 20,
    // backgroundColor: 'red',
  },
  header: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.062,
    color: 'black',
    zIndex: 10,
  },
  buttonsContainer: {
    marginBottom: 10,
    paddingVertical: 10,
    height: 65,
  },
});

const renderSubjectsStyle = StyleSheet.create({
  button: {
    paddingHorizontal: 28,
    paddingVertical: 7,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 16,
    elevation: 5,
    overflow: 'hidden',
  },
  buttonActive: {
    backgroundColor: '#1E90FF',
  },
  buttonText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 14,
    textAlign: 'center',
    color: '#A2A2A2',
  },
  buttonTextActive: {
    color: '#fff',
  },
});

const cardStyle = StyleSheet.create({
  container: {
    borderRadius: 25,
    backgroundColor: '#eef0f2',
    marginBottom: 15,
    padding: 15,
    elevation: 3,
    overflow: 'hidden',
  },
  title: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.045,
    paddingBottom: 5,
    color: '#3c3d6e',
  },
  testContainer: {
    borderBottomColor: '#c5c5c5',
    marginVertical: 10,
    paddingVertical: 6,
  },
  testContainerBorder: {
    borderBottomWidth: 1,
  },
  flexed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexedBox: {
    width: '50%',
    paddingHorizontal: 5,
  },
  flexedBoxTitle: {
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.035,
    color: '#3c3d6e',
    textTransform: 'uppercase',
  },
  flexedBoxValues: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.042,
    paddingBottom: 5,
    color: '#3c3d6e',
  },
});

export default History;
