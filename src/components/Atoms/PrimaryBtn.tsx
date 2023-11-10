import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

type PrimaryBtnProps = {
  text: String;
  onPress?: () => void;
};
const PrimaryBtn: React.FC<PrimaryBtnProps> = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.Sendbtn} onPress={onPress}>
      <Text style={styles.sendbtnText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Sendbtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    marginTop: 10,
    paddingTop: 11,
    paddingRight: 23,
    paddingBottom: 11,
    paddingLeft: 23,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendbtnText: {
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 21,
    color: '#FFFFFF',
  },
});

export default PrimaryBtn;
