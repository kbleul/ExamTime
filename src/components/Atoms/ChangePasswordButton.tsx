import React, {FC} from 'react';
import {TouchableOpacity, Text} from 'react-native';

import {ScaledSheet} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface ChangePasswordButtonProps {
  onPress: () => void;
}

const ChangePasswordButton: FC<ChangePasswordButtonProps> = ({onPress}) => {
  return (
    <TouchableOpacity
      style={[
        styles.inputContainer,
        styles.changePassword,
        styles.changePasswordButton,
      ]}
      onPress={onPress}>
      <Text style={styles.changePasswordText}>Change Password</Text>
      <AntDesign name="right" style={styles.changepasswordButtonIcon} />
    </TouchableOpacity>
  );
};
const styles = ScaledSheet.create({
  inputContainer: {
    color: '#9E9E9E',
    flex: 1,
    fontSize: '16@ms',
    paddingVertical: '10@vs',
  },
  changePassword: {
    backgroundColor: '#1E90FF',
  },
  changePasswordButton: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    marginBottom: '40@ms',
    marginHorizontal: '20@ms',
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
