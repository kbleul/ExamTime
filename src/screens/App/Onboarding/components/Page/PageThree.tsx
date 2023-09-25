import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import img from '../../../../../assets/Images/onboarding/3.png';
import SubjectButton from '../Atoms/SubjectButtons';
import GradeButton from '../Atoms/GradeButton';
import TopIndicator from '../Molecules/TopIndicator';
import {PagesCounterType} from './types';
import {
  DummyDataScience,
  DummyDataSocial,
} from '../../../../../utils/Data/data';
import {ScrollView} from 'react-native-gesture-handler';

const Grade12Catagories = ['Natural', 'Social'];

type PageThreeProps = PagesCounterType & {
  selectedGrade: number;
};

const PageThree: React.FC<PageThreeProps> = ({
  pageCounter,
  selectedGrade,
  setPageCounter,
}) => {
  const navigation = useNavigation();
  const [selectedGrades, setSelectedGrades] = useState<string[] | undefined>(
    [],
  );

  const [selectedCatagory, setSelectedCatagory] = useState(
    Grade12Catagories[0],
  );

  return (
    <ScrollView
      contentContainerStyle={style.container}
      showsHorizontalScrollIndicator>
      <TopIndicator setPageCounter={setPageCounter} pageCounter={pageCounter} />

      {selectedGrade === 3 && (
        <View style={style.selectorContainer}>
          <TouchableOpacity
            onPress={() => setSelectedCatagory(Grade12Catagories[0])}
            style={
              selectedCatagory === Grade12Catagories[0]
                ? [style.buttons, style.activeButton]
                : style.buttons
            }>
            <Text
              style={
                selectedCatagory === Grade12Catagories[0]
                  ? style.buttonText
                  : [style.buttonText, style.activeButtonText]
              }>
              {Grade12Catagories[0]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedCatagory(Grade12Catagories[1])}
            style={
              selectedCatagory === Grade12Catagories[1]
                ? [style.buttons, style.activeButton]
                : style.buttons
            }>
            <Text
              style={
                selectedCatagory === Grade12Catagories[1]
                  ? style.buttonText
                  : [style.buttonText, style.activeButtonText]
              }>
              {Grade12Catagories[1]}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={style.imgContainer}>
        <Image source={img} style={style.img} />
      </View>
      <View style={style.titleContainer}>
        <Text style={style.title}>What do you want to study?</Text>
      </View>
      <View>
        <View style={style.buttonsSubcontainer}>
          {selectedCatagory === Grade12Catagories[0]
            ? DummyDataScience.map((subject, index) => (
                <SubjectButton
                  key={subject.subjName + index}
                  text={subject.subjName}
                  selectedGrades={selectedGrades}
                  setSelectedGrades={setSelectedGrades}
                />
              ))
            : DummyDataSocial.map((subject, index) => (
                <SubjectButton
                  key={subject.subjName + index}
                  text={subject.subjName}
                  selectedGrades={selectedGrades}
                  setSelectedGrades={setSelectedGrades}
                />
              ))}
        </View>

        <View style={style.buttonsSubcontainer}>
          <GradeButton
            text="Get Started"
            index={5}
            onPress={() => {
              navigation.navigate('Home');
            }}
            isActive={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#D3DBF0',
    borderRadius: 80,
    width: '60%',
    alignSelf: 'center',
    marginTop: '5%',
  },
  buttons: {
    width: '45%',
    paddingVertical: '5%',
  },
  activeButton: {
    backgroundColor: '#1E90FF',
    width: '54%',
    borderRadius: 80,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    textTransform: 'uppercase',
  },
  activeButtonText: {
    color: '#858585',
  },
  imgContainer: {
    width: '100%',
    height: '36%',
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '80%',
    height: '100%',
  },
  titleContainer: {
    marginTop: '3%',
    marginBottom: '4%',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: '#858585',
    textAlign: 'left',
    paddingHorizontal: 30,
    lineHeight: 40,
  },
  buttonsSubcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  mainCOntainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default PageThree;
