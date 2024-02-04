import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import Header from './Header';
import ChosenCoursesCard from './ChosenCoursesCard';
import OtherCoursesCard from './OtherCoursesCard';
import {Grade, Subject, UserData} from '../../../Realm';
import {AuthContext} from '../../../Realm/model';
import {subjectType} from '../../../types';
import {PushFavorateToFront} from '../../../utils/Functions/Helper';
import {screenHeight} from '../../../utils/Data/data';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useGetSubjectMutation} from '../../../reduxToolkit/Services/auth';
import {getSubjectsMutation} from '../../../screens/App/Onboarding/Page/logic';
import CustomToast from '../CustomToast';

const getSubjects = (realm: Realm) => {
  try {
    const savedSubjects = realm.objects(Subject);
    return savedSubjects;
  } catch (err) {
    console.log('fetch subjects error', err);
  }
};

const getUnitGrades = (savedGrades: ResultsType<Grade>) => {
  const ids: string[] = [];
  const newGrades = [];

  savedGrades.forEach((grade: Grade) => {
    if (!ids.includes(grade.id)) {
      newGrades.push(grade);
      ids.push(grade.id);
    }
  });

  return newGrades;
};

const filterKeys = (realm: Realm): string[] => {
  const savedUserData = realm.objects(UserData);
  const filteredArr = PushFavorateToFront(
    savedUserData && savedUserData.length > 0
      ? savedUserData[0].selectedSubjects
      : null,
    getSubjects(realm),
  );

  const studyIds: string[] = [];

  filteredArr.forEach(study => studyIds.push(study.id));

  return studyIds;
};

const ChosenCourses = ({
  setLoginModalVisible,
}: {
  setLoginModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {useQuery, useRealm} = AuthContext;
  const realm = useRealm();

  const savedUserData = useQuery(UserData);
  const savedGrades = useQuery(Grade, savedgrade => {
    return savedgrade.filtered(`id != "${savedUserData[0].grade.id}"`);
  });

  const navigator = useNavigation();
  const [subjectsArray, setSubjectsArray] = useState<subjectType[] | null>(
    null,
  );

  const [getSubject] = useGetSubjectMutation();

  const [showAlert, setShowAlert] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const savedSubjects = getSubjects(realm);
      savedSubjects && savedSubjects.length > 0
        ? setSubjectsArray([...savedSubjects])
        : getSubjectsMutation(getSubject, navigator, realm, setSubjectsArray);
    }, []),
  );
  const renderItem = ({item, index}: {item: string; index: number}) => {
    const subject = realm.objects(Subject).filtered(`id = "${item}"`);
    return (
      <View>
        {subject && subject.length > 0 && subject[0].icon && (
          <ChosenCoursesCard
            subjectId={subject[0].id}
            setLoginModalVisible={setLoginModalVisible}
            timerValue={(index + 1) * 200}
            setShowAlert={setShowAlert}
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
      {showAlert && (
        <CustomToast
          text="There is no study available for this subject, New studies will be
        added soon!"
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          topPosition={screenHeight - (screenHeight + 250)}
        />
      )}

      <Header title="My learning" subTitle="Your Chosen Courses" seeAll />

      {subjectsArray && subjectsArray.length > 0 && (
        <FlatList
          keyExtractor={(item, index) => item + 'my-course' + index}
          data={filterKeys(realm)}
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
            keyExtractor={(item, index) => item.id + 'other' + index}
            data={[
              ...getUnitGrades(savedGrades),
              {id: 'drivingLicenseId', grade: 'Driving Licence'},
            ]}
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
    position: 'relative',
  },
  subContainer: {
    marginTop: screenHeight * 0.01,
  },
});

export default ChosenCourses;
