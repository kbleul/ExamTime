import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Header from './Header';
import ChosenCoursesCard from './ChosenCoursesCard';
import img1 from '../../../assets/Images/home/s1.png';
import img2 from '../../../assets/Images/home/s2.png';
import img3 from '../../../assets/Images/home/s3.png';
import img4 from '../../../assets/Images/home/s4.png';
import img5 from '../../../assets/Images/home/s5.png';
import OtherCoursesCard from './OtherCoursesCard';

interface SubjectItemType {
  id: string;
  title: string;
  lessonsCount: number;
  progress?: number;
  bgImage: any;
}

interface CourseItemType {
  id: string;
  grade: number;
  subTitle: string;
  subjectsCount: number;
}

const DummySubjects = [
  {
    id: '0011',
    title: 'SAT',
    lessonsCount: 12,
    progress: 80,
    bgImage: img1,
  },
  {
    id: '0012',
    title: 'Physics',
    lessonsCount: 12,
    progress: 80,
    bgImage: img2,
  },
  {
    id: '0013',
    title: 'Civics',
    lessonsCount: 12,
    progress: 80,
    bgImage: img3,
  },
  {
    id: '0014',
    title: 'Biology',
    lessonsCount: 12,
    progress: 80,
    bgImage: img4,
  },
  {
    id: '0015',
    title: 'MAth',
    lessonsCount: 12,
    progress: 80,
    bgImage: img5,
  },
];

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
  const renderItem = ({
    item,
    index,
  }: {
    item: SubjectItemType;
    index: number;
  }) => {
    return (
      <View>
        <ChosenCoursesCard
          title={item.title}
          lessonsCount={item.lessonsCount}
          progress={item.progress}
          bgImage={item.bgImage}
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
          subTitle={item.subTitle}
          subjectsCount={item.subjectsCount}
        />
      </View>
    );
  };

  return (
    <View>
      <Header title="My learning" subTitle="Your Chosen Courses" seeAll />

      <FlatList
        keyExtractor={item => item.id}
        data={DummySubjects}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Header title="Other Courses" />

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
  scrollContaier: {
    width: '100%',
  },
});

export default ChosenCourses;
