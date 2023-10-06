import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  CreatePassworDataType,
  LoginDataType,
  OTPDataType,
  ResendCodeDataType,
  SignupDataType,
  regionItemsType,
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
    verifyCode: build.mutation<{user: userType}, OTPDataType>({
      query: credentials => {
        return {
          url: `user/verify/${credentials.userId}`,
          method: 'PUT',
          body: {
            verificationCode: credentials.code,
            forForgotPassword: credentials.forgotPassword,
          },
        };
      },
    }),
    resendCode: build.mutation<{user: userType}, ResendCodeDataType>({
      query: credentials => {
        console.log('credentcreateials', credentials); // Add this line to log the credentials
        return {
          url: `user/resend/${credentials.userId}`,
          method: 'POST',
        };
      },
    }),
    createPassword: build.mutation<{user: userType}, CreatePassworDataType>({
      query: credentials => {
        console.log('credentcreateials---', credentials); // Add this line to log the credentials
        return {
          url: `user/createpassword/${credentials.userId}`,
          method: 'PUT',
          body: {
            password: credentials.password,
            forForgotPassword: credentials.forForgotPassword,
          },
        };
      },
    }),
    getRegions: build.mutation<{regions: regionItemsType[]}, {}>({
      query: () => {
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
  useResendCodeMutation,
  useCreatePasswordMutation,
  useGetRegionsMutation,
} = api;