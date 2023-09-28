import React from 'react';
import {View, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const StepIndicator: React.FC<{currentStep: number}> = ({currentStep}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContIner, styles.iconContIner_active]}>
        <FontAwesome6 name="user" size={24} color="#F5A52D" />
      </View>
      <View style={styles.divider} />
      <View style={styles.iconContIner}>
        <MaterialIcons name="password" size={24} />
      </View>
      <View style={styles.divider} />
      <View style={styles.iconContIner}>
        <FontAwesome6 name="message" size={24} />
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
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  iconContIner_active: {
    backgroundColor: '#FFF5FD',
    borderColor: '#F5A52D',
  },
  divider: {
    width: 50,
    borderTopWidth: 1,
    marginHorizontal: 5,
  },
});

export default StepIndicator;
