import {Exam, UserData, UserExamAnswers} from '../Realm';
import {logoutSuccess} from '../reduxToolkit/Features/auth/authSlice';
import {
  useGetExamAnswersMutation,
  useGetTrialStatusMutation,
  useGetTrialTimesMutation,
  useGetUserSubscriptionMutation,
} from '../reduxToolkit/Services/auth';
import {examType} from '../types';
import {LocalObjectDataKeys, STATUSTYPES} from '../utils/Data/data';
import {calculateDateDifference} from '../screens/App/Onboarding/Logic';
import {checkIsOnline, removeRealmUserData} from '../utils/Functions/Helper';

type ExamAnswersMutationFn = ReturnType<typeof useGetExamAnswersMutation>[0];
type getTrialMutationFn = ReturnType<typeof useGetTrialStatusMutation>[0];
type getUserSubscriptionMutationFn = ReturnType<
  typeof useGetUserSubscriptionMutation
>[0];
type GetTrialDaytsMutationFn = ReturnType<typeof useGetTrialTimesMutation>[0];

type responseType = {
  id: string;
  examDate: string;
  examId: examType;
  userAnswers: {
    [id: string]: 'A' | 'B' | 'C' | 'D';
  }[];
};
export const getExamAnswersFromDB = async (
  getExamAnswers: ExamAnswersMutationFn,
  token: string | null,
  realm: Realm,
) => {
  if (token) {
    try {
      const response: any = await getExamAnswers({
        token,
      }).unwrap();

      const answers: responseType[] = response?.examResult;
      saveDataToRealm(answers, realm);
    } catch (error) {
      console.error(error);
    }
  }
};

const saveDataToRealm = (ansersFromDB: responseType[], realm: Realm) => {
  // Use the retrieved data

  if (ansersFromDB && ansersFromDB.length > 0) {
    for (const exam of ansersFromDB) {
      const savedExamObject = realm
        .objects(Exam)
        .filtered(`id = "${exam.examId.id}"`);

      // Convert Realm objects to regular JavaScript objects
      const savedExam = Array.from(savedExamObject);

      const userAnswersObject: UserExamAnswers[] = [];

      //check if sync is unnecessary
      if (
        savedExam.length > 0 &&
        savedExam[0].isExamTaken === false &&
        savedExam[0].examQuestion &&
        savedExam[0].examQuestion.length > 0
      ) {
        for (const [useAnserIndex, userAnswer] of exam.userAnswers.entries()) {
          const userAnswerKey = Object.keys(userAnswer)[0];
          const foundQuestion = savedExam[0].examQuestion.find(
            question => question.id === userAnswerKey,
          );

          if (foundQuestion) {
            try {
              realm.write(() => {
                const newUserAnswer: UserExamAnswers = realm.create(
                  LocalObjectDataKeys.UserExamAnswers,
                  {
                    id: foundQuestion.id,
                    index: useAnserIndex,
                    userAnswer: userAnswer[userAnswerKey],
                    correctAnswer: foundQuestion.answer,
                  },
                );
                userAnswersObject.push(newUserAnswer);
              });
            } catch (err) {
              console.error(
                'Error creaating exam answers on get syned data',
                err,
              );
            }
          }
        }
      }

      if (userAnswersObject.length > 0) {
        try {
          realm.write(() => {
            realm.create(LocalObjectDataKeys.ExamAnswers, {
              examId: savedExamObject[0].id,
              examDate: exam.examDate,
              userExamAnswers: userAnswersObject,
              timeStamp: new Date(),
            });

            savedExamObject[0].isExamTaken = true;
            savedExam[0].lastTaken = new Date();
          });
        } catch (err) {}
      }
    }
  }
};

export const checkTrialStatus = async (
  getTrialStatus: getTrialMutationFn,
  token: string,
  setUserStatus: any,
  navigation: any,
  dispatch: any,
  realm: Realm,
) => {
  if (token) {
    try {
      const result = await getTrialStatus({
        token,
      });
      result.error &&
        logoutUnAuthorizedUser(
          result.error,
          setUserStatus,
          dispatch,
          realm,
          navigation,
        );
    } catch (error: any) {
      console.log('Error checking trial version status. ', error);
      logoutUnAuthorizedUser(error, setUserStatus, dispatch, realm, navigation);
    }
  }
};

export const logoutUnAuthorizedUser = (
  error: any,
  setUserStatus: any,
  dispatch: any,
  realm: Realm,
  navigation: any,
) => {
  setTimeout(() => {
    if (
      (error.status && error.status === 401) ||
      (error.data &&
        error.data.tokenExpired &&
        error.data.tokenExpired &&
        error.data.tokenExpired)
    ) {
      dispatch(logoutSuccess());
      const savedUserData = realm.objects(UserData);

      removeRealmUserData(realm, savedUserData, true);

      const savedUser = realm.objects(UserData);

      if (savedUser && savedUser[0]) {
        calculateDateDifference(savedUser[0].initialDate) >
        savedUser[0].allowedTrialDays
          ? setUserStatus(STATUSTYPES.NotAuthorized)
          : setUserStatus(STATUSTYPES.Trial);
      }

      navigation.navigate('Login');
    }
  }, 1000);
};

export const updateTrialDayLength = async (
  getTrialTimes: GetTrialDaytsMutationFn,
  realm: Realm,
) => {
  const isConnected = await checkIsOnline();
  if (isConnected) {
    try {
      const responseTrial: any = await getTrialTimes({}).unwrap();

      if (
        responseTrial &&
        responseTrial.guestUserDuration &&
        responseTrial.unsubscribedUserDuration
      ) {
        const totalTrialTime: number = responseTrial.guestUserDuration.duration;
        const totalTrialTime_afterLogin: number =
          responseTrial.unsubscribedUserDuration.duration;

        try {
          realm.write(() => {
            const savedUser = realm.objects(UserData);

            if (savedUser && savedUser[0]) {
              savedUser[0].allowedTrialDays = totalTrialTime;
              savedUser[0].allowedTrialDays_AfterLogin =
                totalTrialTime_afterLogin;
            }
          });
        } catch (error) {
          console.log('error updating trial duration ---> ', error);
        }
      }
    } catch (err) {}
  }
};

export const checkIsSubscribe = async (
  token: string | null,
  getUserSubscription: getUserSubscriptionMutationFn,
  setUserStatus: any,
  realm: Realm,
) => {
  if (token) {
    const userData = realm.objects(UserData);

    const usersubscriptions: any = await getUserSubscription({
      token,
    }).unwrap();

    if (
      usersubscriptions &&
      usersubscriptions.subscription &&
      usersubscriptions.subscription.subscriptionPackage &&
      usersubscriptions.subscription.subscriptionPackage.id &&
      userData &&
      userData.length > 0 &&
      userData[0].user
    ) {
      !userData[0].isSubscribed &&
        realm.write(() => {
          userData[0].isSubscribed = true;
        });
      setUserStatus(STATUSTYPES.Subscribed);
    }
  }
};
