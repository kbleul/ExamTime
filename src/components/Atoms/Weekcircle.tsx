import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { screenHeight, screenWidth } from '../../utils/Data/data';
import scale from '../../utils/Functions/Scale';

interface CircleProps {
  isActive: boolean;
  id: number;
}

const Circle: React.FC<CircleProps> = ({ isActive, id }) => {
  const circleStyle = isActive ? styles.activeCircle : styles.inactiveCircle;
  const idTextStyle = isActive ? styles.idActiveText : styles.idInactiveText;

  return (
    <View style={[styles.circle, circleStyle]}>
      <Text style={idTextStyle}>{id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
  },
  inactiveCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EAEE',
  },
  idInactiveText: {
    fontSize: scale(18),
    textAlign: "center",
    fontFamily: "PoppinsMedium",
    color: '#494949',
  },
  idActiveText: {
    textAlign: "center",
    fontSize: scale(18),
    fontFamily: "PoppinsMedium",
    color: 'white',
  },
});

export default Circle;