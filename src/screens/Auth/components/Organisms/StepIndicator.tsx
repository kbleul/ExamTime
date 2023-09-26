import React from 'react';
import {View, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const StepIndicator = () => {
  const step = 1;
  return (
    <View style={styles.container}>
      <View style={styles.iconContIner}>
        <FontAwesome6 name="user" size={20} />
      </View>
      <View style={styles.divider} />
      <View style={styles.iconContIner}>
        <MaterialIcons name="password" size={20} />
      </View>
      <View style={styles.divider} />
      <View style={styles.iconContIner}>
        <FontAwesome6 name="message" size={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginLeft: '5%',
    marginVertical: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  iconContIner: {
    borderWidth: 1,
    borderStyle: 'dotted',
    borderRadius: 100,
    padding: 13,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: 40,
    borderTopWidth: 1,
    marginHorizontal: 5,
  },
});

export default StepIndicator;
