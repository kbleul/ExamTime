import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  ChangePasswordFormDataType,
  CreatePassworDataType,
  LoginDataType,
  OTPDataType,
  ResendCodeDataType,
  SignupDataType,
  regionItemsType,
  studyType,
  subjectType,
  userType,
  CommentType,
} from '../../types';
import Config from 'react-native-config';
import {newAnswerType} from '../../hooks/usePostSyncData';

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
          body: {comment: data.comment},
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
          method: 'POST',
        };
      },
    }),
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
    getAboutUs: build.mutation<String, {}>({
      query: () => {
        return {
          url: 'about-us/user/aboutus',
          method: 'GET',
        };
      },
    }),
    getUserGuide: build.mutation<String, {}>({
      query: () => {
        return {
          url: 'user-guide/user/userguide',
          method: 'GET',
        };
      },
    }),
    postExamResults: build.mutation<
      any,
      {
        token: string | null;
        examId: string;
        answers: {
          answers: newAnswerType[];
          takenDate: string | null;
        };
      }
    >({
      query: data => {
        return {
          url: 'exam-result/create',
          body: {
            examId: data.examId,
            examDate: data.answers.takenDate,
            userAnswers: [...data.answers.answers],
          },
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    getExamResults: build.mutation<
      any,
      {
        token: string;
        user: userType;
      }
    >({
      query: data => {
        return {
          url: 'exam-result/results',
          body: {
            id: data.user.id,
          },
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    changeProfilePicture: build.mutation<{}, {token: String; avatar: string}>({
      query: data => {
        const formData = new FormData();
        formData.append('profilePicture', {
          uri: data.avatar,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        });
        return {
          url: 'user/uploadprofilepicture',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${data.token}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
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
  useCreatecommentMutation,
  useGetAboutUsMutation,
  useGetUserGuideMutation,
  useGetStudyMutation,
  usePostExamResultsMutation,
  useGetExamResultsMutation,
  useChangeProfilePictureMutation,
} = api;
