import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {gradesImages} from '../../../utils/Data/data';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const OtherCoursesCard: React.FC<{
  grade: string;
  subjectsCount: number;
  isOnboarding?: boolean;
  onPress?: () => void;
  index: number;
}> = ({grade, subjectsCount, isOnboarding, onPress, index}) => {
  const useStyle = isOnboarding ? stylesSecondary : styles;

  return (
    <View style={useStyle.container}>
      {grade !== 'Driving Licence' && (
        <View style={useStyle.imageContainer}>
          <View style={isOnboarding && stylesSecondary.whiteBg} />
          <Image
            style={
              index === 1 ? [useStyle.image, {width: '100%'}] : useStyle.image
            }
            source={gradesImages[index] ? gradesImages[index] : gradesImages[0]}
          />
          {isOnboarding && <View style={stylesSecondary.whiteBgBottom} />}
        </View>
      )}

      {grade === 'Driving Licence' && (
        <Image style={styles.drivingImage} source={gradesImages[100]} />
      )}

      <View
        style={
          grade === 'Driving Licence'
            ? [useStyle.contentContainer, styles.contentContainerDriving]
            : useStyle.contentContainer
        }>
        <View style={useStyle.contentTextContainer}>
          <Text style={useStyle.title}> {grade}</Text>
          {grade !== 'Driving Licence' && (
            <Text style={useStyle.subTitle}>
              {' '}
              {grade.includes('12') ? 'National' : 'Reginal'} Exam{' '}
              {isOnboarding && 'Taker'}
            </Text>
          )}
        </View>
        {grade !== 'Driving Licence' && (
          <TouchableOpacity touchSoundDisabled onPress={onPress}>
            <Text style={useStyle.coursesSecondary}>
              {subjectsCount} Subjects
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    width: screenWidth * (2 / 3),
    height: screenHeight * (1 / 5.5),
    maxHeight: 120,
    marginHorizontal: 5,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    overflow: 'visible',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 9,
    paddingLeft: 4,
    position: 'relative',
  },
  imageContainer: {
    width: '40%',
    position: 'relative',
    overflow: 'visible',
    zIndex: 5,
  },
  image: {
    width: '100%',
    maxHeight: screenHeight * (1 / 5.8),
    position: 'absolute',
    top: -9,
    zIndex: 10,
  },
  drivingImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '90%',
    height: '80%',
  },
  contentContainer: {
    width: '60%',
    justifyContent: 'center',
    paddingLeft: 3,
  },
  contentContainerDriving: {
    paddingLeft: screenHeight * 0.02,
    paddingTop: screenWidth * 0.06,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  contentTextContainer: {},
  title: {
    color: 'black',
    fontSize: screenWidth * 0.032,
    fontFamily: 'PoppinsSemiBold',
    textTransform: 'uppercase',
  },
  subTitle: {
    color: 'black',
    fontSize: screenWidth * 0.03,
    fontFamily: 'PoppinsMedium',
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
    color: 'white',
    fontSize: screenWidth * 0.025,
    fontFamily: 'PoppinsMedium',
    paddingTop: 5,
    paddingBottom: 3,
    overflow: 'hidden',
    borderRadius: 50,
    width: '60%',
    textAlign: 'center',
  },
});

export const stylesSecondary = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    height: screenHeight * (1 / 6.8),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#AE9B9B',
    backgroundColor: '#fff',
    overflow: 'visible',
    marginTop: 16,
    marginBottom: 5,
  },
  imageContainer: {
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'visible',
  },
  whiteBg: {
    width: 80,
    height: screenHeight * (1 / 8),
    position: 'absolute',
    top: -12,
    zIndex: 5,
    backgroundColor: '#fff',
  },
  whiteBgBottom: {
    width: '90%',
    marginLeft: 20,
    height: 12,
    position: 'absolute',
    bottom: -14,
    backgroundColor: '#fff',
    zIndex: 50,
  },
  image: {
    width: '70%',
    marginLeft: '10%',
    maxHeight: screenHeight * (1 / 6.5),
    position: 'absolute',
    top: -4,
    zIndex: 40,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '65%',
    paddingRight: 7,
  },
  contentTextContainer: {
    width: '60%',
  },
  title: {
    color: 'black',
    fontSize: screenWidth * 0.03,
    fontFamily: 'PoppinsSemiBold',
    textTransform: 'uppercase',
  },
  subTitle: {
    color: 'black',
    fontSize: screenWidth * 0.03,
    fontFamily: 'PoppinsRegular',
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
    color: 'white',
    fontSize: screenWidth * 0.025,
    fontFamily: 'PoppinsRegular',
    paddingHorizontal: 9,
    paddingTop: 10,
    paddingBottom: 8,
    overflow: 'hidden',
    borderRadius: 10,
  },
});
export default OtherCoursesCard;
