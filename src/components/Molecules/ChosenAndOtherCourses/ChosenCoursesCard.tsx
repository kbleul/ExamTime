import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {screenHeight, screenWidth} from '../../../utils/Data/data';
import {SvgXml} from 'react-native-svg';
import {calculateProgress} from '../../../screens/App/Study/logic';
import {AuthContext} from '../../../Realm/model';
import {Study} from '../../../Realm';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';
import {useNavigation} from '@react-navigation/native';

export const onError = (e: Error) => {
  console.log('----------------', e.message);
};

const ChosenCoursesCard: React.FC<{
  subject: any;
  subjectId?: string;
  bgImage: any;
  setLoginModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({subject, subjectId, bgImage, setLoginModalVisible}) => {
  const navigator: any = useNavigation();

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const {useQuery} = AuthContext;

  const savedStudies = useQuery(Study, studies => {
    return studies.filtered(
      `subject.id = "${subjectId ? subjectId : 0}" OR subject.subject = "${
        subject.subject
      }"`,
    );
  });
  const calProgress = calculateProgress(savedStudies) + '%';

  return (
    <TouchableOpacity
      style={
        subjectId !== undefined
          ? styles.container
          : [styles.container, styles.containerSecondary]
      }
      onPress={() => {
        if (!user || !token) {
          setLoginModalVisible && setLoginModalVisible(true);
          return;
        }

        savedStudies.length > 0 &&
          navigator.navigate('StudyDetails', {
            subject: subject,
          });
      }}>
      <SvgXml style={styles.imageBg} xml={bgImage.uri} onError={onError} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{subject.subject}</Text>
        <Text
          style={
            subjectId !== undefined
              ? styles.lessons
              : [styles.lessons, styles.lessonsSecondary]
          }>
          {savedStudies.length} Lessons
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
    </TouchableOpacity>
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
    overflow: 'hidden',
  },
  imageBg: {
    height: '100%',
    width: screenWidth * (1 / 2.6),
    justifyContent: 'flex-end',
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
