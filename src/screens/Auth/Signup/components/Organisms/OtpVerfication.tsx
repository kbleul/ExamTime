import React, {useRef} from 'react';
import {View, TextInput} from 'react-native';
import {OPTStyles} from '../../Styles';

const VerificationCodeForm = () => {
  const inputRefs = useRef<Array<TextInput>>([]);

  const focusNextInput = (index: number) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const focusPreviousInput = (index: number) => {
    console.log('index: ', index);
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    console.log(index, key === 'Backspace');
    if (
      key === 'Backspace' &&
      index > 0 &&
      inputRefs.current[index].value === ''
    ) {
      console.log('xsxsx', key);

      // If Backspace is pressed and the current input is empty
      // Focus the previous input and clear its value
      focusPreviousInput(index);
      inputRefs.current[index - 1].clear();
    } else if (index < inputRefs.current.length - 1 && key.length === 1) {
      // If a character is entered and the current input is not the last one
      // Focus the next input and set its value to the entered character
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <View>
      <TextInput
        style={OPTStyles.input}
        ref={ref => (inputRefs.current[0] = ref)}
        maxLength={1}
        keyboardType="numeric"
        autoFocus
        onChangeText={text => {
          if (text.length === 1) {
            focusNextInput(0);
          }
        }}
        onKeyPress={({nativeEvent: {key}}) => {
          handleKeyPress(0, key);
        }}
      />
      <TextInput
        style={OPTStyles.input}
        ref={ref => (inputRefs.current[1] = ref)}
        maxLength={1}
        keyboardType="numeric"
        onChangeText={text => {
          if (text.length === 1) {
            focusNextInput(1);
          }
        }}
        onKeyPress={({nativeEvent: {key}}) => {
          handleKeyPress(1, key);
        }}
      />
      <TextInput
        style={OPTStyles.input}
        ref={ref => (inputRefs.current[2] = ref)}
        maxLength={1}
        keyboardType="numeric"
        onChangeText={text => {
          if (text.length === 1) {
            focusNextInput(2);
          }
        }}
        onKeyPress={({nativeEvent: {key}}) => {
          handleKeyPress(2, key);
        }}
      />
      <TextInput
        style={OPTStyles.input}
        ref={ref => (inputRefs.current[3] = ref)}
        maxLength={1}
        keyboardType="numeric"
        onChangeText={text => {
          if (text.length === 1) {
            focusNextInput(3);
          }
        }}
        onKeyPress={({nativeEvent: {key}}) => {
          handleKeyPress(3, key);
        }}
      />
    </View>
  );
};

export default VerificationCodeForm;
