import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ExamTimer = () => {
  return (
    <View style={styles.container}>
      {/* <Image
        style={{}}
        source={require('../../assets/Images/home/s2.png')}
        resizeMode="cover"
      /> */}
      {/* <MaterialCommunityIcons name="timer-outline" color="#008e97" size={20} /> */}
      <Image
        source={require('../../assets/Images/gif/watch.gif')}
        style={styles.watchImg}
      />

      <Text style={styles.timeText}>49:30</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#008e97',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    position: 'absolute',
    bottom: 80,
    left: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 18,
    color: '#008e97',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 10,
  },
  watchImg: {
    width: 32,
    height: 32,
  },
});

export default ExamTimer;
