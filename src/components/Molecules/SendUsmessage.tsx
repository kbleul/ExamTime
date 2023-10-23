import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import PrimaryBtn from '../Atoms/PrimaryBtn';

const SendUsmessage: React.FC<{onPress: () => void}> = ({onPress}) => {
  return (
    <View style={styles.sendUsmessage}>
      <Text style={styles.messageText}>messeage</Text>
      <TextInput multiline numberOfLines={4} style={styles.messageInput} />
      <PrimaryBtn text="Send" onPress={onPress} />
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
    borderColor: '#0D66D03B',
    borderWidth: 0.5,
    height: 94,
    width: '100%',
  },
});
export default SendUsmessage;
