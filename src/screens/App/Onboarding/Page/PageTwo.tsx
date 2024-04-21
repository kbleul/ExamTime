import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {PagesCounterType} from './types';
import {setObject_to_localStorage} from '../../../../utils/Functions/Set';
import {
  LocalStorageDataKeys,
  screenHeight,
  screenWidth,
} from '../../../../utils/Data/data';
import TopIndicator from '../../../../components/Molecules/TopIndicator';
import OtherCoursesCard from '../../../../components/Molecules/ChosenAndOtherCourses/OtherCoursesCard';
import {useNavigation} from '@react-navigation/native';
import {useGetGradeMutation} from '../../../../reduxToolkit/Services/grade';
import {getGradesMutation} from './logic';
import {gradeType} from '../../../../types';
import Loading from '../../../../components/Atoms/Loading';
import Toast from 'react-native-toast-message';
import {AuthContext} from '../../../../Realm/model';

const PageTwo: React.FC<PagesCounterType> = ({pageCounter, setPageCounter}) => {
  const navigator = useNavigation();
  const [getGrades, {isLoading, error}] = useGetGradeMutation();
  const [gradesArray, setGradesArray] = useState<gradeType[] | null>(null);

  const [fetchTrialCounter, setFetchTrialCounter] = useState(0);

  const {useRealm} = AuthContext;

  const realm = useRealm();

  useEffect(() => {
    setFetchTrialCounter(prev => ++prev);
    getGradesMutation(getGrades, navigator, setGradesArray, realm);
  }, []);

  useEffect(() => {
    if (error) {
      if (fetchTrialCounter < 5) {
        setFetchTrialCounter(prev => ++prev);
        getGradesMutation(getGrades, navigator, setGradesArray, realm);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to get availble grades.',
          text2: error?.data
            ? `${error?.data.message}`
            : 'Please check your internet connection and try again',
        });
      }
    }
  }, [error]);

  const saveGrade = async (grade: gradeType) => {
    setObject_to_localStorage(LocalStorageDataKeys.userGrade, grade);
    setPageCounter(3);
  };

  return (
    <View style={style.container}>
      <TopIndicator setPageCounter={setPageCounter} pageCounter={pageCounter} />

      <View style={style.titleContainer}>
        <Text style={style.title}>Hello.</Text>
        <Text style={style.subtitle}>What grade are you in?</Text>
      </View>

      {!isLoading && !error && gradesArray && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={style.gradesContainerScroll}
          contentContainerStyle={style.gradesContainer}>
          {gradesArray.map((grade, index) => (
            <OtherCoursesCard
              key={grade.id}
              grade={grade.grade}
              subjectsCount={6}
              isOnboarding
              onPress={() => saveGrade(grade)}
              index={index}
            />
          ))}
        </ScrollView>
      )}

      {isLoading && <Loading />}
      <Toast />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: screenHeight,
  },
  titleContainer: {
    marginTop: screenHeight * 0.05,
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.075,
    color: '#2D466A',
    textAlign: 'left',
    lineHeight: 40,
  },
  subtitle: {
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.05,
    color: '#2D466A',
    textAlign: 'left',
    lineHeight: 40,
  },
  gradesContainerScroll: {
    width: '100%',
    paddingTop: 10,
  },
  gradesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 70,
  },
});

export default PageTwo;
