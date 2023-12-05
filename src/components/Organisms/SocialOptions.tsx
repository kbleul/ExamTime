import React from 'react';
import {Text} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet} from 'react-native';

const SocialOptions = () => {
  return (
    <View style={styles.container}>
      <View style={styles.authOptionsContainer}>
        <View style={styles.authOptionsTextContainer}>
          <View style={styles.dividerLines} />
          <Text style={styles.dividerText}>or sign in with</Text>
          <View style={styles.dividerLines} />
        </View>
      </View>

      <View style={styles.optionsIconContainer}>
        <TouchableOpacity touchSoundDisabled>
          <AntDesign name="google" color={'#5865F2'} size={32} />
        </TouchableOpacity>
        <TouchableOpacity touchSoundDisabled>
          <FontAwesome5Brands name="facebook" color={'#1877F2'} size={32} />
        </TouchableOpacity>
        <TouchableOpacity touchSoundDisabled>
          <AntDesign name="twitter" color={'#2AABEE'} size={32} />
        </TouchableOpacity>
        <TouchableOpacity touchSoundDisabled>
          <AntDesign name="apple1" color={'#000'} size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
// SignupForm
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  authOptionsContainer: {
    marginTop: 40,
    width: '100%',
  },
  authOptionsTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerLines: {
    width: '33.33%',
    borderTopWidth: 1,
    borderColor: '#B5C3E5',
  },
  dividerText: {
    width: '33.33%',
    color: '#858585',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  optionsIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: '#c9c7c7',
    paddingVertical: 8,
    paddingHorizontal: 30,
    marginTop: 20,
  },
});
export default SocialOptions;
