import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  ChangePasswordFormDataType,
  CreatePassworDataType,
  LoginDataType,
  OTPDataType,
  ResendCodeDataType,
  SignupDataType,
  gradeType,
  regionItemsType,
  subjectType,
  userType,
  CommentType
} from '../../types';
import Config from 'react-native-config';

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: Config.API_URL}),
  endpoints: build => ({
    login: build.mutation<
      {user: userType; accessToken: string; IsDefaultPasswordChanged: boolean},
      LoginDataType
    >({
      query: credentials => ({
        url: 'user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    createUser: build.mutation<{user: userType}, SignupDataType>({
      query: credentials => {
        credentials.grade = credentials.grade?.grade;

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
        return {
          url: `user/resend/${credentials.userId}`,
          method: 'POST',
        };
      },
    }),
    createPassword: build.mutation<{user: userType}, CreatePassworDataType>({
      query: credentials => {
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
    changePassword: build.mutation<
      {user: userType},
      ChangePasswordFormDataType
    >({
      query: data => {
        return {
          url: `user/changepassword/`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          body: {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
          },
        };
      },
    }),
    changeProfile: build.mutation<
      {},
      {token: String; profileData: Partial<userType>}
    >({
      query: data => {
        console.log({userdata: data.profileData});
        return {
          url: `user/changeprofile/`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          body: data.profileData,
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

    getGrade: build.mutation({
      query: () => {
        return {
          url: 'grade/grade',
          method: 'GET',
        };
      },
    }),
    getFaq: build.mutation({
      query: () => {
        return {
          url: 'frequently-asked-question/user/faq',
          method: 'GET',
        };
      },
    }),
    Createcomment: build.mutation<{comment: CommentType}, CommentType>({
      query: data => {
        return {
          url: 'comment/create',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          body:{comment:data.comment},
        };
      },
    }),
    deleteAccount: build.mutation<
      {user: userType},
      {password: string; token: string}
    >({
      query: credentials => {
        return {
          url: 'user/deleteaccount',
          method: 'DELETE',
          body: {
            password: credentials.password,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credentials.token}`,
          },
        };
      },
    }),
    getExams: build.mutation<
      {user: userType},
      {token: string; subject: string}
    >({
      query: credentials => {
        return {
          url: 'exam/publishedexams',
          method: 'Get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credentials.token}`,
          },
        };
      },
    }),
    getSubject: build.mutation<{subjects: subjectType[]}, {grade: string}>({
      query: credentials => {
        return {
          url: `subjectmanagement/user/subjects?grade=${credentials.grade}`,
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

export const {
  useLoginMutation,
  useCreateUserMutation,
  useVerifyCodeMutation,
  useResendCodeMutation,
  useCreatePasswordMutation,
  useChangeProfileMutation,
  useChangePasswordMutation,
  useGetRegionsMutation,
  useDeleteAccountMutation,
  useGetExamsMutation,
  useGetSubjectMutation,
  useGetRandomExamMutation,
  useGetFaqMutation,
  useCreatecommentMutation
  

} = api;
