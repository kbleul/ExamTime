import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {userType} from '../../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalStorageDataKeys} from '../../../utils/Data/data';
interface AuthState {
  isChecked: boolean;
  user: userType | null;
  token: string | null;
}

const initialState: AuthState = {
  isChecked: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{user: userType; token: string}>,
    ) => {
      state.isChecked = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutSuccess: state => {
      state.isChecked = false;
      state.user = null;
      state.token = null;

      AsyncStorage.removeItem(LocalStorageDataKeys.userData);
      AsyncStorage.removeItem(LocalStorageDataKeys.token);
    },
  },
});

export const {loginSuccess, logoutSuccess} = authSlice.actions;

export default authSlice.reducer;
