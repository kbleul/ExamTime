import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Header from './Header';
import ChosenCoursesCard from './ChosenCoursesCard';
import OtherCoursesCard from './OtherCoursesCard';
import {Grade, Subject, UserData} from '../../../Realm';
import {AuthContext} from '../../../Realm/model';
import {subjectType} from '../../../types';
import {PushFavorateToFront} from '../../../utils/Functions/Helper';
import {screenHeight, screenWidth} from '../../../utils/Data/data';
import {useNavigation} from '@react-navigation/native';
import {useGetSubjectMutation} from '../../../reduxToolkit/Services/auth';
import {getSubjectsMutation} from '../../../screens/App/Onboarding/Page/logic';

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
  }, 2300);

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
            timerValue={(index + 1) * 400}
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

  const renderItemLoading = () => {
    return (
      <View
        style={[styles.containerLoading, styles.containerSecondaryLoading]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title="My learning" subTitle="Your Chosen Courses" seeAll />

      {!isLoadingSubjects && subjectsArray && subjectsArray.length > 0 && (
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

      {isLoadingSubjects && (
        <FlatList
          keyExtractor={(item, index) => 'my-course-loading' + index}
          data={Array.from({length: 6})}
          renderItem={renderItemLoading}
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
              ...savedGrades,
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
  },
  subContainer: {
    marginTop: screenHeight * 0.01,
  },
  containerLoading: {
    backgroundColor: '#f5f2f2',
    height: screenHeight * (1 / 3.8),
    width: screenWidth * (1 / 2.6),
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: 'hidden',
    maxHeight: 220,
  },
  containerSecondaryLoading: {
    height: screenHeight * (1 / 3.8),
    width: screenWidth * (1 / 3),
    maxHeight: 220,
    overflow: 'hidden',
  },
});

export default ChosenCourses;
