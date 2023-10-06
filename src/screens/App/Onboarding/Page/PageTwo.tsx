import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {PagesCounterType, PagesGradesProps} from './types';
import img from '../../../../assets/Images/onboarding/2.png';
import {set_to_localStorage} from '../../../../utils/Functions/Set';
import {LocalStorageDataKeys} from '../../../../utils/Data/data';
import GradeButton from '../../../../components/Atoms/GradeButtonOnBoarding';
import TopIndicator from '../../../../components/Molecules/TopIndicator';

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
        <View style={style.titleContainer}>
          <Text style={style.title}>What Grade are you in ?</Text>
        </View>
        <View>
          <GradeButton
            text="Grade 8"
            index={2}
            setSelected={setSelectedGrade}
            onPress={() => saveGrade('grade_8')}
            isActive={selectedGrade === 2}
          />
          <GradeButton
            text="Grade 12"
            index={3}
            setSelected={setSelectedGrade}
            onPress={() => saveGrade('grade_12_natural')}
            isActive={selectedGrade === 3}
          />
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
    height: '100%',
  },
  imgContainer: {
    width: '100%',
    height: '40%',
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '80%',
    height: '100%',
    marginRight: '10%',
  },
  titleContainer: {
    marginTop: '10%',
    marginBottom: '10%',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: '#858585',
    textAlign: 'left',
    paddingHorizontal: 50,
    lineHeight: 40,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
  },
});

export default PageTwo;
