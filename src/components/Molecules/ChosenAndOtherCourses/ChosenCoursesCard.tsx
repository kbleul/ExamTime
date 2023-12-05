import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {screenHeight, screenWidth} from '../../../utils/Data/data';
import {SvgXml} from 'react-native-svg';
import {calculateProgress} from '../../../screens/App/Study/logic';
import {AuthContext} from '../../../Realm/model';
import {Study} from '../../../Realm';

export const onError = (e: Error) => {
  console.log('----------------', e.message);
};

const ChosenCoursesCard: React.FC<{
  title: string;
  lessonsCount: number;
  subjectId?: string;
  bgImage: any;
}> = ({title, lessonsCount, subjectId, bgImage}) => {
  const {useQuery} = AuthContext;

  const savedStudies = useQuery(Study, studies => {
    return studies.filtered(
      `subject.id = "${
        subjectId ? subjectId : 0
      }" OR subject.subject = "${title}"`,
    );
  });
  const calProgress = calculateProgress(savedStudies) + '%';

  return (
    <View
      style={
        subjectId !== undefined
          ? styles.container
          : [styles.container, styles.containerSecondary]
      }>
      <SvgXml style={styles.imageBg} xml={bgImage.uri} onError={onError} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={
            subjectId !== undefined
              ? styles.lessons
              : [styles.lessons, styles.lessonsSecondary]
          }>
          {lessonsCount} Lessons
        </Text>

        {subjectId !== undefined && (
          <>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressBarIndicator, {width: calProgress}]} // calculate progress dynamically
              />
            </View>
            <Text style={styles.progressText}>{calProgress} completed</Text>
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
    overflow: 'hidden',
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
    overflow: 'hidden',
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
