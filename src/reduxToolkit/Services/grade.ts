import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
import {gradeType} from '../../types';

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: Config.API_URL}),
  endpoints: build => ({
    getGrade: build.mutation<gradeType[], {}>({
      query: () => {
        return {
          url: 'grade/grade',
          method: 'GET',
        };
      },
    }),
  }),
});

export const {useGetGradeMutation} = api;
