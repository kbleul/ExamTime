import React from 'react';
import {View, Image, StyleSheet, ImageBackground} from 'react-native';

const PracticeImageHeader = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.img}
        source={require('../../assets/Images/Practice/HeaderImg.png')} // Replace with the correct path to your image
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
  img: {
    width: '100%',
    height: 100,
  },
});

export default PracticeImageHeader;
