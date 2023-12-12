import React, {useState} from 'react';
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
    grade: 'grade_6',
    subTitle: 'For Reginal Exam Takers',
    subjectsCount: 7,
  },
  {
    id: 'G0012',
    grade: 'grade_8',
    subTitle: 'For Natural Science Students',
    subjectsCount: 12,
  },
  {
    id: 'G0013',
    grade: 'grade_12_social',
    subTitle: 'For Social Students',
    subjectsCount: 12,
  },
];

const ChosenCourses = ({
  setLoginModalVisible,
}: {
  setLoginModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {useQuery} = AuthContext;

  const savedSubjects = useQuery(Subject);
  const savedUserData = useQuery(UserData);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);

  setTimeout(() => {
    setIsLoadingSubjects(false);
  }, 500);

  const renderItem = ({item}: {item: subjectType}) => {
    return (
      <View>
        <ChosenCoursesCard
          subject={item.subject}
          subjectId={item.id}
          bgImage={{uri: item.icon}}
          setLoginModalVisible={setLoginModalVisible}
          isLoadingSubjects={isLoadingSubjects}
        />
      </View>
    );
  };

  const renderItemCourse = ({
    item,
    index,
  }: {
    item: CourseItemType;
    index: number;
  }) => {
    return (
      <View>
        <OtherCoursesCard
          grade={item.grade}
          subjectsCount={item.subjectsCount}
          index={index}
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
          savedUserData && savedUserData.length > 0
            ? savedUserData[0].selectedSubjects
            : null,
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
        renderItem={({item, index}) => renderItemCourse({item, index})}
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
