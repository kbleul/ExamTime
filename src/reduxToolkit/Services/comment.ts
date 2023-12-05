import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
import {CommentType} from '../../types';

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: Config.API_URL}),
  endpoints: build => ({
    Createcomment: build.mutation<CommentType, {}>({
      query: () => {
        return {
          url: 'comment/create',
          method: 'POST',
        };
      },
    }),
  }),
});

export const {useCreatecommentMutation} = api;