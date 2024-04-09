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
import {
  useCreteGuestUserMutation,
  useGetStudyMutation,
  useGetSubjectMutation,
  useGetTrialTimesMutation,
} from '../../../../reduxToolkit/Services/auth';
import {getSubjectsMutation} from './logic';
import Loading from '../../../../components/Atoms/Loading';
import Toast from 'react-native-toast-message';
import {Subject} from '../../../../Realm';
import {useOnboardingContext} from '../../../../context/onboarding';

const PageThree: React.FC<PagesCounterType> = ({
  pageCounter,
  setPageCounter,
}) => {
  const {setShowOnboarding} = useOnboardingContext();

  const {useRealm, useQuery} = AuthContext;

  const realm = useRealm();
  const savedSubjects = useQuery(Subject);

  const navigator = useNavigation();
  const [subjectsArray, setSubjectsArray] = useState<subjectType[] | null>(
    null,
  );
  const [selectedSubjects, setSelectedSubjects] = useState<string[] | null>(
    null,
  );

  const [IsLoadingSubjects, setIsLoadingSubjects] = useState(false);
  const [getSubject, {isLoading, error}] = useGetSubjectMutation();
  const [getStudy] = useGetStudyMutation();

  const [createGuest] = useCreteGuestUserMutation();
  const [getTrialTimes] = useGetTrialTimesMutation();

  const [IsLoadingSubjectsRealm, setIsLoadingSubjectsRealm] = useState(true);
  const [relamSaveStatus, setRelamSaveStatus] = useState(-1);

  useEffect(() => {
    if (savedSubjects && savedSubjects.length > 0) {
      realm.write(() => {
        realm.delete(savedSubjects);
      });
    }

    getSubjectsMutation(
      getSubject,
      navigator,
      realm,
      setSubjectsArray,
      null,
      setIsLoadingSubjectsRealm,
      setRelamSaveStatus,
    );
  }, []);

  useEffect(() => {
    error &&
      Toast.show({
        type: 'error',
        text1: 'Failed to get availble grades.',
        text2: error?.data ? `${error?.data.message}` : 'Please try again',
      });
  }, [error]);

  return (
    <View style={style.container}>
      <View style={style.scrollContainer}>
        <TopIndicator
          setPageCounter={setPageCounter}
          pageCounter={pageCounter}
          IsLoadingSubjectsRealm={IsLoadingSubjectsRealm}
          setIsLoadingSubjects={setIsLoadingSubjects}
        />

        {IsLoadingSubjectsRealm &&
          subjectsArray &&
          subjectsArray.length > 0 && (
            <View style={style.indicatorContainer}>
              {subjectsArray.map((subject, index) => (
                <View
                  key={subject.id + '--' + subject.id}
                  style={
                    relamSaveStatus < index
                      ? style.indicator
                      : [style.indicator, style.indicatorDone]
                  }
                />
              ))}
            </View>
          )}

        <View style={style.titleContainer}>
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
                {subjectsArray.map(subject => (
                  <SubjectButton
                    key={subject.id}
                    text={subject.subject.subject}
                    subjectId={subject.id}
                    selectedSubjects={selectedSubjects}
                    setSelectedSubjects={setSelectedSubjects}
                  />
                ))}
              </View>

              <View
                style={
                  IsLoadingSubjectsRealm
                    ? [style.submitcontainer, style.buttonsSubcontainerLoading]
                    : style.submitcontainer
                }>
                {!IsLoadingSubjectsRealm ? (
                  <GradeButton
                    text={IsLoadingSubjects ? 'Loading ...' : 'Get Started'}
                    index={5}
                    onPress={() =>
                      createRealmUserData(
                        realm,
                        selectedSubjects ? [...selectedSubjects] : [],
                        setIsLoadingSubjects,
                        setShowOnboarding,
                        createGuest,
                        getTrialTimes,
                        getStudy,
                        navigator,
                        Toast,
                      )
                    }
                    isActive={!IsLoadingSubjects}
                  />
                ) : (
                  <Loading />
                )}
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
    paddingTop: 40,
    paddingHorizontal: 20,
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#D3DBF0',
    borderRadius: 80,
    overflow: 'hidden',
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
    overflow: 'hidden',
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
    textTransform: 'uppercase',
  },
  activeButtonText: {
    color: '#858585',
  },
  titleContainer: {
    height: screenHeight * (2.5 / 10),
    justifyContent: 'flex-end',
  },
  subtitle: {
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.05,
    color: '#2D466A',
    textAlign: 'left',
    lineHeight: 40,
  },
  secondBox: {
    height: screenHeight * (5.6 / 10),
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
  submitcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '7%',
  },
  buttonsSubcontainerLoading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsSubcontainerTop: {
    marginLeft: '10%',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: '10%',
  },
  indicator: {
    width: 30,
    height: 8,
    backgroundColor: '#f3f3f3',
    borderRadius: 20,
  },
  indicatorDone: {
    backgroundColor: '#00509d',
  },
});

export default PageThree;
