import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {userType} from '../../types';
import Config from 'react-native-config';

type LoginCredentials = {
  phoneNumber: string;
  password: string;
};

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: Config.API_URL}),
  endpoints: build => ({
    login: build.mutation<
      {user: userType; accessToken: string},
      LoginCredentials
    >({
      query: credentials => ({
        url: 'user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {useLoginMutation} = api;
