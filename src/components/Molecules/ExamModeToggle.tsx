import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ExamModeToggle = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <View style={styles.constainer}>
      <Text style={styles.text}>Exam Mode</Text>
      <View style={styles.toggleConstainer}>
        <TouchableOpacity touchSoundDisabled style={{}}>
          <Text style={styles.text}>Off</Text>
        </TouchableOpacity>

        <View style={styles.toggleIconContainer}>
          <TouchableOpacity
            touchSoundDisabled
            onPress={() => setToggle(prev => !prev)}>
            {toggle ? (
              <MaterialCommunityIcons
                style={toggle ? [styles.icon, styles.iconActive] : styles.icon}
                name="toggle-switch-outline"
              />
            ) : (
              <MaterialCommunityIcons
                style={toggle ? [styles.icon, styles.iconActive] : styles.icon}
                name="toggle-switch-off-outline"
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity touchSoundDisabled style={{}}>
          <Text style={styles.text}>On</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  constainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleConstainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    color: '#4d4d4d',
    fontSize: 16,
  },
  toggleIconContainer: {
    marginHorizontal: 10,
  },
  icon: {
    fontSize: 35,
    color: '#7d7c7c',
  },
  iconActive: {
    color: '#0BFC06',
  },
});

export default ExamModeToggle;
