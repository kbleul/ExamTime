import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const ChosenCoursesCard: React.FC<{
  title: string;
  lessonsCount: number;
  progress?: number;
  bgImage: any;
}> = ({title, lessonsCount, progress, bgImage}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBg}
        source={bgImage} // Replace with the correct path to your image
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.lessons}>{lessonsCount} Lessons</Text>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressBarIndicator, {width: progress + '%'}]}
          />
        </View>

        <Text style={styles.progressText}>{progress}% completed</Text>
      </ImageBackground>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    height: screenHeight * (1 / 3.3),
    width: screenWidth * (3.7 / 10),
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  imageBg: {
    height: '100%',
    width: screenWidth * (3.7 / 10),
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    paddingBottom: 6,
  },
  lessons: {
    width: '100%',
    paddingVertical: 4,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 100,
    color: 'black',
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  progressBar: {
    width: '100%',
    height: 5,
    backgroundColor: '#B59F9F',
    borderRadius: 20,
    marginTop: 5,
    overflow: 'hidden',
  },
  progressBarIndicator: {
    height: 5,
    backgroundColor: '#fff',
    borderRadiusLeft: 20,
  },
  progressText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5,
    paddingLeft: 2,
  },
});

export default ChosenCoursesCard;
