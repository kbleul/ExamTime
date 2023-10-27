import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ExamTimer = () => {
  return (
    <View style={styles.container}>
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
    paddingVertical: 2,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 10,
  },
  timeText: {
    fontSize: 16,
    color: '#008e97',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 5,
  },
  watchImg: {
    width: 35,
    height: 35,
  },
});

export default ExamTimer;
