import React, {FC} from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';

import {ScaledSheet} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {screenHeight} from '../../utils/Data/data';

interface ChangePasswordButtonProps {
  onPress: () => void;
  isLoading?: boolean;
}

const ChangePasswordButton: FC<ChangePasswordButtonProps> = ({
  onPress,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.inputContainer,
        styles.changePassword,
        styles.changePasswordButton,
      ]}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator color="#fff" style={styles.loading} />
      ) : (
        <>
          <Text style={styles.changePasswordText}>Change Password</Text>
          <AntDesign name="right" style={styles.changepasswordButtonIcon} />
        </>
      )}
    </TouchableOpacity>
  );
};
const styles = ScaledSheet.create({
  inputContainer: {
    color: '#9E9E9E',
    flex: 1,
    fontSize: '16@ms',
    marginTop: screenHeight * 0.008,
    paddingVertical: '8@vs',
  },
  changePassword: {
    backgroundColor: '#1E90FF',
  },
  changePasswordButton: {
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',

    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    marginBottom: '40@ms',
    marginHorizontal: '20@ms',
  },
  loading: {
    paddingVertical: 4,
  },
  changePasswordText: {
    color: '#fff',
    fontFamily: 'PoppinsRegular',
    fontSize: '18@ms',
    textAlign: 'center',
  },
  changepasswordButtonIcon: {
    color: 'white',
    fontSize: '18@ms',
  },
});

export default ChangePasswordButton;
