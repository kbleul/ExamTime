import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {userType} from '../../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalStorageDataKeys} from '../../../utils/Data/data';
interface AuthState {
  isChecked: boolean;
  user: userType | null;
  token: string | null;
  isSubscribed: boolean;
}

const initialState: AuthState = {
  isChecked: false,
  user: null,
  token: null,
  isSubscribed: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        user: userType;
        token: string;
        isSubscribed: boolean;
      }>,
    ) => {
      state.isChecked = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isSubscribed = action.payload.isSubscribed;
    },
    logoutSuccess: state => {
      state.isChecked = false;
      state.user = null;
      state.token = null;
      state.isSubscribed = false;

      AsyncStorage.removeItem(LocalStorageDataKeys.userData);
      AsyncStorage.removeItem(LocalStorageDataKeys.token);
    },
  },
});

export const {loginSuccess, logoutSuccess} = authSlice.actions;

export default authSlice.reducer;
