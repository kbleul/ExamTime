import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {PagesCounterType} from './types';
import {screenHeight, screenWidth} from '../../../../utils/Data/data';
import {createRealmUserData} from '../Logic';
import SubjectButton from '../../../../components/Atoms/SubjectButtonsOnboarding';
import GradeButton from '../../../../components/Atoms/GradeButtonOnBoarding';
import TopIndicator from '../../../../components/Molecules/TopIndicator';
import {AuthContext} from '../../../../Realm/model';

import {subjectType} from '../../../../types';
import {useGetSubjectMutation} from '../../../../reduxToolkit/Services/auth';
import {getSubjectsMutation} from './logic';
import Loading from '../../../../components/Atoms/Loading';
import Toast from 'react-native-toast-message';

const PageThree: React.FC<PagesCounterType> = ({
  pageCounter,
  setPageCounter,
}) => {
  const {useRealm} = AuthContext;

  const realm = useRealm();
  const navigator = useNavigation();
  const [subjectsArray, setSubjectsArray] = useState<subjectType[] | null>(
    null,
  );
  const [selectedSubjects, setSelectedSubjects] = useState<string[] | null>(
    null,
  );

  const [getSubject, {isLoading, error}] = useGetSubjectMutation();

  useEffect(() => {
    getSubjectsMutation(getSubject, navigator, setSubjectsArray);
  }, []);

  useEffect(() => {
    error &&
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: `${error?.data.message}`,
      });
  }, [error]);

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
          {!isLoading && !error && subjectsArray && (
            <>
              <View
                style={[
                  style.buttonsSubcontainer,
                  style.buttonsSubcontainerTop,
                ]}>
                {subjectsArray.map((subject, index) => (
                  <SubjectButton
                    key={subject.id}
                    text={subject.subject.subject}
                    subjectId={subject.id}
                    selectedSubjects={selectedSubjects}
                    setSelectedSubjects={setSelectedSubjects}
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
                      selectedSubjects ? [...selectedSubjects] : [],
                      navigator,
                    )
                  }
                  isActive={true}
                />
              </View>
            </>
          )}

          {isLoading && <Loading />}
        </View>
        <Toast />
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
    flex: 1,
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
    fontSize: screenWidth * 0.07,
    color: '#2D466A',
    textAlign: 'left',
    paddingHorizontal: 30,
    lineHeight: 40,
  },
  subtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: screenWidth * 0.045,
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
