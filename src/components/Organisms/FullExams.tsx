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
import PracticeModeModal from './PracticeModeModal';

export const ExamCatagories = [
  {
    name: 'National Exams',
    type: 'EXAM',
  },
  {
    name: 'Model Exams',
    type: 'CUSTOM',
  },
];

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
    return savedExamItem.filtered(
      `examType == "${
        ExamCatagories.find(item => item.name === selectedExamType)?.type
      }"`,
    );
  });

  const [getExams, {isLoading, error}] = useGetExamsMutation();

  const [exams, setExams] = useState<examType[] | []>([]);

  const [selectedExam, setSelectedExam] = useState<examType | null>(null);

  const [practiceModeModalVisible, setPracticeModeModalVisible] =
    useState(false);

  useEffect(() => {
    if (selectedSubject) {
      if (!savedExams || savedExams.length === 0) {
        getPreviousExams(
          navigator,
          getExams,
          setExams,
          selectedSubject.subject?.subject || '',
          savedGrade[0].grade,
          realm,
          ExamCatagories.find(item => item.name === selectedExamType)?.type ||
            '',
        );
      } else {
        const filteredEXams: any[] = savedExams.filter(
          examItem =>
            examItem.examType ===
              ExamCatagories.find(item => item.name === selectedExamType)
                ?.type && examItem.subject?.id === selectedSubject.subject?.id,
        );
        setExams([...filteredEXams]);
        filteredEXams.length === 0 &&
          Toast.show({
            type: 'error',
            text1: 'No exams found that match your grade and subject',
            text2: 'Try a different subject',
          });
      }
    }
  }, [selectedSubject, getExams, selectedExamType]);

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
        subject={(selectedSubject && selectedSubject.subject?.subject) || ''}
        selectedExamType={selectedExamType}
        setPracticeModeModalVisible={setPracticeModeModalVisible}
        setSelectedExam={setSelectedExam}
      />

      <PracticeModeModal
        practiceModeModalVisible={practiceModeModalVisible}
        setPracticeModeModalVisible={setPracticeModeModalVisible}
        setSelectedExam={setSelectedExam}
        selectedExam={selectedExam}
      />
    </View>
  );
};

const Exams: React.FC<{
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  exams: examType[];
  subject: string;
  selectedExamType: string;
  setPracticeModeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedExam: React.Dispatch<React.SetStateAction<examType | null>>;
}> = ({
  isLoading,
  error,
  exams,
  subject,
  selectedExamType,
  setPracticeModeModalVisible,
  setSelectedExam,
}) => {
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
              //  navigator.navigate('Exam-View', {exam});
              setPracticeModeModalVisible(true);
              setSelectedExam(exam);
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
          No {selectedExamType} exams available{' '}
          {subject !== '' && `for ${subject}`}
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
          key={exam.name + exam.type}
          touchSoundDisabled
          style={
            selectedExamType === exam.name
              ? [buttonStyles.button, buttonStyles.buttonActive]
              : buttonStyles.button
          }
          onPress={() => setSelectedExamType(exam.name)}>
          <Text
            style={
              selectedExamType === exam.name
                ? [buttonStyles.buttonText, buttonStyles.buttonTextActive]
                : buttonStyles.buttonText
            }>
            {exam.name}
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
    overflow: 'hidden',
  },
  button: {
    width: '45%',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
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
