import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { screenHeight, screenWidth } from '../../utils/Data/data';

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
    width: screenWidth * 0.07,
    height: screenWidth * 0.07,
    borderRadius: (screenWidth * 0.07) / 2,
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
    fontSize: screenHeight * 0.022,
    textAlign: "center",
    fontFamily: "PoppinsMedium",
    color: '#494949',
  },
  idActiveText: {
    textAlign: "center",
    fontSize: screenHeight * 0.022,
    fontFamily: "PoppinsMedium",
    color: 'white',
  },
});

export default Circle;