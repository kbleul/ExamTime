import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import PrimaryBtn from '../Atoms/PrimaryBtn';

type SendMessageBtnProps = {
  onPress?: (text: any) => void;
  isLoading: boolean;
};

const SendUsmessage: React.FC<SendMessageBtnProps> = ({onPress, isLoading}) => {
  const [text, setText] = useState();

  const handleTextChange = (newText: any) => {
    setText(newText);
  };
  const SendComment = () => {
    onPress && onPress(text);
  };
  return (
    <View style={styles.sendUsmessage}>
      <Text style={styles.messageText}>messeage</Text>
      <TextInput
        onChangeText={handleTextChange}
        multiline
        numberOfLines={4}
        style={styles.messageInput}
      />
      <PrimaryBtn text="Send" onPress={SendComment} isLoading={isLoading} />
    </View>
  );
};
const styles = StyleSheet.create({
  sendUsmessage: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 6,
  },
  messageText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    color: '#4D4D4D',
    margin: 4,
    fontSize: 18,
  },
  messageInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#0D66D03B',
    borderWidth: 0.5,
    height: 94,
    width: '100%',
  },
});
export default SendUsmessage;
