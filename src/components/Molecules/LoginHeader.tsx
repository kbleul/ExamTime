import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {screenHeight} from '../../utils/Data/data';

const LoginHeader: React.FC<{navigate: () => void}> = ({navigate}) => {
  return (
    <View style={styles.topSectionContainer}>
      <TouchableOpacity
        touchSoundDisabled
        onPress={navigate}
        style={styles.backIconContainer}>
        <Entypo name="chevron-left" size={30} color="#4D4D4D" />
      </TouchableOpacity>

      <View style={styles.imgcontainer}>
        <FontAwesome6 name="user-large" size={50} color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topSectionContainer: {
    height: (screenHeight * 1) / 5,
    position: 'relative',
    marginTop: 10,
  },
  backIconContainer: {
    position: 'absolute',
    top: 0,
    left: 10,
  },
  imgcontainer: {
    borderColor: 'black',
    width: 111,
    height: 111,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0066B2',
  },
});
export default LoginHeader;
