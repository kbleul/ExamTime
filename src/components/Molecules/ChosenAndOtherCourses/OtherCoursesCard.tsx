import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const OtherCoursesCard: React.FC<{
  grade: number;
  subTitle: string;
  subjectsCount: number;
  isOnboarding?: boolean;
  onPress?: () => void;
}> = ({grade, subTitle, subjectsCount, isOnboarding, onPress}) => {
  const useStyle = isOnboarding ? stylesSecondary : styles;
  return (
    <View style={useStyle.container}>
      <Text style={useStyle.title}>Grade - {grade}</Text>
      <Text style={useStyle.subTitle}>{subTitle}</Text>
      <TouchableOpacity touchSoundDisabled onPress={onPress}>
        <Text
          style={
            grade === 8
              ? [useStyle.courses, useStyle.coursesEight]
              : useStyle.courses
          }>
          {subjectsCount} Subjects
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    width: screenWidth * (5 / 10),
    height: screenHeight * (1 / 5.5),
    marginHorizontal: 5,
    marginBottom: 10,
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

export const stylesSecondary = StyleSheet.create({
  container: {
    width: '45%',
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 15,
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
    marginVertical: 4,
    paddingVertical: 2,
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
