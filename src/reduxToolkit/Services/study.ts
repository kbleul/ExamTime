import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {studyType} from '../../types';
import Config from 'react-native-config';

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: Config.API_URL}),
  endpoints: build => ({
    getStudy: build.mutation<{styudies: studyType[]}, {token: string}>({
      query: credentials => {
        return {
          url: 'study/user/study',
          method: 'Get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credentials.token}`,
          },
        };
      },
    }),
  }),
});

export const {useGetStudyMutation} = api;
