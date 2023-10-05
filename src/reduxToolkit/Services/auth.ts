import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  CreatePasswordataType,
  LoginDataType,
  OTPDataType,
  ResendCodeDataType,
  SignupDataType,
  userType,
} from '../../types';
import Config from 'react-native-config';

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: Config.API_URL}),
  endpoints: build => ({
    login: build.mutation<{user: userType; accessToken: string}, LoginDataType>(
      {
        query: credentials => ({
          url: 'user/login',
          method: 'POST',
          body: credentials,
        }),
      },
    ),
    createUser: build.mutation<{user: userType}, SignupDataType>({
      query: credentials => {
        return {
          url: 'user/create',
          method: 'POST',
          body: credentials,
        };
      },
    }),
    verifyCode: build.mutation<
      {user: userType; accessToken: string},
      OTPDataType
    >({
      query: credentials => {
        console.log('credentcreateials', credentials); // Add this line to log the credentials
        return {
          url: `user/verify/${credentials.userId}`,
          method: 'POST',
          body: {
            verificationCode: credentials.code,
            forForgotPassword: credentials.forgotPassword,
          },
        };
      },
    }),
    resendCode: build.mutation<
      {user: userType; accessToken: string},
      ResendCodeDataType
    >({
      query: credentials => {
        console.log('credentcreateials', credentials); // Add this line to log the credentials
        return {
          url: `user/resend/${credentials.userId}`,
          method: 'POST',
        };
      },
    }),
    createPassword: build.mutation<
      {user: userType; accessToken: string},
      CreatePasswordataType
    >({
      query: credentials => {
        console.log('credentcreateials', credentials); // Add this line to log the credentials
        return {
          url: `user/createpassword/${credentials.userId}`,
          method: 'PUT',
          body: {
            verificationCode: credentials.password,
            forForgotPassword: credentials.forgotPassword,
          },
        };
      },
    }),
    getRegions: build.mutation<{user: userType; accessToken: string}, {}>({
      query: credentials => {
        console.log('credentcreateials', credentials); // Add this line to log the credentials
        return {
          url: 'region/region',
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateUserMutation,
  useVerifyCodeMutation,
  useCreatePasswordMutation,
} = api;
