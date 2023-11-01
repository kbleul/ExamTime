import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const Tips = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        {/* <ImageBackground
          style={styles.imageBG}
          source={require('../../assets/Images//Practice/tip.png')} // Replace with the correct path to your image
          resizeMode="cover"
        /> */}
        <Image
          style={styles.image}
          source={require('../../assets/Images//Practice/tip.png')}
          resizeMode="cover"
        />
      </View>
      <TouchableOpacity touchSoundDisabled style={styles.textContainer}>
        <Text style={styles.tipTitle}>TIPS & TRICKS FOR PHYSICS EXAM</Text>
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
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#5EB4CF',
  },
  imgContainer: {
    width: '14%',
    borderRadius: 300,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    minWidth: 25,
    height: 37,
  },
  textContainer: {
    width: '86%',
    paddingHorizontal: '2%',
  },
  tipTitle: {
    fontFamily: 'PoppinsSemiBold',
    color: 'black',
    fontSize: 13,
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
