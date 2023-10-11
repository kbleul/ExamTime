import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const OtherCoursesCard: React.FC<{
  grade: number;
  subTitle: string;
  subjectsCount: number;
}> = ({grade, subTitle, subjectsCount}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grade - {grade}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
      <Text
        style={
          grade === 8 ? [styles.courses, styles.coursesEight] : styles.courses
        }>
        {subjectsCount} Subjects
      </Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    width: screenWidth * (5 / 10),
    height: screenHeight * (1 / 6.5),
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    paddingBottom: 3,
  },
  subTitle: {
    color: 'black',
    fontSize: 12.5,
    fontFamily: 'Montserrat-Regular',
    marginTop: 2,
    height: 36,
  },
  courses: {
    width: '100%',
    borderRadius: 30,
    color: 'white',
    fontSize: 12.5,
    fontFamily: 'Montserrat-SemiBold',
    paddingVertical: 8,
    backgroundColor: '#0F6098',
    textAlign: 'center',
  },
  coursesEight: {
    backgroundColor: '#37A9B3',
  },
});

export default OtherCoursesCard;
