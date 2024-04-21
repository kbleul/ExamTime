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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useGetSubjectMutation} from '../../../reduxToolkit/Services/auth';
import {getSubjectsMutation} from '../Onboarding/Page/logic';
import Loading from '../../../components/Atoms/Loading';
import {useNavContext} from '../../../context/bottomNav';
import LoginBox from '../../../components/Atoms/LoginBox';
import {useUserStatus} from '../../../context/userStatus';

export let availableHeight = screenHeight - screenHeight * 0.088;

const getSubjects = (realm: Realm) => {
  const subject = realm.objects(Subject);

  return subject;
};
const Practice = () => {
  const navigator = useNavigation();

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
    const unsubscribe = navigator.addListener('blur', () => {
      setSelectedSubject(null);
      setSubjectsArray(null);
    });

    return () => {
      unsubscribe();
    };
  }, [navigator]);

  useFocusEffect(
    useCallback(() => {
      setShowNavigation(true);

      let savedSubjectsArray;

      try {
        savedSubjectsArray = getSubjects(realm);
      } catch (err) {
        console.log('--->', err);
      }

      if (savedSubjectsArray && savedSubjectsArray.length > 0) {
        setSelectedSubject(savedSubjectsArray[0]);
        setSubjectsArray([...savedSubjectsArray]);
      } else {
        getSubjectsMutation(
          getSubject,
          navigator,
          realm,
          setSubjectsArray,
          setSelectedSubject,
        );
      }
    }, []),
  );

  return (
    <>
      <SafeAreaView style={[IndexStyle.container, styles.container]}>
        {selectedSubject && subjectsArray && subjectsArray.length > 0 && (
          <ScrollView
            style={styles.ScrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Practice Section</Text>
              <Text style={styles.headerSubTitle}>Choose your Subject</Text>
            </View>

            <View>
              {userStatus === STATUSTYPES.NotAuthorized && (
                <View style={styles.container}>
                  <LoginBox
                    title="Your trial period has ended!"
                    subTitle="Please login or create an account to use the app's functions."
                  />
                </View>
              )}

              {userStatus === STATUSTYPES.Unsubscribed && (
                <View style={styles.container}>
                  <LoginBox
                    title="Your free trial period has ended!"
                    subTitle="Please subscribe to keep using ExamTime"
                    isSubscribe
                  />
                </View>
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

                    <FullExams
                      selectedExamType={selectedExamType}
                      setSelectedExamType={setSelectedExamType}
                      selectedSubjectId={selectedSubject?.id}
                    />
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
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: screenHeight * 0.045,
  },
});

export default Practice;
