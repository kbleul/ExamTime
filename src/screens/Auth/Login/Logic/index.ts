import {ActionCreatorWithPayload, AnyAction, Dispatch} from '@reduxjs/toolkit';
import {userType} from '../../../../types';
import {checkIsOnline} from '../../../../utils/Functions/Helper';
import {FormData} from '../Types';
import {
  useGetSubjectMutation,
  useLoginMutation,
} from '../../../../reduxToolkit/Services/auth';
import {NavigationProp} from '@react-navigation/native';

import {
  LocalObjectDataKeys,
  LocalStorageDataKeys,
  STATUSTYPES,
} from '../../../../utils/Data/data';
import {
  Exam,
  ExamAnswers,
  ExamQuestion,
  Pdf,
  SingleSubject,
  Study,
  StudyTips,
  Subject,
  UserData,
  UserExamAnswers,
  VideoLink,
} from '../../../../Realm';

import {setObject_to_localStorage} from '../../../../utils/Functions/Set';
import {getSubjectsMutation} from '../../../App/Onboarding/Page/logic';
import {getObject_from_localStorage} from '../../../../utils/Functions/Get';
import {calculateDateDifference} from '../../../App/Onboarding/Logic';

type LoginMutationFn = ReturnType<typeof useLoginMutation>[0];
type GetSubjectsMutationFn = ReturnType<typeof useGetSubjectMutation>[0];

export const handleLogin = async (
  data: FormData,
  dispatch: Dispatch<AnyAction>,
  login: LoginMutationFn,
  loginSuccess: ActionCreatorWithPayload<
    {
      user: userType;
      token: string;
      isSubscribed: boolean;
      IsDefaultPasswordChanged: boolean;
    },
    'auth/loginSuccess'
  >,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  newUserData: ResultsType<UserData>,
  realm: Realm,
  setChanged: React.Dispatch<React.SetStateAction<boolean>>,
  getSubject: GetSubjectsMutationFn,
  setUserStatus: any,
  setIsLoaginLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const isOnline = await checkIsOnline();

  setIsLoaginLoading(true);

  const savedUserData = realm.objects(UserData);
  if (
    !isOnline &&
    savedUserData &&
    savedUserData.length > 0 &&
    savedUserData[0].loggedOutUser &&
    savedUserData[0].loggedOutUserToken
  ) {
    const user = savedUserData[0].loggedOutUser;
    if (user?.phoneNumber === '+251' + data.phoneNumber) {
      user?.subscriptionStatus === 'success' &&
        realm.write(() => {
          savedUserData[0].isSubscribed = true;
          setUserStatus(STATUSTYPES.Subscribed);
        });

      dispatch(
        loginSuccess({
          user: user,
          token: savedUserData[0].loggedOutUserToken,
          isSubscribed: user?.subscriptionStatus === 'success' ? true : false,
          IsDefaultPasswordChanged: true,
        }),
      );

      realm.write(() => {
        savedUserData[0].token = savedUserData[0].loggedOutUserToken;
        savedUserData[0].user = user;
      });
      navigator.getState().routeNames[0] === 'Home'
        ? navigator.navigate('Home')
        : navigator.navigate('HomeSection');

      setIsLoaginLoading(false);

      return;
    }
  }

  await checkIsOnline(navigator);
  try {
    const response: any = await login({
      phoneNumber: '+251' + data.phoneNumber,
      password: data.password,
      token: savedUserData[0].guestUserToken ?? '',
    }).unwrap();

    if (response) {
      if (response?.user?.subscriptionStatus === 'success') {
        if (savedUserData && savedUserData.length > 0) {
          realm.write(() => {
            savedUserData[0].isSubscribed = true;
            setUserStatus(STATUSTYPES.Subscribed);
          });
        }
      } else {
        if (savedUserData[0].isSubscribed) {
          setUserStatus(STATUSTYPES.Subscribed);
          return;
        }

        const createdAt = response?.user?.createdAt;

        const remainingDays = calculateDateDifference(createdAt);

        setUserStatus(
          savedUserData[0].allowedTrialDays_AfterLogin - remainingDays <= 0
            ? STATUSTYPES.Unsubscribed
            : STATUSTYPES.AuthorizedTrial,
        );
      }
    }

    dispatch(
      loginSuccess({
        user: response.user,
        token: response.accessToken,
        isSubscribed:
          response?.user?.subscriptionStatus === 'success' ? true : false,
        IsDefaultPasswordChanged: response.IsDefaultPasswordChanged,
      }),
    );

    let prevGrade = await getObject_from_localStorage(
      LocalStorageDataKeys.userGrade,
    );

    await setObject_to_localStorage(
      LocalStorageDataKeys.userGrade,
      response.user.grade,
    );

    await removeRealmData(prevGrade, realm);

    updateRealmUserData(
      newUserData,
      response.user,
      response.accessToken,
      realm,
    );

    await getSubjectsMutation(
      getSubject,
      navigator,
      realm,
      undefined,
      undefined,
      undefined,
      undefined,
      true,
    ).finally(() => {
      setTimeout(() => {
        setChanged && setChanged(prev => !prev);

        response.IsDefaultPasswordChanged
          ? navigator.getState().routeNames[0] === 'Home'
            ? navigator.navigate('Home')
            : navigator.navigate('HomeSection')
          : navigator.navigate('Password-Reset');

        setIsLoaginLoading(false);
      }, 3000);
      // Manually reset the controlled inputs
    });
  } catch (error) {
    setIsLoaginLoading(false);
    if (
      error instanceof TypeError &&
      error.message === 'Network request failed'
    ) {
      navigator.navigate('network-error');
    }
    console.log('logg in error --> ', error);
    return false;
  }
};

const removeRealmData = async (
  prevGrade:
    | {
        value: any;
        status: boolean;
      }
    | {
        status: boolean;
        value?: undefined;
      },
  realm: Realm,
): Promise<void> => {
  const newgrade = await getObject_from_localStorage(
    LocalStorageDataKeys.userGrade,
  );

  if (newgrade.value.id !== prevGrade.value.id) {
    try {
      const SingleSubjects = realm.objects(SingleSubject);
      const subjects = realm.objects(Subject);

      const PDFs = realm.objects(Pdf);
      const VideoLinks = realm.objects(VideoLink);
      const AllStudyTips = realm.objects(StudyTips);
      const studiessaved = realm.objects(Study);

      const ExamQuestions = realm.objects(ExamQuestion);
      const AllUserExamAnswers = realm.objects(UserExamAnswers);
      const AllExamAnswers = realm.objects(ExamAnswers);
      const Exams = realm.objects(Exam);

      realm.write(() => {
        realm.delete(subjects);
        realm.delete(SingleSubjects);

        realm.delete(PDFs);
        realm.delete(VideoLinks);
        realm.delete(AllStudyTips);
        realm.delete(studiessaved);

        realm.delete(ExamQuestions);
        realm.delete(AllUserExamAnswers);
        realm.delete(AllExamAnswers);
        realm.delete(Exams);
      });
    } catch (err) {
      console.log('Delete saved study and subjects failed', err);
    }
  }
};

export const updateRealmUserData = async (
  newUserData: ResultsType<UserData>,
  user: userType,
  token: string,
  realm: Realm,
) => {
  try {
    if (newUserData) {
      const {
        firstName,
        lastName,
        phoneNumber,
        gender,
        email,
        verificationCode,
        region,
        profilePicture,
        grade,
        createdAt,
      } = user;
      let newUser;

      let newGrade;

      realm.write(() => {
        const newRegion = realm.create(LocalObjectDataKeys.Region, {...region});

        newGrade = realm
          .objects(LocalObjectDataKeys.Grade)
          .filtered(`id = "${grade.id}"`);

        newUser = realm.create(LocalObjectDataKeys.User, {
          id: phoneNumber + firstName,
          firstName,
          lastName,
          phoneNumber,
          region: newRegion,
          isVerified: false,
          isActive: true,
          grade: newGrade[0],
          gender,
          email,
          verificationCode: verificationCode ? verificationCode : null,
          profilePicture,
          createdAt,
        });
        newUserData.user = newUser;
        newUserData.token = token;
        newUserData.grade = newGrade[0];
      });
    }
  } catch (e) {
    console.log('Login err', e);
  }
};
