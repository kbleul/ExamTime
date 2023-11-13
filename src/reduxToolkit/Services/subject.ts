import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {subjectType} from '../../types';
import Config from 'react-native-config';

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: Config.API_URL}),
  endpoints: build => ({
    getSubject: build.mutation<{subjects: subjectType[]}, {grade: string}>({
      query: credentials => {
        return {
          url: `subjectmanagement/user/subjects?grade=${credentials.grade}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {useGetSubjectMutation} = api;
