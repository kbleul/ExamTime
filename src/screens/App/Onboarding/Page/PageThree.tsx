import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import img from '../../../../assets/Images/onboarding/3.png';

import {PagesCounterType} from './types';
import {DummyDataScience, DummyDataSocial} from '../../../../utils/Data/data';
import {ScrollView} from 'react-native-gesture-handler';
import {createRealmUserData} from '../Logic';
import SubjectButton from '../../../../components/Atoms/SubjectButtonsOnboarding';
import GradeButton from '../../../../components/Atoms/GradeButtonOnBoarding';
import TopIndicator from '../../../../components/Molecules/TopIndicator';
import {AuthContext} from '../../../../Realm/model';

const Grade12Catagories = ['Natural', 'Social'];

type PageThreeProps = PagesCounterType & {
  selectedGrade: number;
};

const PageThree: React.FC<PageThreeProps> = ({
  pageCounter,
  selectedGrade,
  setPageCounter,
}) => {
  const {useRealm} = AuthContext;

  const realm = useRealm();
  const navigation = useNavigation();
  const [selectedGrades, setSelectedGrades] = useState<string[] | undefined>(
    [],
  );

  const [selectedCatagory, setSelectedCatagory] = useState(
    Grade12Catagories[0],
  );

  return (
    <View style={style.container}>
      <ScrollView
        contentContainerStyle={style.scrollContainer}
        showsHorizontalScrollIndicator>
        <TopIndicator
          setPageCounter={setPageCounter}
          pageCounter={pageCounter}
        />

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
              onPress={() =>
                createRealmUserData(
                  realm,
                  selectedGrades ? [...selectedGrades] : [],
                  navigation,
                )
              }
              isActive={true}
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
    height: '125%',
  },
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#D3DBF0',
    borderRadius: 80,
    width: '60%',
    alignSelf: 'center',
    marginTop: '3%',
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
    height: '25%',
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
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 26,
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
    marginTop: '7%',
    paddingHorizontal: 20,
  },
});

export default PageThree;
