import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import SubjectSelectViewBox from '../../../components/Organisms/SubjectSelectViewBox';
import Tips from '../../../components/Molecules/Tips';
import FullExams, {
  ExamCatagories,
} from '../../../components/Organisms/FullExams';
import RandomQuestions from '../../../components/Organisms/RandomQuestions';
import {STATUSTYPES, screenHeight, screenWidth} from '../../../utils/Data/data';
import {AuthContext} from '../../../Realm/model';
import {Subject} from '../../../Realm';
import Toast from 'react-native-toast-message';
import {subjectType} from '../../../types';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useGetSubjectMutation} from '../../../reduxToolkit/Services/auth';
import {getSubjectsMutation} from '../Onboarding/Page/logic';
import Loading from '../../../components/Atoms/Loading';
import {useNavContext} from '../../../context/bottomNav';
import {RootState} from '../../../reduxToolkit/Store';
import {useSelector} from 'react-redux';
import LoginBox from '../../../components/Atoms/LoginBox';
import {useUserStatus} from '../../../context/userStatus';

export let availableHeight = screenHeight - screenHeight * 0.088;

const getSubjects = (realm: Realm) => {
  const subject = realm.objects(Subject);

  return subject;
};
const Practice = () => {
  const navigator = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);

  const {setShowNavigation} = useNavContext();
  const {userStatus} = useUserStatus();

  const {useRealm} = AuthContext;
  const realm = useRealm();

  const savedSubjects = getSubjects(realm);

  const [selectedSubject, setSelectedSubject] = useState<
    Subject | subjectType | null
  >(savedSubjects && savedSubjects.length > 0 ? savedSubjects[0] : null);
  const [selectedExamType, setSelectedExamType] = useState(
    ExamCatagories[0].name,
  );
  const [subjectsArray, setSubjectsArray] = useState<subjectType[] | null>(
    null,
  );

  const [getSubject, {isLoading}] = useGetSubjectMutation();

  useEffect(() => {
    const subjectsArray = getSubjects(realm);

    if (subjectsArray && subjectsArray.length > 0) {
      setSelectedSubject(subjectsArray[0]);
      setSubjectsArray([...subjectsArray]);
    } else {
      getSubjectsMutation(
        getSubject,
        navigator,
        realm,
        setSubjectsArray,
        setSelectedSubject,
      );
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigator.addListener('blur', () => {
      // Your side effects when the screen loses focus
      console.log('Screen lost focus');
      setSelectedSubject(null);
      // Add your side effect code here
    });

    return () => {
      // Cleanup the subscription when the component unmounts
      unsubscribe();
    };
  }, [navigator]);

  useFocusEffect(
    useCallback(() => {
      const subjectsArray = getSubjects(realm);

      setShowNavigation(true);
      setSubjectsArray([...subjectsArray]);
      setSelectedSubject(subjectsArray[0]);
    }, []),
  );

  return (
    <>
      <SafeAreaView style={[IndexStyle.container, styles.container]}>
        {!selectedSubject && <Loading />}
        {selectedSubject && savedSubjects && savedSubjects.length > 0 && (
          <ScrollView
            style={styles.ScrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Practice Section</Text>
              <Text style={styles.headerSubTitle}>Choose your Subject</Text>
            </View>

            <View style={styles.container}>
              {userStatus === STATUSTYPES.NotAuthorized && (
                <LoginBox
                  title="Your trial period has ended!"
                  subTitle="Please login or sign up to keep using ExamTime"
                />
              )}

              {userStatus === STATUSTYPES.Unsubscribed && (
                <LoginBox
                  title="Your free trial period has ended!"
                  subTitle="Please subscribe to keep using ExamTime"
                  isSubscribe
                />
              )}

              {userStatus !== STATUSTYPES.NotAuthorized &&
                userStatus !== STATUSTYPES.Unsubscribed && (
                  <>
                    <SubjectSelectViewBox
                      SelectedSubjectId={selectedSubject?.id}
                      setSelectedSubject={setSelectedSubject}
                    />

                    <Tips selectedSubjectId={selectedSubject?.id} />
                    <RandomQuestions selectedSubjectId={selectedSubject?.id} />

                    {/* <FullExams
                      selectedExamType={selectedExamType}
                      setSelectedExamType={setSelectedExamType}
                      selectedSubjectId={selectedSubject?.id}
                    /> */}
                  </>
                )}
            </View>
          </ScrollView>
        )}

        {isLoading && <Loading />}

        <Toast />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: screenHeight * 0.045,
  },
  ScrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: screenWidth * 0.009,
  },
  headerContainer: {
    paddingHorizontal: screenWidth * 0.02,
  },
  headerTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.065,
    color: '#000',
    lineHeight: screenHeight * 0.05,
    marginTop: screenWidth * 0.009,
  },
  headerSubTitle: {
    fontFamily: 'PoppinsLight',
    fontSize: screenWidth * 0.045,
    color: '#C1C2C6',
    lineHeight: screenHeight * 0.04, //34
  },
  BOX1: {
    height: availableHeight - 20,
    borderWidth: 1,
  },
});

export default Practice;
