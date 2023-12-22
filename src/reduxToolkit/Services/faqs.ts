import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
import {faqItemsType} from '../../types';

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: Config.API_URL}),
  endpoints: build => ({
    getFaq: build.mutation<faqItemsType[], {}>({
      query: () => {
        return {
          url: 'frequently-asked-question/user/faq',
          method: 'GET',
        };
      },
    }),
  }),
});

export const {useGetFaqMutation} = api;
