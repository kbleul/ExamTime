import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import img from '../../../../assets/Images/onboarding/3.png';

import {PagesCounterType} from './types';
import {
  DummyDataScience,
  DummyDataSocial,
  screenHeight,
} from '../../../../utils/Data/data';
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
      <View style={style.scrollContainer}>
        <TopIndicator
          setPageCounter={setPageCounter}
          pageCounter={pageCounter}
        />

        <View style={style.titleContainer}>
          <Text style={style.title}>Hello.</Text>
          <Text style={style.subtitle}>
            Pick your favorite topics to set up your feeds
          </Text>
        </View>

        <View style={style.secondBox}>
          <View
            style={[style.buttonsSubcontainer, style.buttonsSubcontainerTop]}>
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
      </View>
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
  titleContainer: {
    height: screenHeight * (3 / 10),
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 26,
    color: '#2D466A',
    textAlign: 'left',
    paddingHorizontal: 30,
    lineHeight: 40,
  },
  subtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: '#2D466A',
    textAlign: 'left',
    paddingHorizontal: 30,
    lineHeight: 40,
  },
  secondBox: {
    height: screenHeight * (5 / 10),
    justifyContent: 'space-between',
  },
  subjectButtonsContainer: {},
  buttonsSubcontainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '7%',
    width: '90%',
    marginLeft: '5%',
  },
  buttonsSubcontainerTop: {
    marginLeft: '10%',
  },
});

export default PageThree;
