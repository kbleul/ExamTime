import React from 'react';
import {Dimensions, StyleSheet, Text, View, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const OtherCoursesCard: React.FC<{
  grade: string | number;
  subjectsCount: number;
  isOnboarding?: boolean;
  onPress?: () => void;
  index?: number;
}> = ({grade, subjectsCount, isOnboarding, onPress, index}) => {
  const useStyle = isOnboarding ? stylesSecondary : styles;
  return (
    <View style={useStyle.container}>
      <Text style={useStyle.title}> {grade}</Text>
      <TouchableOpacity touchSoundDisabled onPress={onPress}>
        <Text
          style={
            index && index % 2 === 0
              ? [useStyle.courses, useStyle.coursesSecondary]
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
    height: screenHeight * (1 / 6.5),
    maxHeight: 120,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    justifyContent: 'space-evenly',
  },
  title: {
    color: 'black',
    fontSize: screenWidth * 0.035,
    fontFamily: 'Montserrat-SemiBold',
    paddingBottom: 3,
    textTransform: 'uppercase',
    marginBottom: 10,
  },

  courses: {
    width: Platform.OS === 'ios' ? '95%' : '100%',
    borderRadius: Platform.OS === 'ios' ? 10 : 30,
    overflow: 'hidden',
    color: 'white',
    fontSize: screenWidth * 0.028,
    fontFamily: 'Montserrat-SemiBold',
    paddingVertical: 8,
    backgroundColor: '#0F6098',
    textAlign: 'center',
  },
  coursesSecondary: {
    backgroundColor: '#37A9B3',
  },
});

export const stylesSecondary = StyleSheet.create({
  container: {
    width: '38%',
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
  },
  title: {
    color: 'black',
    fontSize: screenWidth * 0.028,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 6,
    textTransform: 'uppercase',
    paddingHorizontal: 4,
  },
  subTitle: {
    color: 'black',
    fontSize: screenWidth * 0.025,
    fontFamily: 'Montserrat-Regular',
    marginVertical: 4,
    paddingVertical: 2,
  },
  courses: {
    width: '90%',
    marginLeft: '5%',
    borderRadius: 30,
    overflow: 'hidden',
    color: 'white',
    fontSize: screenWidth * 0.025,
    fontFamily: 'Montserrat-SemiBold',
    paddingVertical: 6,
    backgroundColor: '#0F6098',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  coursesSecondary: {
    backgroundColor: '#37A9B3',
  },
});
export default OtherCoursesCard;
