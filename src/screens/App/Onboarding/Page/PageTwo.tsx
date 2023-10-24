import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {PagesCounterType, PagesGradesProps} from './types';
import img from '../../../../assets/Images/onboarding/2a.png';
import {set_to_localStorage} from '../../../../utils/Functions/Set';
import {LocalStorageDataKeys, screenHeight} from '../../../../utils/Data/data';
import TopIndicator from '../../../../components/Molecules/TopIndicator';
import OtherCoursesCard from '../../../../components/Molecules/ChosenAndOtherCourses/OtherCoursesCard';

const PageTwo: React.FC<PagesCounterType & PagesGradesProps> = ({
  pageCounter,
  setPageCounter,
  selectedGrade,
  setSelectedGrade,
}) => {
  const saveGrade = (grade: string) => {
    set_to_localStorage(LocalStorageDataKeys.userGrade, grade);
    setPageCounter(3);
  };
  return (
    <View style={style.container}>
      <ScrollView
        contentContainerStyle={style.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <TopIndicator
          setPageCounter={setPageCounter}
          pageCounter={pageCounter}
        />

        <View style={style.imgContainer}>
          
          <Image source={img} style={style.img} />
        </View>

        <View style={style.secondContainer}>
          <View style={style.titleContainer}>
            <Text style={style.title}>What Grade are you in ?</Text>
          </View>
          <View style={style.gradesContainer}>
            <OtherCoursesCard
              grade={12}
              subTitle="Natural Science Student"
              subjectsCount={12}
              isOnboarding
              onPress={() => saveGrade('grade_12_natural')}
            />
            <OtherCoursesCard
              grade={12}
              subTitle="Social Science Student"
              subjectsCount={9}
              isOnboarding
              onPress={() => saveGrade('grade_12_socials')}
            />
            <OtherCoursesCard
              grade={8}
              subTitle="Reginal Exam Taker"
              subjectsCount={9}
              isOnboarding
              onPress={() => saveGrade('grade_8')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
  },
  scrollContainer: {
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    fontSize: 25,
    color: '#2D466A',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 40,
  },
  gradesContainer: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default PageTwo;
