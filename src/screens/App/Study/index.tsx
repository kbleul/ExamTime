import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import {ScaledSheet} from 'react-native-size-matters';
import {screenHeight, screenWidth} from '../../../utils/Data/data';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Study, Subject, UserData} from '../../../Realm';
import {AuthContext} from '../../../Realm/model';
import {PushFavorateToFront} from '../../../utils/Functions/Helper';
import {RootState} from '../../../reduxToolkit/Store';
import {useSelector} from 'react-redux';
import {calculateStudyProgress} from './logic';
import Toast from 'react-native-toast-message';
import {subjectType} from '../../../types';
import Header from '../../../components/Molecules/ChosenAndOtherCourses/Header';
import {SvgCss} from 'react-native-svg';
import {onError} from '../../../components/Molecules/ChosenAndOtherCourses/ChosenCoursesCard';
import LoginModal from '../../../components/Organisms/LoginModal';
import {useNavContext} from '../../../context/bottomNav';

const CourseItem = ({
  item,
  setLoginModalVisible,
  isLoading,
  timerValue,
}: {
  item: subjectType;
  setLoginModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  timerValue: number;
}) => {
  const navigator: any = useNavigation();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  const [isLoadingSVG, setIsLoadingSVG] = useState(true);

  const {useQuery} = AuthContext;

  const savedStudies = useQuery(Study, studies => {
    return studies.filtered(
      `subject.id = "${item.id}" OR subject.subject = "${item.subject.subject}"`,
    );
  });
  const progress = calculateStudyProgress(savedStudies);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingSVG(false);
    }, timerValue);
  }, []);

  return (
    <>
      {!isLoadingSVG && (
        <TouchableOpacity
          style={styles.lcontainer}
          onPress={() => {
            if (!user || !token) {
              setLoginModalVisible(true);
              return;
            }

            savedStudies.length > 0 &&
              navigator.navigate('StudyDetails', {
                subject: item.subject,
              });
          }}>
          <View style={styles.imgContainer}>
            {isLoading && isLoadingSVG ? (
              <View style={[styles.imagebg, styles.imagebgLoading]} />
            ) : (
              item.icon && (
                <SvgCss
                  xml={item.icon}
                  style={styles.imagebg}
                  onError={onError}
                />
              )
            )}
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.subject}>{item.subject.subject}</Text>
            <Text style={styles.units}>
              {savedStudies.length} lessons . . .
            </Text>
          </View>

          <View style={styles.circleContainer}>
            <AnimatedCircularProgress
              size={60}
              width={4}
              backgroundWidth={2}
              fill={progress}
              tintColor="#F0E2A1"
              backgroundColor="#000"
              rotation={0}>
              {fill => (
                <View style={styles.progressTextContainer}>
                  <Text style={styles.progressText}>{Math.round(fill)}%</Text>
                </View>
              )}
            </AnimatedCircularProgress>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const Index = () => {
  const navigation: any = useNavigation();
  const {setShowNavigation} = useNavContext();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  const {useQuery} = AuthContext;

  const savedSubjects = useQuery(Subject);
  const savedUserData = useQuery(UserData);

  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 500);

  useFocusEffect(
    useCallback(() => {
      setShowNavigation(true);
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainerTop}>
        <Text style={styles.headerTitle}>Study Section</Text>
        <Text style={styles.welcomeText}>
          Welcome back{user && ', ' + user.firstName}
        </Text>
      </View>

      <View style={styles.Headercontainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Time to shine! Dive into the challenge phase and conquer the
            season's biggest learning adventure.
          </Text>
          <Text style={[styles.text, styles.subText]}>You got this!</Text>
          <TouchableWithoutFeedback
            onPress={() =>
              token
                ? navigation.navigate('ChallengeScreen')
                : setLoginModalVisible(true)
            }>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Start Challenge</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Image
          source={require('../../../assets/Images/courses/studing.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.subjectsContainer}>
        <Header title="Course in progres" />

        <FlatList
          data={PushFavorateToFront(
            savedUserData[0].selectedSubjects || [],
            savedSubjects,
          )}
          renderItem={({item, index}) => (
            <CourseItem
              item={item}
              setLoginModalVisible={setLoginModalVisible}
              isLoading={isLoading}
              timerValue={(index + 1) * 200}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <LoginModal
        loginModalVisible={loginModalVisible}
        setLoginModalVisible={setLoginModalVisible}
      />

      <Toast />
    </View>
  );
};

const styles = ScaledSheet.create({
  backicon: {
    marginTop: '25@ms',
  },

  container: {
    flex: 1,
    width: screenWidth,
    backgroundColor: '#F9FCFF',
    paddingTop: 40,
    paddingBottom: screenHeight * 0.048,
    // backgroundColor: 'red',
  },
  loading: {
    paddingTop: screenHeight * 0.1,
    paddingHorizontal: 10,
  },
  headerContainerTop: {
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.065, //28
    color: '#000',
    lineHeight: screenHeight * 0.05, //34
    marginTop: screenWidth * 0.009,
  },
  welcomeText: {
    fontFamily: 'PoppinsLight',
    fontSize: screenWidth * 0.045, //28
    color: '#C1C2C6',
    lineHeight: screenHeight * 0.04, //34
  },
  Headercontainer: {
    marginVertical: 2,
    flexDirection: 'row',
    backgroundColor: '#F0E2A1',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: '10@ms',
    width: screenWidth - 15,
    minHeight: 150,
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
    position: 'relative',
  },
  textContainer: {
    width: '80%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'PoppinsMedium',
    color: '#000',
    fontSize: screenWidth * 0.035,
    lineHeight: screenWidth * 0.054,
    paddingLeft: 10,
  },
  subText: {
    textAlign: 'center',
    width: '90%',
    lineHeight: screenWidth * 0.054,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    overflow: 'hidden',
    paddingHorizontal: screenWidth * 0.076,
    paddingTop: screenWidth * 0.013,
    paddingBottom: screenWidth * 0.006,
    marginRight: screenWidth * 0.07,
  },
  buttonText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontFamily: 'PoppinsMedium',
    fontSize: screenHeight * 0.018,
  },
  image: {
    width: '40%',
    height: screenHeight / 6 + 40,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
    bottom: -10,
  },
  subjectsContainer: {
    paddingHorizontal: 15,
    marginBottom: 240,
  },
  lcontainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 15,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    backgroundColor: 'white',
    maxHeight: screenHeight * 0.14,
    overflow: 'hidden',
  },
  imgContainer: {
    width: '27%',
    height: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  imagebg: {
    height: '100%',
    width: screenWidth * (1 / 2.6),
    borderRadius: 15,

    overflow: 'hidden',
  },
  imagebgLoading: {
    backgroundColor: '#f5f2f2',
  },
  infoContainer: {
    width: '50%',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    justifyContent: 'flex-end',
  },
  subject: {
    fontSize: screenWidth * 0.04,
    fontFamily: 'PoppinsRegular',
    textTransform: 'capitalize',
    color: '#000',
  },
  units: {
    fontSize: screenWidth * 0.033,
    fontFamily: 'PoppinsRegular',
    color: '#000',
  },
  indicatorContainer: {
    width: '100%',
    height: 6,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#e8e6e6',
  },
  indicator: {
    height: 6,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    backgroundColor: '#6067B3',
  },
  progressTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  progressText: {
    fontSize: screenWidth * 0.042,
    fontFamily: 'PoppinsMedium',
    color: '#F0E2A1',
  },
  circleContainer: {
    backgroundColor: '#000',
    width: 60,
    height: 60,
    borderRadius: 100,
    marginRight: 10,
  },
});
export default Index;
