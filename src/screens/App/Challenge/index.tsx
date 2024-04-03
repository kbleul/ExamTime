import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {screenHeight, screenWidth} from '../../../utils/Data/data';
import {ScrollView} from 'react-native-gesture-handler';
import WeeksScreen from '../../../components/Organisms/WeeksScreen';
import WeekDaysScreen from '../../../components/Organisms/WeekDaysScreen';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import CircleProgressIndicator from '../../../components/Molecules/CircleProgressIndicator';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UnitCardWithAccordion from '../../../components/Organisms/UnitCardWithAccordion';
import {Challange, Study} from '../../../Realm';
import {AuthContext} from '../../../Realm/model';
import {
  useGetChallengesMutation,
  useSaveChallengeProgressMutation,
} from '../../../reduxToolkit/Services/auth';
import {compareDayToCurrentDay, fetchChallenges} from './logic';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';
import Loading from '../../../components/Atoms/Loading';
import MessageBox from '../../../components/Atoms/MessageBox';
import {useNavContext} from '../../../context/bottomNav';

const Index = () => {
  const navigator: any = useNavigation();
  const navigationState = useNavigationState(state => state);

  const currentScreen = navigationState.routes[navigationState.index].name;
  const token = useSelector((state: RootState) => state.auth.token);
  const {setShowNavigation} = useNavContext();

  const [isPending, setIsPending] = useState(true);
  const [getChallenges, {isLoading}] = useGetChallengesMutation();
  const [saveChallengeProgress] = useSaveChallengeProgressMutation();

  const {useRealm, useQuery} = AuthContext;
  const savedChallenges = useQuery(Challange);

  const realm = useRealm();

  useEffect(() => {
    const backAction = () => {
      navigator.navigate('StudySection');
      setShowNavigation(true);

      return true;
    };

    let backHandler: any;

    if (currentScreen === 'ChallengeScreen') {
      backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
    } else {
      backHandler && backHandler.remove();
    }

    // Clean up the event listener when the component is unmounted
    return () => {
      if (backHandler) {
        backHandler.remove();
      }
    };
  }, []);

  useEffect(() => {
    savedChallenges && savedChallenges.length > 0
      ? fetchChallenges(
          getChallenges,
          token,
          setIsPending,
          navigator,
          realm,
          savedChallenges[0].id,
          saveChallengeProgress,
        )
      : fetchChallenges(
          getChallenges,
          token,
          setIsPending,
          navigator,
          realm,
          null,
          saveChallengeProgress,
        );
  }, []);

  if (isLoading || isPending) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Loading />
      </View>
    );
  }

  if (!savedChallenges || savedChallenges.length === 0) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <MessageBox
          title="No challenges have been posted yet!"
          subTitle="More challenges are coming soon."
        />
        <TouchableOpacity
          touchSoundDisabled
          style={styles.backBtn}
          onPress={() => navigator.goBack()}>
          <AntDesign name="arrowleft" size={27} color="#000" />
          <Text style={styles.backBtnText}>Study</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          touchSoundDisabled
          style={styles.headerContainerTop}
          onPress={() => navigator.goBack()}>
          <AntDesign name="left" size={screenWidth * 0.05} color="#000" />
          <Text style={styles.headerTitle}>Challenge phase</Text>
        </TouchableOpacity>

        <View style={styles.Headercontainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Join the challenge phase and get a structured timeline of tasks to
              help you achieve your study goals!
            </Text>
          </View>
          <CircleProgressIndicator progress={50} isDark={true} />
        </View>

        <WeeksScreen />
        <WeekDaysScreen />

        <ChallangeStudies />
      </ScrollView>
    </View>
  );
};

const ChallangeStudies = () => {
  const {useQuery} = AuthContext;

  const savedChallenges = useQuery(Challange);

  const challengeDay = savedChallenges[0].challengeDay.find(
    day =>
      day?.scheduledDate && compareDayToCurrentDay(day?.scheduledDate) === true,
  );

  const savedChallengeStudies = useQuery(Study, study => {
    const singleChallengeParams = challengeDay?.singleChallenge.map(
      challenge => {
        const unit = challenge.unit;
        const section = challenge.section;
        const subject = challenge.subject?.subject;

        return `unit = "${unit}" AND section = "${section}" AND subject.subject = "${subject}"`;
      },
    );
    const queryCondition = singleChallengeParams?.join(' OR ');
    const unknown = 'unknown';

    return study.filtered(
      queryCondition
        ? queryCondition
        : `unit = "${unknown}" AND section = "${unknown}" AND subject.subject = "${unknown}"`,
    );
  });

  const [showAccordianId, setShowAccordianId] = useState<string | null>(null);

  if (challengeDay && challengeDay.rest) {
    return (
      <MessageBox
        title="Today is your rest day !"
        subTitle="Power down tonight, power up with Exam Time tomorrow! Study smarter, not longer."
      />
    );
  }

  if (!savedChallengeStudies) {
    return <Text>No studies found for this challenge</Text>;
  }

  return (
    <View>
      {savedChallengeStudies.map((study, index) => (
        <UnitCardWithAccordion
          key={study.id + '--' + index}
          study={study}
          showAccordianId={showAccordianId}
          setShowAccordianId={setShowAccordianId}
          showSubject={true}
          isChallenge={true}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F9FCFF',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  backBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  backBtnText: {
    color: '#000',
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.045,
    marginLeft: 7,
  },
  headerContainerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  headerTitle: {
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.06, //28
    color: '#000',
    lineHeight: screenHeight * 0.05, //34
    marginTop: screenWidth * 0.009,
    marginLeft: 10,
  },
  Headercontainer: {
    marginVertical: 2,
    flexDirection: 'row',
    backgroundColor: '#F0E2A1',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: screenWidth - 20,
    height: screenHeight / 6,
    minHeight: 150,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 10,
  },
  textContainer: {
    width: '80%',
    alignItems: 'flex-start',
    gap: 4,
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'PoppinsMedium',
    color: '#000',
    fontSize: screenWidth * 0.037,
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
});

export default Index;
