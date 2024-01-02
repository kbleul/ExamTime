import React, {FC} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface PasswordFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  placeholder: string;
  showPassword: boolean;
  togglePassword: () => void;
}

const PasswordField: FC<PasswordFieldProps> = ({
  value,
  onChangeText,
  onBlur,
  placeholder,
  showPassword,
  togglePassword,
}) => {
  return (
    <View style={styles.commonTextFeildStyle}>
      <TextInput
        style={styles.inputContainer}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        secureTextEntry={showPassword}
        placeholderTextColor={'#d4d4d4'}
      />
      {showPassword ? (
        <TouchableOpacity
          style={styles.smallBox}
          touchSoundDisabled
          onPress={togglePassword}>
          <Ionicons name="eye-outline" size={20} color="#81afe6" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.smallBox}
          touchSoundDisabled
          onPress={togglePassword}>
          <Ionicons name="eye-off-outline" size={20} color="#81afe6" />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = ScaledSheet.create({
  inputContainer: {
    color: '#9E9E9E',
    flex: 1,
    fontSize: '14@ms',
    paddingVertical: '8@vs',
  },
  changePassword: {
    backgroundColor: '#1E90FF',
  },
  commonTextFeildStyle: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#abcef5',
    borderWidth: 1,
    borderRadius: '10@ms',
    overflow: 'hidden',
    fontFamily: 'PoppinsRegular',
    flexDirection: 'row',
    marginHorizontal: '20@s',
    marginVertical: '3@vs',
    paddingHorizontal: '20@s',
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
  smallBox: {
    alignItems: 'center',
    color: '#b3b3b3',
    fontSize: '20@ms',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
export default PasswordField;
