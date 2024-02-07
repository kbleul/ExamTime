import React, {memo, useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {screenHeight, screenWidth} from '../../../utils/Data/data';
import {SvgXml} from 'react-native-svg';
import {calculateStudyProgress} from '../../../screens/App/Study/logic';
import {AuthContext} from '../../../Realm/model';
import {Study} from '../../../Realm';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';
import {useNavigation} from '@react-navigation/native';
import {useNavContext} from '../../../context/bottomNav';
import {getRealmSubject} from '../../../utils/Functions/Get';

const getFilteredSavedStudies = (
  realm: Realm,
  subjectId: string,
  subjectName: string,
): ResultsType<Study> => {
  const savedStudies = realm
    .objects(Study)
    .filtered(
      `subject.id = "${
        subjectId ? subjectId : 0
      }" OR subject.subject = "${subjectName}"`,
    );

  return savedStudies;
};

export const onError = (e: Error) => {
  console.log('Render svg failed', e.message);
};

const ChosenCoursesCard: React.FC<{
  subjectId: string | null | undefined;
  setLoginModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  timerValue?: number;
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({subjectId, setLoginModalVisible, timerValue, setShowAlert}) => {
  const navigator: any = useNavigation();
  const {setShowNavigation} = useNavContext();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const {useRealm} = AuthContext;
  const realm = useRealm();

  const subject = getRealmSubject(subjectId, realm);

  const [savedStudies, setSavedStudies] = useState([]);

  const calProgress = calculateStudyProgress(savedStudies);
  const [isLoadingSVG, setIsLoadingSVG] = useState(timerValue ? true : false);

  useEffect(() => {
    if (timerValue) {
      setTimeout(() => {
        setIsLoadingSVG(false);
      }, timerValue);
    }
  }, []);
  useEffect(() => {
    if (subject && subject.length > 0) {
      user
        ? setTimeout(() => {
            setSavedStudies(
              subject[0]?.subject &&
                subject[0]?.subject?.subject &&
                getFilteredSavedStudies(
                  realm,
                  subject[0]?.id,
                  subject[0]?.subject?.subject,
                ),
            );
          }, 4000)
        : setSavedStudies(
            subject[0]?.subject &&
              subject[0]?.subject?.subject &&
              getFilteredSavedStudies(
                realm,
                subject[0]?.id,
                subject[0]?.subject?.subject,
              ),
          );
    }
  }, [realm, user, subjectId]);

  return (
    <>
      {!isLoadingSVG && (
        <TouchableOpacity
          style={
            timerValue !== undefined
              ? styles.container
              : [styles.container, styles.containerSecondary]
          }
          onPress={() => {
            if (subjectId) {
              if (!user || !token) {
                setLoginModalVisible && setLoginModalVisible(true);
                return;
              }

              if (savedStudies.length > 0 && subject && subject.length > 0) {
                navigator.navigate('Study', {
                  screen: 'StudyDetails',
                  params: {subject: subject[0]?.subject},
                });
                setShowNavigation(false);
                return;
              }

              if (setShowAlert) {
                setShowAlert(true);

                setTimeout(() => setShowAlert(false), 3500);
              }
            }
          }}>
          <RenderSvg bgImage={subject[0].icon ? subject[0].icon : ''} />

          <View style={styles.contentContainer}>
            <Text style={styles.title}>{subject[0]?.subject?.subject}</Text>
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
                    style={[
                      styles.progressBarIndicator,
                      {
                        width:
                          calProgress > 100 ? 100 + '%' : calProgress + '%',
                      },
                    ]} // calculate progress dynamically
                  />
                </View>
                <Text style={styles.progressText}>
                  {calProgress > 100 ? 100 + '%' : calProgress + '%'} completed
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const RenderSvg = ({bgImage}: {bgImage: string}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <></>
  ) : (
    <SvgXml style={styles.imageBg} xml={bgImage} onError={onError} />
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
    backgroundColor: '#8edcf5',
  },
  containerSecondary: {
    height: screenHeight * (1 / 3.8),
    width: screenWidth * (1 / 3),
    maxHeight: 220,
    overflow: 'hidden',
    backgroundColor: '#f5f2f2',
  },
  containerLoading: {
    backgroundColor: '#f5f2f2',
    height: screenHeight * (1 / 3.8),
    width: screenWidth * (1 / 2.6),
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: 'hidden',
    maxHeight: 220,
  },
  containerSecondaryLoading: {
    height: screenHeight * (1 / 3.8),
    width: screenWidth * (1 / 3),
    maxHeight: 220,
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
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    overflow: Platform.OS === 'ios' ? 'hidden' : 'visible',
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
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
  },
  progressText: {
    color: 'white',
    fontSize: screenWidth * 0.03,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5,
    paddingLeft: 2,
  },
  alertCOntainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});

export default memo(ChosenCoursesCard);
