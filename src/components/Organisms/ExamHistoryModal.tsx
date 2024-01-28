import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Text,
} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {PushFavorateToFront} from '../../utils/Functions/Helper';
import {Exam, ExamAnswers, Subject, UserData} from '../../Realm';
import {subjectType} from '../../types';
import {AuthContext} from '../../Realm/model';
import MessageBox from '../Atoms/MessageBox';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useNavContext} from '../../context/bottomNav';
import {answersType} from '../../screens/App/PracticeQuestion';

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

const ExamHistoryModal: React.FC<{
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({openModal, setOpenModal}) => {
  const {useQuery} = AuthContext;

  const savedSubjects = useQuery(Subject);
  const savedUserData = useQuery(UserData);

  const [selectedSubject, setSelectedSubject] = useState<subjectType | null>(
    null,
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

  const formatedSubjectSArr: subjectType[] = PushFavorateToFront(
    savedUserData && savedUserData.length > 0
      ? savedUserData[0].selectedSubjects
      : null,
    savedSubjects,
  );

  useEffect(() => {
    if (openModal && !selectedSubject) {
      setSelectedSubject(
        formatedSubjectSArr.length > 0 ? formatedSubjectSArr[0] : null,
      );
    }
  }, [savedExams, openModal]);

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
    <Modal
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={() => {
        setOpenModal(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.indicator}
            onPress={() => setOpenModal(false)}
          />
          <View style={styles.closeBtnContainer}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setOpenModal(false)}>
              <AntDesign name="close" size={screenWidth * 0.05} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.buttonsContainerHeader}>Pre-activity</Text>

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
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContentContainer}
              showsVerticalScrollIndicator={false}>
              {savedExams.map((exam, index) => (
                <HistoryCard
                  key={exam.id + '==' + index}
                  selectedSubject={selectedSubject}
                  exam={exam}
                  setOpenModal={setOpenModal}
                />
              ))}
            </ScrollView>
          ) : (
            <MessageBox
              title="No history found for this subject!"
              subTitle="Try taking some more exams."
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const HistoryCard = ({
  selectedSubject,
  exam,
  setOpenModal,
}: {
  selectedSubject: subjectType | null;
  exam: Exam;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
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
      {examAnswers &&
        examAnswers.length > 0 &&
        examAnswers.map((examAnswer, index) => (
          <View key={examAnswer.examId + 'history' + index}>
            <CardData
              exam={exam}
              examAnswers={examAnswer}
              setOpenModal={setOpenModal}
            />
          </View>
        ))}
    </View>
  );
};

const CardData = ({
  exam,
  examAnswers,
  setOpenModal,
}: {
  exam: Exam;
  examAnswers: ExamAnswers;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigator: any = useNavigation();
  const {setShowNavigation} = useNavContext();

  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    examAnswers.userExamAnswers.forEach((answer: answersType) => {
      answer.userAnswer === answer.correctAnswer &&
        setCorrectAnswers(prev => ++prev);
    });
  }, []);

  return (
    <View style={cardStyle.subContainer}>
      <Text style={cardStyle.cardText}>{exam.year}</Text>

      <View style={cardStyle.contentContainer}>
        <FontAwesome
          name="check-circle"
          size={screenWidth * 0.05}
          style={cardStyle.icon}
        />
        <Text style={cardStyle.cardText}>{correctAnswers}</Text>
      </View>

      <View style={cardStyle.contentContainer}>
        <MaterialCommunityIcons
          name="close-circle"
          size={screenWidth * 0.052}
          style={[cardStyle.icon, cardStyle.iconSecondary]}
        />
        <Text style={cardStyle.cardText}>
          {examAnswers.userExamAnswers.length - correctAnswers}
        </Text>
      </View>

      <View style={cardStyle.contentContainer}>
        <MaterialCommunityIcons
          name="share-outline"
          color="#000"
          size={screenWidth * 0.055}
        />

        <Text style={cardStyle.cardText}>
          {exam.examQuestion &&
            examAnswers &&
            exam.examQuestion.length - examAnswers.userExamAnswers.length}
        </Text>
      </View>

      <Text style={[cardStyle.cardText, cardStyle.cardTextSecondary]}>
        {convertDateFormat(examAnswers.examDate)}
      </Text>

      <TouchableOpacity
        touchSoundDisabled
        onPress={() => {
          setOpenModal(false);
          setShowNavigation(false);

          navigator.navigate('PracticeSection', {
            screen: 'Exam-Review',
            params: {
              userAnswers: examAnswers.userExamAnswers,
              examQuestions: exam.examQuestion,
              isStudy: false,
            },
          });
        }}>
        <Entypo
          name="dots-three-horizontal"
          color={'#6A6A6A'}
          size={screenWidth * 0.055}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
    position: 'relative',
  },
  modalView: {
    minHeight: (screenHeight * 1.2) / 2,
    height: (screenHeight * 1.8) / 2,
    marginTop: (screenHeight * 0.8) / 2,
    paddingTop: 10,
    paddingHorizontal: screenWidth * 0.06,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    position: 'relative',
  },
  closeBtnContainer: {
    width: '100%',
    position: 'absolute',
    top: 15,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.06,
  },
  indicator: {
    width: screenWidth / 3,
    height: 2,
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: '#364158',
    paddingHorizontal: screenWidth * 0.09,
    paddingVertical: screenHeight * 0.005,
  },
  scrollContainer: {
    width: '100%',
  },
  scrollContentContainer: {
    paddingBottom: 150,
  },
  closeBtn: {
    alignSelf: 'flex-end',
  },
  buttonsContainerHeader: {
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.05,
    color: '#364158',
    marginTop: screenWidth * 0.09,
    marginBottom: screenWidth * 0.02,
    textAlign: 'left',
    width: '100%',
  },
  buttonsContainer: {
    paddingVertical: 2,
    height: 45,
    position: 'relative',
  },
});

const renderSubjectsStyle = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 16,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: '#364158',
  },
  buttonActive: {
    backgroundColor: '#364158',
  },
  buttonText: {
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.04,
    lineHeight: screenWidth * 0.045,
    textAlign: 'center',
    color: '#364158',
    overflow: 'hidden',
    marginTop: screenWidth * 0.03,
  },
  buttonTextActive: {
    color: '#fff',
  },
});

const cardStyle = StyleSheet.create({
  container: {
    marginTop: screenWidth * 0.015,
    marginBottom: 15,
    paddingVertical: 15,
    overflow: 'hidden',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    marginTop: screenWidth * 0.015,
    paddingVertical: screenHeight * 0.02,
    borderColor: '#D9D9D9',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 7,
  },
  cardText: {
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.04,
    paddingBottom: 5,
    color: '#3c3d6e',
  },
  cardTextSecondary: {
    fontSize: screenWidth * 0.038,
  },
  icon: {
    paddingTop: screenWidth * 0.0012,
    color: '#59AD00',
  },
  iconSecondary: {
    paddingTop: screenWidth * 0.0012,
    color: '#FE0000',
  },
});

export default ExamHistoryModal;
