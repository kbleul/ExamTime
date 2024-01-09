import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';

import {useSelector} from 'react-redux';
import {RootState} from '../reduxToolkit/Store';
import {checkIsOnline} from '../utils/Functions/Helper';
import {AuthContext} from '../Realm/model';
import {Exam, ExamAnswers, Study, UserData} from '../Realm';
import {
  useGetExamAnswersMutation,
  useGetStudyMutation,
  useGetTipsMutation,
  usePostExamResultsMutation,
} from '../reduxToolkit/Services/auth';
import {answersType} from '../screens/App/PracticeQuestion';
import {getAllStudies} from '../screens/App/Study/logic';
import {useNavigation} from '@react-navigation/native';
import {getExamAnswersFromDB} from './logic';
import {fetchTips} from '../utils/Functions/Get';

export type newAnswerType = {
  [id: string]: {
    answers: answersType[];
    takenDate: string | null;
  };
};

export type singleAnswerType = {
  [id: string]: string;
};

export const getUserAnswers = (
  savedExamAnswers: ResultsType<Exam>,
  examId: string,
) => {
  return savedExamAnswers.filter(
    (examAnser: ExamAnswers) => examAnser.examId === examId,
  );
};

export const prepareSyncData = (
  savedTakenExams: ResultsType<Exam>,
  savedExamAnswers: ResultsType<ExamAnswers>,
) => {
  const mainAnsersObjsArr: newAnswerType[] = [];

  savedTakenExams.forEach((takenExam: Exam) => {
    const userAnswers = getUserAnswers(savedExamAnswers, takenExam.id);

    if (userAnswers && userAnswers.length > 0) {
      userAnswers.forEach((userAnswer: any) => {
        const newAnswer: any[] = [];
        userAnswer.userExamAnswers.forEach((answer: any) => {
          newAnswer.push({[`${answer.id}`]: answer.userAnswer});
        });
        mainAnsersObjsArr.push({
          [`${takenExam.id}`]: {
            answers: [...newAnswer],
            takenDate: userAnswer.examDate,
          },
        });
      });
    }
  });

  return mainAnsersObjsArr;
};

export const syncDataToDB = async (
  postExamResults: any,
  token: string,
  savedTakenExams: ResultsType<Exam>,
  savedExamAnswers: ResultsType<ExamAnswers>,
  setIsSyncing?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const preparedData = prepareSyncData(savedTakenExams, savedExamAnswers);

  const promises: Promise<any>[] = [];

  preparedData.forEach(data => {
    const examId = Object.keys(data)[0];
    const promise = postExamResults({
      token,
      examId,
      answers: data[examId],
    }).finally(() => {
      setIsSyncing && setIsSyncing(false);
    });

    promises.push(promise);
  });

  try {
    await Promise.all(promises);
  } catch (err) {
    console.error('Error syncing exams:', err);
  }
};

const useHandleInitialRequests = (
  setIsSyncing: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const navigation: any = useNavigation();

  const user = useSelector((state: RootState) => state.auth.user);

  const token = useSelector((state: RootState) => state.auth.token);

  const [postExamResults] = usePostExamResultsMutation();
  const [getExamAnswers] = useGetExamAnswersMutation();
  const [getStudy] = useGetStudyMutation();

  const {useQuery, useRealm} = AuthContext;

  const realm = useRealm();

  const savedTakenExams = useQuery(Exam, exam => {
    return exam.filtered('isExamTaken = true');
  });
  const savedExamAnswers = useQuery(ExamAnswers);

  const userData = useQuery(UserData);

  const [getTips] = useGetTipsMutation();

  useEffect(() => {
    const handleSync = async () => {
      // App is going to background or about to be terminated
      // if (nextAppState === 'background' || nextAppState === 'inactive') {
      const isConnected = await checkIsOnline();
      if (isConnected) {
        console.log('load');
        getAllStudies(getStudy, navigation, token, realm, Toast);

        if (savedTakenExams.length > 0) {
          // Perform data sync with the database
          setIsSyncing(true);
          await syncDataToDB(
            postExamResults,
            token ? token : '',
            savedTakenExams,
            savedExamAnswers,
            setIsSyncing,
          )
            .then(() => {
              getExamAnswersFromDB(getExamAnswers, token, realm);
            })
            .catch(err => {
              console.log('errr', err);
            })
            .finally(() => {
              fetchTips(
                getTips,
                realm,
                userData[0]?.grade ? userData[0].grade.id || null : null,
              );
            });
        } else {
          getExamAnswersFromDB(getExamAnswers, token, realm);
        }
      }
    };
    // };

    user && token && handleSync();
    // AppState.addEventListener('change', handleSync);
  }, [user, token]);
};

export default useHandleInitialRequests;
