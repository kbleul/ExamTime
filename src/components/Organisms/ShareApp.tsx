import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet, Text, View} from 'react-native';
import {handleShare} from '../../utils/Functions/Helper';

function ShareApp() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Share the app</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity touchSoundDisabled onPress={handleShare}>
          <FontAwesome5Brands name="facebook" color={'#1877F2'} size={34} />
        </TouchableOpacity>
        <TouchableOpacity touchSoundDisabled onPress={handleShare}>
          <AntDesign name="instagram" color={'red'} size={32} />
        </TouchableOpacity>
        <TouchableOpacity touchSoundDisabled onPress={handleShare}>
          <FontAwesome5Brands name="telegram" color={'#2AABEE'} size={32} />
        </TouchableOpacity>
        <TouchableOpacity touchSoundDisabled onPress={handleShare}>
          <FontAwesome5Brands name="discord" color={'#5865F2'} size={32} />
        </TouchableOpacity>
        <TouchableOpacity touchSoundDisabled onPress={handleShare}>
          <AntDesign name="link" size={32} color={'#000'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    width: '100%',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    color: '#858585',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    paddingBottom: 3,
    marginLeft: '5%',
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShareApp;
