import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const CustomTextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <TextInput
      style={styles.inputContainer}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = ScaledSheet.create({
  inputContainer: {
    backgroundColor: 'white',
    borderColor: '#abcef5',
    borderWidth: 1,
    borderRadius: '10@s',
    color: '#858585',
    fontSize: '14@ms',
    marginHorizontal: '20@s',
    marginVertical: '5@vs',
    paddingHorizontal: '20@s',
    paddingVertical: '8@vs',
  },
});

export default CustomTextInput;