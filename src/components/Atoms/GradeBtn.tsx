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
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelected && setSelected(index);
        onPress && onPress();
      }}
      style={style.buttons}>
      <Text style={style.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  buttons: {
    marginBottom: 6,
    marginHorizontal: 6,
    backgroundColor: '#008E97',
    paddingVertical: 11,
    paddingHorizontal: 25,
    borderRadius: 30,
  },

  buttonSelected: {
    backgroundColor: '#6A5ACD',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
});

export default GradeButton;
