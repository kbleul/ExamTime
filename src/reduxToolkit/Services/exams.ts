import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {userType} from '../../types';
import Config from 'react-native-config';

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
  }),
});

export const {useGetExamsMutation} = api;
