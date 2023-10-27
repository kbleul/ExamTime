import {configureStore} from '@reduxjs/toolkit';
import authReducer from './Features/auth/authSlice';
import {api} from './Services/auth';
const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;
export default store;
