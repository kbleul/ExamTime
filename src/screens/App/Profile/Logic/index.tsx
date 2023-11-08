// utils/profileUtils.ts

import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../../../reduxToolkit/Features/auth/authSlice';
import {useChangeProfileMutation} from '../../../../reduxToolkit/Services/auth';
import {updateRealmUserData} from '../../../../screens/Auth/Login/Logic';

export const updateProfile: React.FC =
  () =>
  async (
    token: string,
    fullName: string,
    phone: string,
    grade: string,
    region: string | null,
  ) => {
    const dispatch = useDispatch();
    const [changeProfile, {isLoading}] = useChangeProfileMutation();

    const [firstName, lastName] = fullName.split(' ');
    const profileData = {
      firstName,
      lastName,
      phoneNumber: phone,
      grade,
      gender, // Modify as needed
      region,
    };
    try {
      if (result.data.user) {
        dispatch(
          loginSuccess({
            user: result.data.user,
            token: token,
            isSubscribed: false, // Modify as needed
            IsDefaultPasswordChanged: false, // Modify as needed
          }),
        );
      }
      // Update Realm data if needed
      // updateRealmUserData(result.data.user, token); // Adjust the arguments based on your utility function

      return true; // Success
    } catch (error) {
      return false; // Error
    }
  };
