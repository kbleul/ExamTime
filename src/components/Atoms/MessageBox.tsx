import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {screenWidth} from '../../utils/Data/data';

const MessageBox = ({title, subTitle}: {title?: string; subTitle?: string}) => {
  return (
    <View style={styles.restContainer}>
      <Text style={styles.restText}>{title}</Text>
      <Text style={styles.restSubText}>{subTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  restContainer: {
    width: '100%',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restText: {
    fontFamily: 'PoppinsBold',
    textAlign: 'center',
    fontSize: screenWidth * 0.05,
    paddingHorizontal: 10,
    color: '#3C3D6E',
  },
  restSubText: {
    fontFamily: 'PoppinsMedium',
    textAlign: 'center',
    fontSize: screenWidth * 0.04,
    paddingHorizontal: 30,
    color: '#000',
  },
});

export default MessageBox;
