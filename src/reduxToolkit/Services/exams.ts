import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {userType} from '../../types';
import Config from 'react-native-config';
import {Credentials} from 'realm/dist/bundle';

type ExamParamsType = {
  page?: number;
  limit?: number;
  examName?: string;
  grade?: string;
  subject: string;
  year?: string;
  [key: string]: number | string | undefined;
};

const createUrlWithParams = (url: string, params: ExamParamsType) => {
  let newUrl = url;
  let loopCounter = 0;

  Object.keys(params).forEach((key: string) => {
    loopCounter === 0
      ? (newUrl += `?${key}=${params[key]}`)
      : (newUrl += `&${key}=${params[key]}`);

    ++loopCounter;
  });
  console.log(newUrl);
  return newUrl;
};

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: Config.API_URL}),
  endpoints: build => ({
    getExams: build.mutation<
      {},
      {
        params: ExamParamsType;
      }
    >({
      query: credentials => {
        return {
          url: createUrlWithParams('exam/publishedexams', {
            grade: credentials.params.grade,
          }),
          method: 'GET',
        };
      },
    }),
    getRandomExam: build.mutation<
      {},
      {
        grade: string;
        subject: string;
        noOfQuestions: number;
      }
    >({
      query: credentials => {
        console.log('kkkkkkkkkkkkkkkkkkkkkk');
        return {
          url: 'exam/randomexam',
          body: {
            subject: credentials.subject,
            grade: credentials.grade,
            noOfQuestions: credentials.noOfQuestions,
            unit: '',
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ODY3MWRlYS1jZmQ3LTQ2M2MtOTAzZi01YmQ4NjFkMjMwN2QiLCJpYXQiOjE2OTkyNzI4MTZ9.riBXZdA0Cny8OGybmCyG4xRJZTlVxUmS6taG0t9ADQg',
          },
          method: 'POST',
        };
      },
    }),
  }),
});

export const {useGetExamsMutation, useGetRandomExamMutation} = api;
