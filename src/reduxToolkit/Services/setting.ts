// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import {
//     ChangePasswordFormDataType,
//     CreatePassworDataType,
//     LoginDataType,
//     OTPDataType,
//     ResendCodeDataType,
//     SignupDataType,
//     gradeType,
//     regionItemsType,
//     subjectType,
//     userType,
// } from '../../types';
// import Config from 'react-native-config';

// export const api = createApi({
//     baseQuery: fetchBaseQuery({ baseUrl: Config.API_URL }),
//     endpoints: build => ({
//         getAboutUs: build.mutation<String,{}>({
//             // query:token =>   {
//             query: () => {
//                 return {
//                     url: 'about-us/user/aboutus',
//                     // headers: {
//                     //     Authorization: `Bearer ${token}`,
//                     //   },
//                     method: 'GET',
//                 };
//             },
//         }),
//         // createUser: build.mutation<{user: userType}, SignupDataType>({
//         //   query: credentials => {
//         //     credentials.grade = credentials.grade?.grade;

//         //     return {
//         //       url: 'user/create',
//         //       method: 'POST',
//         //       body: credentials,
//         //     };
//         //   },
//         // }),
//         // verifyCode: build.mutation<{user: userType}, OTPDataType>({
//         //   query: credentials => {
//         //     return {
//         //       url: `user/verify/${credentials.userId}`,
//         //       method: 'PUT',
//         //       body: {
//         //         verificationCode: credentials.code,
//         //         forForgotPassword: credentials.forgotPassword,
//         //       },
//         //     };
//         //   },
//         // }),
//         // resendCode: build.mutation<{user: userType}, ResendCodeDataType>({
//         //   query: credentials => {
//         //     return {
//         //       url: `user/resend/${credentials.userId}`,
//         //       method: 'POST',
//         //     };
//         //   },
//         // }),


//     }),
// });

// export const {
//     useGetAboutUsMutation,
// } = api;
