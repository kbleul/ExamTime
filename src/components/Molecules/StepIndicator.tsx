import React from 'react';
import {View, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const StepIndicator: React.FC<{currentStep: number}> = ({currentStep}) => {
  return (
    <View style={styles.container}>
      <View
        style={
          currentStep === 1
            ? [styles.iconContIner, styles.iconContIner_active]
            : [styles.iconContIner, styles.iconContIner_completed]
        }>
        <FontAwesome6
          name="user"
          size={27}
          style={
            currentStep === 1
              ? [styles.icon, styles.iconActive]
              : [styles.icon, styles.iconCompleted]
          }
        />
        <AntDesign
          name="check"
          size={24}
          style={currentStep > 1 ? styles.checkIcon : styles.checkIcon_hidden}
        />
      </View>
      <View
        style={
          currentStep > 1
            ? [styles.divider, styles.dividerActive]
            : styles.divider
        }
      />
      <View
        style={
          currentStep === 2
            ? [styles.iconContIner, styles.iconContIner_active]
            : currentStep === 3
            ? [styles.iconContIner, styles.iconContIner_completed]
            : styles.iconContIner
        }>
        <MaterialIcons
          name="password"
          size={27}
          style={
            currentStep === 2
              ? [styles.iconActive]
              : currentStep === 3
              ? [styles.icon, styles.iconCompleted]
              : [styles.icon]
          }
        />
        <AntDesign
          name="check"
          size={24}
          style={currentStep > 2 ? styles.checkIcon : styles.checkIcon_hidden}
        />
      </View>
      <View
        style={
          currentStep === 3
            ? [styles.divider, styles.dividerActive]
            : styles.divider
        }
      />
      <View
        style={
          currentStep === 3
            ? [styles.iconContIner, styles.iconContIner_active]
            : styles.iconContIner
        }>
        <Ionicons
          name="mail-outline"
          size={26}
          style={currentStep === 3 ? [styles.iconActive] : [styles.icon]}
        />
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
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 2,
    padding: 13,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderColor: '#F9F9F9',
    position: 'relative',
  },
  iconContIner_active: {
    backgroundColor: '#fffefc',
    borderColor: '#F5A52D',
    borderStyle: 'dotted',
  },
  iconContIner_completed: {
    borderWidth: 2,
    borderColor: '#1E90FF',
    borderStyle: 'solid',
    backgroundColor: '#FFFFFF',
  },
  icon: {
    color: '#858585',
  },
  iconActive: {
    color: '#F5A52D',
  },
  iconCompleted: {
    color: '#1E90FF',
  },
  checkIcon: {
    position: 'absolute',
    top: -5,
    right: -8,
    zIndex: 10,
    backgroundColor: '#FFFFFF',
    color: '#1E90FF',
  },
  checkIcon_hidden: {
    display: 'none',
  },
  divider: {
    width: 60,
    borderTopWidth: 1,
    marginHorizontal: 5,
  },
  dividerActive: {
    borderColor: '#1E90FF',
    borderWidth: 2,
  },
});

export default StepIndicator;
