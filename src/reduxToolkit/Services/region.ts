import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  regionItemsType,
  userType,
} from '../../types';
import Config from 'react-native-config';

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: Config.API_URL}),
  endpoints: build => ({
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
  useGetRegionsMutation,
} = api;
