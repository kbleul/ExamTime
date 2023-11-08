import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import {useGetExamsMutation} from '../../reduxToolkit/Services/exams';

import {useNavigation} from '@react-navigation/native';
import {getPreviousExams} from '../../screens/App/Practice/logic';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';
import {SerializedError} from '@reduxjs/toolkit';
import ShowAllExamsModal from './ShowAllExamsModal';
import {examType} from '../../types';
import Toast from 'react-native-toast-message';
import {Exam, Grade, Subject} from '../../Realm';
import {AuthContext} from '../../Realm/model';

export const ExamCatagories = ['Previous Exams', 'Model'];

const FullExams: React.FC<{
  selectedExamType: string;
  setSelectedExamType: React.Dispatch<React.SetStateAction<string>>;
  selectedSubject: Subject;
}> = ({selectedExamType, setSelectedExamType, selectedSubject}) => {
  const navigator = useNavigation();
  const {useRealm, useQuery} = AuthContext;
  const realm = useRealm();

  const savedGrade = useQuery(Grade);
  const savedExams = useQuery(Exam, savedExamItem => {
    return savedExamItem.filtered('type == "Previous"');
  });

  const [getExams, {isLoading, error}] = useGetExamsMutation();

  const [exams, setExams] = useState<examType[] | []>([]);

  useEffect(() => {
    if (!savedExams || savedExams.length === 0) {
      getPreviousExams(
        navigator,
        getExams,
        setExams,
        selectedSubject.subject?.subject || '',
        savedGrade[0].grade,
        realm,
      );
    } else {
      const filteredEXams: any[] = savedExams.filter(
        examItem => examItem.subject?.id === selectedSubject.subject?.id,
      );
      setExams([...filteredEXams]);

      filteredEXams.length === 0 &&
        Toast.show({
          type: 'error',
          text1: 'No exams found that match your grade and subject',
          text2: 'Try a different subject',
        });
    }
  }, [selectedSubject, getExams]);

  useEffect(() => {
    error &&
      Toast.show({
        type: 'error',
        text1: 'Fetch exams error',
        text2:
          error?.data && error?.data?.message
            ? error.data.message
            : 'Unable to get exams',
      });
  }, [error]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Full Exams to practice</Text>

      <Buttons
        selectedExamType={selectedExamType}
        setSelectedExamType={setSelectedExamType}
      />

      <Exams
        isLoading={isLoading}
        error={error}
        exams={exams}
        subject={selectedSubject.subject?.subject || ''}
      />
    </View>
  );
};

const Exams: React.FC<{
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  exams: examType[];
  subject: string;
}> = ({isLoading, error, exams, subject}) => {
  const navigator = useNavigation();
  const [showAllExams, setShowAllExams] = useState(false);
  return (
    <View style={examsStyle.container}>
      {!isLoading &&
        !error &&
        exams.length > 0 &&
        exams.map((exam, index) => (
          <TouchableOpacity
            key={exam.id}
            touchSoundDisabled
            style={examsStyle.imgContainer}
            onPress={() => {
              navigator.navigate('Exam-View', {exam});
            }}>
            <ImageBackground
              style={examsStyle.imageBG}
              source={
                (index + 1) % 2 !== 0
                  ? (index + 1) % 3 === 0
                    ? require('../../assets/Images//Practice/exam_yellow.png')
                    : require('../../assets/Images//Practice/exam_blue.png')
                  : require('../../assets/Images//Practice/exam_green.png')
              } // Replace with the correct path to your image
              resizeMode="cover"
            />
            <Text style={examsStyle.buttonText}>
              {exam?.year?.year ? exam?.year?.year : exam.year}
            </Text>
          </TouchableOpacity>
        ))}
      {isLoading &&
        Array.from({length: 5}).map((_, index: number) => (
          <View
            key={index + 'exam_loading'}
            style={[examsStyle.imgContainer, examsStyle.imgContainerLoading]}
          />
        ))}

      {exams.length === 0 && (
        <Text style={examsStyle.noExam}>
          No exams available {subject !== '' && `for ${subject}`}
        </Text>
      )}
      <ShowAllExamsModal
        exitExamModalVisible={showAllExams}
        setExitExamModalVisible={setShowAllExams}
        exams={exams}
      />
    </View>
  );
};

const Buttons: React.FC<{
  selectedExamType: string;
  setSelectedExamType: React.Dispatch<React.SetStateAction<string>>;
}> = ({selectedExamType, setSelectedExamType}) => {
  return (
    <View style={buttonStyles.container}>
      {ExamCatagories.map(exam => (
        <TouchableOpacity
          key={exam}
          touchSoundDisabled
          style={
            selectedExamType === exam
              ? [buttonStyles.button, buttonStyles.buttonActive]
              : buttonStyles.button
          }
          onPress={() => setSelectedExamType(exam)}>
          <Text
            style={
              selectedExamType === exam
                ? [buttonStyles.buttonText, buttonStyles.buttonTextActive]
                : buttonStyles.buttonText
            }>
            {exam}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
  title: {
    color: '#008E97',
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.04,
  },
});

const buttonStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: screenWidth * 0.008,
    borderRadius: 10,
  },
  button: {
    width: '45%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E1E1E1',
  },
  buttonText: {
    color: '#000',
    fontFamily: 'PoppinsMedium',
    width: '100%',
    paddingVertical: screenHeight * 0.01,
    textAlign: 'center',
    fontSize: screenWidth * 0.03,
  },
  buttonActive: {
    backgroundColor: '#1E90FF',
  },
  buttonTextActive: {
    color: '#fff',
  },
});

export const examsStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: '3%',
  },
  imgContainer: {
    width: '18%',
    height: screenHeight * 0.1,
    marginTop: screenWidth * 0.02,
    maxHeight: 100,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginRight: '3%',
  },
  imgContainerLoading: {
    backgroundColor: '#f5f5f5',
  },
  buttonText: {
    position: 'absolute',
    bottom: -2,
    fontFamily: 'PoppinsBold',
    fontSize: screenWidth * 0.028,
    color: 'white',
  },
  imageBG: {
    width: '100%',
    height: '100%',
  },
  noExam: {
    paddingVertical: 10,
    textAlign: 'center',
    width: '100%',
  },
});

export default FullExams;
