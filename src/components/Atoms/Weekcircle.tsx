import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    width: 30,
    height: 30,
    borderRadius: 15,
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
  idInActiveText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "PoppinsMedium",
    color: '#494949',
  },
  idActiveText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "PoppinsMedium",
    color: 'white',
  },
});

export default Circle;