import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import TextPrefixForInputfeild from '../Atoms/TextPrefixForInputfeild';
import { ScaledSheet } from 'react-native-size-matters';

interface TextInputWithPrefixProps {
  prefix: string;
  onChangeText: (text: string) => void;
  value: string;
}

const TextInputWithPrefix: React.FC<TextInputWithPrefixProps> = ({
  prefix,
  onChangeText,
  value,
}) => {
  return (
    <View style={styles.container}>
      <TextPrefixForInputfeild prefix={prefix} />
      <TextInput
        style={styles.inputContainer}
        onChangeText={onChangeText}
        value={value}
        autoComplete="tel"
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#abcef5',
    borderWidth: 1,
    borderRadius: '10@ms',
    fontFamily: 'PoppinsRegular',
    flexDirection: 'row',
    marginHorizontal: '20@s',
    paddingHorizontal: '20@s',
  },
  inputContainer: {
    color: '#9E9E9E',
    flex: 1,
    fontSize: '14@ms',
     paddingVertical: '8@vs',
  },
});

export default TextInputWithPrefix;