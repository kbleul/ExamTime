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
import {newAnswerType} from '../../hooks/useHandleInitialRequests';

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
            fireBaseToken: data.fireBaseToken,
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
            grade: [credentials.grade],
            noOfQuestions: credentials.noOfQuestions,
            unit: '',
          },
          method: 'POST',
        };
      },
    }),
    getStudy: build.mutation<
      {studies: studyType[]},
      {token: string; pageNumber: number}
    >({
      query: credentials => {
        return {
          url: `study/user/study?page=${credentials.pageNumber}`,
          method: 'GET',
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
    getExamAnswers: build.mutation<{examAnswers: any}, {token: string}>({
      query: credentials => {
        return {
          url: 'exam-result/results',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credentials.token}`,
          },
        };
      },
    }),
    getTips: build.mutation<{}, {gradeId: string}>({
      query: data => {
        return {
          url: `tips/tipsbyparameter?gradeId=${data.gradeId}`,
          method: 'GET',
        };
      },
    }),
    getContact: build.mutation<{}, {}>({
      query: () => {
        return {
          url: '/contact-us/user/contactus',
          method: 'GET',
        };
      },
    }),
    getFeedBack: build.mutation<any, {token: String; feedback: string}>({
      query: data => {
        return {
          url: '/feedback/create/',
          body: {feedback: data.feedback},
          method: 'POST',
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    getChallenges: build.mutation<{challenges: any}, {token: string}>({
      query: credentials => {
        return {
          url: 'challange/publishedchallenges',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credentials.token}`,
          },
        };
      },
    }),
    saveChallengeProgress: build.mutation<
      {result: any},
      {token: string; challengeId: string; progress: number}
    >({
      query: credentials => {
        return {
          url: 'challange/userchallengestatus',
          body: {
            challengeId: credentials.challengeId,
            challengeStatus: credentials.progress,
          },
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credentials.token}`,
          },
        };
      },
    }),
    getNotifications: build.mutation<{userNotifications: any}, {token: string}>(
      {
        query: credentials => {
          return {
            url: 'notification/user/notifications',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${credentials.token}`,
            },
          };
        },
      },
    ),
    postNotificationStatus: build.mutation<
      {userNotifications: any},
      {token: string; notificationId: string}
    >({
      query: data => {
        return {
          url: 'notification/user/notification/' + data.notificationId,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    deleteNotificationStatus: build.mutation<
      {userNotifications: any},
      {token: string; notificationId: string}
    >({
      query: data => {
        return {
          url: 'notification/user/delete/' + data.notificationId,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    getTrialStatus: build.mutation<{status: any}, {token: string}>({
      query: data => {
        return {
          url: 'trial-version/user/trialversion',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    creteGuestUser: build.mutation<
      any,
      {grade: string; deviceId: string | number[]; fireBaseToken: string}
    >({
      query: data => {
        return {
          url: 'user/createguest/',
          body: {
            grade: data.grade,
            deviceId: data.deviceId,
            fireBaseToken: data.fireBaseToken,
          },
          method: 'POST',
        };
      },
    }),
    getSubscriptionPackages: build.mutation<{}, {}>({
      query: () => {
        return {
          url: 'payment/user/subscriptionpackage',
          method: 'GET',
        };
      },
    }),
    initiateChapaPayment: build.mutation<
      {},
      {packageId: string; token: string}
    >({
      query: data => {
        return {
          url: 'payment/initializepaymentbychapa',
          method: 'POST',
          body: {subscriptionPackageId: data.packageId},
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    verifyChapaPayment: build.mutation<
      {},
      {textReference: string; token: string}
    >({
      query: data => {
        return {
          url: `payment/verifypaymentbychapa/${data.textReference}`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    getUserSubscription: build.mutation<{}, {token: string}>({
      query: data => {
        return {
          url: 'payment/user/subscription',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    makeBankPayment: build.mutation<
      {},
      {
        depositedByName: string;
        referenceNo: string;
        subscriptionPackageId: string;
        token: string;
      }
    >({
      query: data => {
        const formData = new FormData();
        console.log(
          data.depositedByName,
          ' === ',
          data.referenceNo,
          ' === ',
          data.subscriptionPackageId,
        );
        formData.append('depositedByName', data.depositedByName);
        formData.append('referenceNo', data.referenceNo);
        formData.append('subscriptionPackageId', data.subscriptionPackageId);

        return {
          url: 'payment/user/createdirectbankpayment',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${data.token}`,
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
  useGetExamAnswersMutation,
  useGetTipsMutation,
  useGetContactMutation,
  useGetFeedBackMutation,
  useGetChallengesMutation,
  useSaveChallengeProgressMutation,
  useGetNotificationsMutation,
  usePostNotificationStatusMutation,
  useDeleteNotificationStatusMutation,
  useGetTrialStatusMutation,
  useCreteGuestUserMutation,
  useGetSubscriptionPackagesMutation,
  useInitiateChapaPaymentMutation,
  useVerifyChapaPaymentMutation,
  useGetUserSubscriptionMutation,
  useMakeBankPaymentMutation,
} = api;
