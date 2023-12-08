import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import {ScaledSheet} from 'react-native-size-matters';
import {screenHeight, screenWidth} from '../../../utils/Data/data';
import {useNavigation} from '@react-navigation/native';
import {Study, Subject, UserData} from '../../../Realm';
import {AuthContext} from '../../../Realm/model';
import {PushFavorateToFront} from '../../../utils/Functions/Helper';
import {RootState} from '../../../reduxToolkit/Store';
import {useSelector} from 'react-redux';
import {calculateProgress, getAllStudies} from './logic';
import {useGetStudyMutation} from '../../../reduxToolkit/Services/auth';
import Toast from 'react-native-toast-message';
import {subjectType} from '../../../types';
import Header from '../../../components/Molecules/ChosenAndOtherCourses/Header';
import {SvgXml} from 'react-native-svg';
import {onError} from '../../../components/Molecules/ChosenAndOtherCourses/ChosenCoursesCard';
import LoginModal from '../../../components/Organisms/LoginModal';

const CourseItem = ({
  item,
  setLoginModalVisible,
  isLoading,
}: {
  item: subjectType;
  setLoginModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}) => {
  const navigator: any = useNavigation();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  const {useQuery} = AuthContext;

  const savedStudies = useQuery(Study, studies => {
    return studies.filtered(
      `subject.id = "${item.id}" OR subject.subject = "${item.subject.subject}"`,
    );
  });
  const progress = calculateProgress(savedStudies) + '%';

  return (
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
        {isLoading ? (
          <View style={[styles.imagebg, styles.imagebgLoading]} />
        ) : (
          <SvgXml style={styles.imagebg} xml={item.icon} onError={onError} />
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.subject}>{item.subject.subject}</Text>
        <Text style={styles.units}>{savedStudies.length} units</Text>
        <Text style={styles.progressText}>completed {progress}</Text>

        <View style={styles.indicatorContainer}>
          <Text style={[styles.indicator, {width: progress}]} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Index = () => {
  const navigation: any = useNavigation();
  const token = useSelector((state: RootState) => state.auth.token);

  const {useRealm, useQuery} = AuthContext;
  const realm = useRealm();

  const savedSubjects = useQuery(Subject);
  const savedUserData = useQuery(UserData);
  const savedStudies = useQuery(Study);

  const [getStudy] = useGetStudyMutation();

  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!savedStudies || savedStudies.length === 0) {
      getAllStudies(getStudy, navigation, token, realm, Toast);
    }
  }, []);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainerTop}>
        <Text style={styles.headerTitle}>Study Section</Text>
      </View>

      <View style={styles.Headercontainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Join the challenge phase and get a structured timeline of tasks to
            help you achieve your study goals!
          </Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('ChallengeScreen')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Start Challenge</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Image source={require('./course.png')} style={styles.image} />
      </View>

      <Header title="My learning" subTitle="Your Chosen Courses" />

      <FlatList
        data={PushFavorateToFront(
          savedUserData[0].selectedSubjects || [],
          savedSubjects,
        )}
        renderItem={({item}) => (
          <CourseItem
            item={item}
            setLoginModalVisible={setLoginModalVisible}
            isLoading={isLoading}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />

      <MainBottomNav />
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
    paddingBottom: 70,
    paddingHorizontal: 10,
    // backgroundColor: 'red',
  },
  loading: {
    paddingTop: screenHeight * 0.1,
  },
  headerContainerTop: {
    paddingHorizontal: screenWidth * 0.02,
  },
  headerTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.065, //28
    color: '#000',
    lineHeight: screenHeight * 0.05, //34
    marginTop: screenWidth * 0.009,
  },
  Headercontainer: {
    marginVertical: 2,
    flexDirection: 'row',
    backgroundColor: '#FFA500',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: '10@ms',
    width: screenWidth - 30,
    height: screenHeight / 6,
    minHeight: 150,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  textContainer: {
    width: '70%',
    alignItems: 'flex-start',
    gap: 10,
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'PoppinsRegular',
    color: '#FFFFFF',
    fontSize: screenWidth * 0.035,
  },
  button: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    overflow: 'hidden',
    paddingHorizontal: screenWidth * 0.05,
    paddingTop: screenWidth * 0.018,
    paddingBottom: screenWidth * 0.01,
  },
  buttonText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    fontFamily: 'PoppinsBold',
    fontSize: screenHeight * 0.017,
  },
  image: {
    width: '40%',
    height: screenHeight / 6 + 45,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },

  lcontainer: {
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 2,
    padding: 2,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  imgContainer: {
    width: '30%',
    height: screenHeight * 0.16,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imagebg: {
    height: '100%',
    width: screenWidth * (1 / 2.6),
    borderRadius: 5,
    overflow: 'hidden',
  },
  imagebgLoading: {
    backgroundColor: '#f5f2f2',
  },
  infoContainer: {
    width: '67%',
    padding: 10,
    backgroundColor: 'white',
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    justifyContent: 'flex-end',
  },
  subject: {
    fontSize: screenWidth * 0.05,
    fontFamily: 'PoppinsSemiBold',
    textTransform: 'capitalize',
    color: '#000',
  },
  units: {
    fontSize: screenWidth * 0.033,
    fontFamily: 'PoppinsSemiBold',
    textTransform: 'capitalize',
    color: '#000',
    paddingVertical: 2,
    paddingTop: 3,
    paddingLeft: 16,
    marginVertical: 8,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#9ED2E3',
    maxWidth: '68%',
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
  progressText: {
    color: '#000',
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.033,
  },
});
export default Index;
