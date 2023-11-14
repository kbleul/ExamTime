import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {PagesCounterType, PagesGradesProps} from './types';
import img from '../../../../assets/Images/onboarding/2a.png';
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

const PageTwo: React.FC<PagesCounterType> = ({pageCounter, setPageCounter}) => {
  const navigator = useNavigation();
  const [getGrades, {isLoading, error}] = useGetGradeMutation();
  const [gradesArray, setGradesArray] = useState<gradeType[] | null>(null);

  useEffect(() => {
    getGradesMutation(getGrades, navigator, setGradesArray);
  }, []);

  useEffect(() => {
    error &&
      Toast.show({
        type: 'error',
        text1: 'Failed to get availble grades.',
        text2: error?.data ? `${error?.data.message}` : 'Please try again',
      });
  }, [error]);

  const saveGrade = (grade: gradeType) => {
    setObject_to_localStorage(LocalStorageDataKeys.userGrade, grade);
    setPageCounter(3);
  };
  return (
    <View style={style.container}>
      <TopIndicator setPageCounter={setPageCounter} pageCounter={pageCounter} />

      <View style={style.imgContainer}>
        <Image source={img} style={style.img} />
      </View>

      <View style={style.secondContainer}>
        <View style={style.titleContainer}>
          <Text style={style.title}>What Grade are you in ?</Text>
        </View>
        {!isLoading && !error && gradesArray && (
          <View style={style.gradesContainer}>
            {gradesArray.map((grade, index) => (
              <OtherCoursesCard
                key={grade.id}
                grade={grade.grade}
                subTitle="Natural Science Student"
                subjectsCount={6}
                isOnboarding
                onPress={() => saveGrade(grade)}
                index={index}
              />
            ))}
          </View>
        )}
        {isLoading && <Loading />}
      </View>
      <Toast />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: screenHeight,
  },

  imgContainer: {
    width: '100%',
    height: screenHeight * (3.5 / 10),
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  secondContainer: {
    height: screenHeight * (4.5 / 10),
  },
  titleContainer: {
    marginTop: '5%',
    marginBottom: '5%',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: screenWidth * 0.06,
    color: '#2D466A',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 40,
  },
  gradesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default PageTwo;
