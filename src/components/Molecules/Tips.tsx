import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Tips = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <ImageBackground
          style={styles.imageBG}
          source={require('../../assets/Images//Practice/tip.png')} // Replace with the correct path to your image
          resizeMode="cover"
        />
      </View>
      <TouchableOpacity touchSoundDisabled style={styles.textContainer}>
        <Text style={styles.tipText}>
          Your expected ability for this chapter is between 2.0 -- 2.4.
          Estimated your ability using the following Estimated your ability
          using the followin{'...'}
        </Text>
        <Text style={[styles.readmore, styles.readmore]}>Read more</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginTop: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#5EB4CF',
  },
  imgContainer: {
    width: '25%',
    borderRadius: 300,
    overflow: 'hidden',
  },
  imageBG: {
    width: '100%',
    height: 95,
  },
  textContainer: {
    width: '80%',
    paddingHorizontal: 20,
  },
  tipText: {
    fontFamily: 'PoppinsRegular',
    color: 'black',
    fontSize: 13,
  },
  readmore: {
    color: '#1E90FF',
  },
});

export default Tips;
