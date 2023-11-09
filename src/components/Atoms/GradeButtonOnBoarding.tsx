import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type GradeButtonProps = {
  text: string;
  index: number;
  selected?: number;
  setSelected?: React.Dispatch<React.SetStateAction<number>>;
  onPress: () => void;
  isActive: boolean;
};

const GradeButton: React.FC<GradeButtonProps> = ({
  text,
  index,
  setSelected,
  onPress,
  isActive,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelected && setSelected(index);
        onPress && onPress();
      }}
      style={
        isActive ? style.buttonsLight : [style.buttonsLight, style.buttonsDark]
      }>
      <Text style={style.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  buttonsLight: {
    width: '80%',
    marginBottom: 10,
    marginRight: '3%',
    backgroundColor: '#1E90FF',
    marginLeft: '7%',
    paddingVertical: 13,
    borderRadius: 10,
  },
  buttonsDark: {
    backgroundColor: '#858585',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
});

export default GradeButton;
