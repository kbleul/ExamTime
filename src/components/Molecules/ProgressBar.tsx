import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ProgressBar = () => {
  const PRECENT = 40;
  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={[styles.barSubContainer, {width: `${PRECENT}%`}]} />
        <View style={[styles.iconContainer, {left: `${PRECENT - 5}%`}]}>
          <FontAwesome5 name="user-alt" size={20} style={styles.icon} />
        </View>
      </View>
      <Text style={styles.text}>Your progress</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  barContainer: {
    height: 33,
    width: '94%',
    marginLeft: '3%',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#008E97',
    position: 'relative',
  },
  barSubContainer: {
    backgroundColor: '#008E97',
    height: '100%',
    borderRadius: 6,
    overflow: 'hidden',
  },
  iconContainer: {
    position: 'absolute',
    top: -10,
    height: 50,
    width: 50,
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 250,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
  },
  icon: {
    color: '#fff',
  },
  text: {
    marginLeft: 25,
    fontSize: 16,
    color: '#222E50',
    fontFamily: 'Montserrat-Regular',
  },
});

export default ProgressBar;
