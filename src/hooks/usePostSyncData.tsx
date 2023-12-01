import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../reduxToolkit/Store';
import {isOnline} from '../utils/Functions/Helper';
import {AuthContext} from '../Realm/model';
import {Exam, ExamAnswers} from '../Realm';
import {usePostExamResultsMutation} from '../reduxToolkit/Services/auth';
import {answersType} from '../screens/App/PracticeQuestion';

export type newAnswerType = {
  [id: string]: {
    answers: answersType[];
    takenDate: string | null;
  };
};

const usePostSyncData = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const [postExamResults, {isLoading, error}] = usePostExamResultsMutation();
  const {useQuery} = AuthContext;

  const savedTakenExams = useQuery(Exam, exam => {
    return exam.filtered('isExamTaken = true');
  });

  const savedExamAnswers = useQuery(ExamAnswers);

  const prepareSyncData = () => {
    const mainAnsersObjsArr: newAnswerType[] = [];

    savedTakenExams.forEach(takenExam => {
      const userAnswers = getUserAnswers(takenExam.id);

      if (userAnswers && userAnswers.length > 0) {
        userAnswers.forEach(userAnswer => {
          const newAnswer = []
          userAnswer.userExamAnswers.forEach(answer => {
            newAnswer.push(`[${answer.id}]` : )
          })
          // mainAnsersObjsArr.push({
          //   [`${takenExam.id}`]: {
          //     answers: [...userAnswer.userExamAnswers[0].],
          //     takenDate: userAnswer.examDate,
          //   },
          // });
        });
      }
    });

    return mainAnsersObjsArr;
  };

  const getUserAnswers = (examId: string) => {
    return savedExamAnswers.filter(examAnser => examAnser.examId === examId);
  };

  const syncDataToDB = async () => {
    const preparedData = prepareSyncData();
    console.log('lengt', preparedData);
    const promises: Promise<any>[] = [];

    preparedData.forEach(data => {
      const examId = Object.keys(data)[0];
      const promise = postExamResults({
        token,
        examId,
        answers: data[examId],
      })
        .then(response => {
          console.log('response', response);
        })
        .catch(error => {
          console.error('Error syncing exam:', error);
        });

      promises.push(promise);
    });

    try {
      await Promise.all(promises);
      console.log('All exams synced successfully');
    } catch (err) {
      console.error('Error syncing exams:', err);
    }
  };

  useEffect(() => {
    const handleSync = async () => {
      // Check for internet connection (you can use an appropriate library or method)
      const isConnected = await isOnline();

      if (isConnected && savedTakenExams.length > 0) {
        // Perform data sync with the database
        await syncDataToDB();

        // Navigate to the desired screen after syncing
        console.log('----------------------------------------');
      }
    };

    user && token && handleSync();
  }, []);
};

export default usePostSyncData;
