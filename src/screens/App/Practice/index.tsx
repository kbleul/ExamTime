import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import SubjectSelectViewBox from '../../../components/Organisms/SubjectSelectViewBox';
import Tips from '../../../components/Molecules/Tips';
import FullExams, {
  ExamCatagories,
} from '../../../components/Organisms/FullExams';
import RandomQuestions from '../../../components/Organisms/RandomQuestions';
import {screenHeight, screenWidth} from '../../../utils/Data/data';
import {AuthContext} from '../../../Realm/model';
import {Subject} from '../../../Realm';
import Toast from 'react-native-toast-message';
import {subjectType} from '../../../types';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useGetSubjectMutation} from '../../../reduxToolkit/Services/auth';
import {getSubjectsMutation} from '../Onboarding/Page/logic';
import Loading from '../../../components/Atoms/Loading';
import {useNavContext} from '../../../context/bottomNav';
import {RootState} from '../../../reduxToolkit/Store';
import {useSelector} from 'react-redux';

export let availableHeight = screenHeight - screenHeight * 0.088;

const Practice = () => {
  const navigator = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);

  const {setShowNavigation} = useNavContext();

  const {useQuery, useRealm} = AuthContext;
  const realm = useRealm();

  const savedSubjects = useQuery(Subject);

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
    savedSubjects && savedSubjects.length > 0
      ? setSubjectsArray([...savedSubjects])
      : getSubjectsMutation(
          getSubject,
          navigator,
          realm,
          setSubjectsArray,
          setSelectedSubject,
        );
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      setShowNavigation(true);
    }, []),
  );

  return (
    <>
      <SafeAreaView style={[IndexStyle.container, styles.container]}>
        {savedSubjects && savedSubjects.length > 0 && (
          <ScrollView
            style={styles.ScrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Practice Section</Text>
              <Text style={styles.headerSubTitle}>Choose your Subject</Text>
            </View>

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
              // selectedSubject={selectedSubject}
            />
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
