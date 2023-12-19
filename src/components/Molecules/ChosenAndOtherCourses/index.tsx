import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Header from './Header';
import ChosenCoursesCard from './ChosenCoursesCard';
import OtherCoursesCard from './OtherCoursesCard';
import {Grade, Subject, UserData} from '../../../Realm';
import {AuthContext} from '../../../Realm/model';
import {subjectType} from '../../../types';
import {PushFavorateToFront} from '../../../utils/Functions/Helper';
import {LocalStorageDataKeys, screenHeight} from '../../../utils/Data/data';
import {useNavigation} from '@react-navigation/native';
import {useGetSubjectMutation} from '../../../reduxToolkit/Services/auth';
import {getSubjectsMutation} from '../../../screens/App/Onboarding/Page/logic';

interface CourseItemType {
  id: string;
  grade: number;
  subTitle: string;
  subjectsCount: number;
}

const DummyCourses = [
  {
    id: 'G0011',
    grade: 'Grade 6',
    subTitle: 'For Reginal Exam Takers',
    subjectsCount: 6,
  },
  {
    id: 'G0012',
    grade: 'Grade 8',
    subTitle: 'For Natural Science Students',
    subjectsCount: 6,
  },
  {
    id: 'G0013',
    grade: 'Grade 12 Social',
    subTitle: 'For Social Students',
    subjectsCount: 6,
  },
];

const ChosenCourses = ({
  setLoginModalVisible,
}: {
  setLoginModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {useQuery, useRealm} = AuthContext;
  const realm = useRealm();

  const savedSubjects = useQuery(Subject);
  const savedUserData = useQuery(UserData);
  const savedGrades = useQuery(Grade, savedgrade => {
    return savedgrade.filtered(`id != "${savedUserData[0].grade.id}"`);
  });

  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);

  const navigator = useNavigation();
  const [subjectsArray, setSubjectsArray] = useState<subjectType[] | null>(
    null,
  );

  const [getSubject] = useGetSubjectMutation();

  useEffect(() => {
    savedSubjects && savedSubjects.length > 0
      ? setSubjectsArray([...savedSubjects])
      : getSubjectsMutation(getSubject, navigator, setSubjectsArray, realm);
  }, []);

  setTimeout(() => {
    setIsLoadingSubjects(false);
  }, 500);

  console.log('savedGrades length', savedGrades.length, savedUserData[0].grade);

  const renderItem = ({item, index}: {item: subjectType; index: number}) => {
    return (
      <View>
        {item && item.icon && (
          <ChosenCoursesCard
            subject={item.subject}
            subjectId={item.id}
            bgImage={{uri: item.icon}}
            setLoginModalVisible={setLoginModalVisible}
            isLoadingSubjects={isLoadingSubjects}
            timerValue={(index + 1) * 200}
          />
        )}
      </View>
    );
  };

  const renderGreadeItem = ({item, index}: {item: Grade; index: number}) => {
    return (
      <View>
        <OtherCoursesCard grade={item.grade} subjectsCount={6} index={index} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="My learning" subTitle="Your Chosen Courses" seeAll />

      {subjectsArray && subjectsArray.length > 0 && (
        <FlatList
          keyExtractor={(item, index) => item.id + 'my-course' + index}
          data={PushFavorateToFront(
            savedUserData && savedUserData.length > 0
              ? savedUserData[0].selectedSubjects
              : null,
            subjectsArray,
          )}
          renderItem={index => renderItem(index)}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}

      {savedGrades && savedGrades.length > 0 && (
        <>
          <View style={styles.subContainer}>
            <Header title="Other Courses" />
          </View>

          <FlatList
            keyExtractor={item => item.id}
            data={savedGrades}
            renderItem={({item, index}) => renderGreadeItem({item, index})}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: screenHeight * 0.01,
  },
  subContainer: {
    marginTop: screenHeight * 0.01,
  },
});

export default ChosenCourses;
