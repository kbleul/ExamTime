import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Header from './Header';
import ChosenCoursesCard from './ChosenCoursesCard';
import OtherCoursesCard from './OtherCoursesCard';
import {Subject, UserData} from '../../../Realm';
import {AuthContext} from '../../../Realm/model';
import {subjectType} from '../../../types';
import {PushFavorateToFront} from '../../../utils/Functions/Helper';
import {screenHeight} from '../../../utils/Data/data';

interface CourseItemType {
  id: string;
  grade: number;
  subTitle: string;
  subjectsCount: number;
}

const DummyCourses = [
  {
    id: 'G0011',
    grade: 8,
    subTitle: 'For Reginal Exam Takers',
    subjectsCount: 7,
  },
  {
    id: 'G0012',
    grade: 12,
    subTitle: 'For Natural Science Students',
    subjectsCount: 12,
  },
  {
    id: 'G0013',
    grade: 12,
    subTitle: 'For Social Students',
    subjectsCount: 12,
  },
];

const ChosenCourses = () => {
  const {useQuery} = AuthContext;

  const savedSubjects = useQuery(Subject);
  const savedUserData = useQuery(UserData);

  const renderItem = ({item}: {item: subjectType}) => {
    return (
      <View>
        <ChosenCoursesCard
          title={item.subject.subject}
          lessonsCount={12}
          progress={item.progress}
          bgImage={{uri: item.icon}}
        />
      </View>
    );
  };

  const renderItemCourse = ({item}: {item: CourseItemType}) => {
    return (
      <View>
        <OtherCoursesCard
          grade={item.grade}
          subTitle={item.subTitle}
          subjectsCount={item.subjectsCount}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="My learning" subTitle="Your Chosen Courses" seeAll />

      <FlatList
        keyExtractor={item => item.id}
        data={PushFavorateToFront(
          savedUserData[0].selectedSubjects || [],
          savedSubjects,
        )}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.subContainer}>
        <Header title="Other Courses" />
      </View>

      <FlatList
        keyExtractor={item => item.id}
        data={DummyCourses}
        renderItem={renderItemCourse}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
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
