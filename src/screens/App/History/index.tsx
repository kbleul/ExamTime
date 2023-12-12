import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../../../Realm/model';
import {Exam, ExamAnswers, Subject, UserData} from '../../../Realm';
import {PushFavorateToFront} from '../../../utils/Functions/Helper';
import {subjectType} from '../../../types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {screenWidth} from '../../../utils/Data/data';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import {answersType} from '../PracticeQuestion';

function convertDateFormat(dateString: string) {
  const date = new Date(dateString);
  const options = {month: 'short', day: 'numeric', year: 'numeric'};

  // Convert the date to the desired format
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate;
}

const History = () => {
  const {useQuery} = AuthContext;

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
      return exams.filtered(
        `isExamTaken = true AND subject.subject = "${
          selectedSubject ? selectedSubject.subject.subject : ''
        }"`,
      );
    },
    [selectedSubject],
  );


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
          keyExtractor={item => item.id}
          data={formatedSubjectSArr}
          renderItem={renderSubjects}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {savedExams.length > 0 &&
          savedExams.map((exam, index) => (
            <HistoryCard
              key={exam.id + '==' + index}
              selectedSubject={selectedSubject}
              exam={exam}
            />
          ))}
      </ScrollView>

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
  const {useQuery} = AuthContext;

  const examAnswers = useQuery(
    ExamAnswers,
    examsanswers => {
      return examsanswers.filtered(`examId = "${exam?.id}"`);
    },
    [selectedSubject],
  );
  return (
    <>
      {examAnswers.map(examAnswer => (
        <View style={cardStyle.container}>
          <Text style={cardStyle.title}>{exam.examName}</Text>
          <CardData exam={exam} examAnswers={examAnswer} />
        </View>
      ))}
    </>
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
