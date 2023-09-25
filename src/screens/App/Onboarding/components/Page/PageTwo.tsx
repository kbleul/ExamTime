import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import GradeButton from '../Atoms/GradeButton';
import {PagesCounterType, PagesGradesProps, PagesProps} from './types';
import img from '../../../../../assets/Images/onboarding/2.png';
import TopIndicator from '../Molecules/TopIndicator';

const PageTwo: React.FC<PagesCounterType & PagesGradesProps> = ({
  pageCounter,
  setPageCounter,
  selectedGrade,
  setSelectedGrade,
}) => {
  return (
    <View>
      <TopIndicator setPageCounter={setPageCounter} pageCounter={pageCounter} />

      <View style={style.imgContainer}>
        <Image source={img} style={style.img} />
      </View>
      <View style={style.titleContainer}>
        <Text style={style.title}>What Grade are you in ?</Text>
      </View>
      <View>
        <GradeButton
          text="Grade 6"
          index={1}
          setSelected={setSelectedGrade}
          onPress={() => setPageCounter(3)}
          isActive={selectedGrade === 1}
        />
        <GradeButton
          text="Grade 8"
          index={2}
          setSelected={setSelectedGrade}
          onPress={() => setPageCounter(3)}
          isActive={selectedGrade === 2}
        />
        <GradeButton
          text="Grade 12"
          index={3}
          setSelected={setSelectedGrade}
          onPress={() => setPageCounter(3)}
          isActive={selectedGrade === 3}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
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
    marginBottom: '5%',
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
