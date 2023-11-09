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
import {RootState} from '../../reduxToolkit/Store';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getPreviousExams} from '../../screens/App/Practice/logic';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';
import {SerializedError} from '@reduxjs/toolkit';

export const ExamCatagories = ['Previous Exams', 'Model'];
const ExamsData = ['2015', '2016', '2017', '2018'];

const FullExams: React.FC<{
  selectedExamType: string;
  setSelectedExamType: React.Dispatch<React.SetStateAction<string>>;
}> = ({selectedExamType, setSelectedExamType}) => {
  const navigator = useNavigation();
  const token = useSelector((state: RootState) => state.auth.token);

  const [getExams, {isLoading, isError, error}] = useGetExamsMutation();

  const [exams, setExams] = useState([]);
  useEffect(() => {
    token && getPreviousExams(navigator, getExams, token, setExams, 'grade_8');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Full Exams to practice</Text>

      <Buttons
        selectedExamType={selectedExamType}
        setSelectedExamType={setSelectedExamType}
      />

      <Exams isLoading={isLoading} error={error} />
    </View>
  );
};

const Exams: React.FC<{
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}> = ({isLoading, error}) => {
  return (
    <View style={examsStyle.container}>
      {!isLoading &&
        !error &&
        ExamsData.map((exam, index) => (
          <TouchableOpacity
            key={exam}
            touchSoundDisabled
            style={examsStyle.imgContainer}
            onPress={() => {}}>
            <ImageBackground
              style={examsStyle.imageBG}
              source={
                index % 2 === 0
                  ? index === 2
                    ? require('../../assets/Images//Practice/exam_yellow.png')
                    : require('../../assets/Images//Practice/exam_green.png')
                  : require('../../assets/Images//Practice/exam_blue.png')
              } // Replace with the correct path to your image
              resizeMode="cover"
            />
            <Text style={examsStyle.buttonText}>{exam}</Text>
          </TouchableOpacity>
        ))}

      {isLoading && <Text>is loading ...</Text>}
      {error && <Text>{error?.data?.message}</Text>}
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
    fontSize: 16,
  },
});

const buttonStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    padding: 4,
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
    paddingVertical: 8,
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

const examsStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },
  imgContainer: {
    width: '18%',
    height: screenHeight * 0.13,
    marginTop: 10,
    maxHeight: 100,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
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
});

export default FullExams;
