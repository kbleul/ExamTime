import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  regionItemsType,
  userType,
} from '../../types';
import Config from 'react-native-config';

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: Config.API_URL}),
  endpoints: build => ({
    getGrade: build.mutation({
      query: () => {
        return {
          url: 'grade/grade',
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useGetGradeMutation,
} = api;
