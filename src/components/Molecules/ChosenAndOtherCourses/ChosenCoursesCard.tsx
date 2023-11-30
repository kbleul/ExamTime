import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {screenHeight, screenWidth} from '../../../utils/Data/data';
import {SvgXml} from 'react-native-svg';

export const onError = (e: Error) => {
  console.log('----------------', e.message);
};

const ChosenCoursesCard: React.FC<{
  title: string;
  lessonsCount: number;
  progress?: number;
  bgImage: any;
}> = ({title, lessonsCount, progress, bgImage}) => {
  // console.log('---//', bgImage.uri);

  return (
    <View
      style={
        progress !== undefined
          ? styles.container
          : [styles.container, styles.containerSecondary]
      }>
      <SvgXml style={styles.imageBg} xml={bgImage.uri} onError={onError} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={
            progress !== undefined
              ? styles.lessons
              : [styles.lessons, styles.lessonsSecondary]
          }>
          {lessonsCount} Lessons
        </Text>

        {progress !== undefined && (
          <>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressBarIndicator, {width: progress + '%'}]} // calculate progress dynamically
              />
            </View>
            <Text style={styles.progressText}>{progress}% completed</Text>
          </>
        )}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    height: screenHeight * (1 / 3.8),
    width: screenWidth * (1 / 2.6),
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: 'hidden',
    maxHeight: 220,
  },
  containerSecondary: {
    height: screenHeight * (1 / 4.5),
    width: screenWidth * (1 / 3),
  },
  imageBg: {
    height: '100%',
    width: screenWidth * (1 / 2.6),
    justifyContent: 'flex-end',
    borderWidth: 4,
    position: 'relative',
  },
  contentContainer: {
    width: screenWidth * (1 / 2.5),
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
  },
  title: {
    color: 'white',
    fontSize: screenWidth * 0.035,
    fontFamily: 'Montserrat-SemiBold',
    paddingBottom: screenHeight * 0.005,
    paddingLeft: 1,
  },
  lessons: {
    width: '80%',
    paddingVertical: screenHeight * 0.003,
    paddingHorizontal: screenWidth * 0.02,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 100,
    color: 'white',
    fontSize: screenWidth * 0.028,
    fontFamily: 'Montserrat-SemiBold',
  },
  lessonsSecondary: {
    width: '80%',
    marginBottom: 5,
  },
  progressBar: {
    width: '80%',
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
    fontSize: screenWidth * 0.03,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5,
    paddingLeft: 2,
  },
});

export default ChosenCoursesCard;
