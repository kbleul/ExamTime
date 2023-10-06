import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type SubjectButtonProps = {
  text: string;
  selectedGrades?: string[] | undefined;
  setSelectedGrades?: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >;
};

const SubjectButton: React.FC<SubjectButtonProps> = ({
  text,
  selectedGrades,
  setSelectedGrades,
}) => {
  const onPress = (grade: string) => {
    if (selectedGrades && setSelectedGrades) {
      if (selectedGrades.includes(grade)) {
        setSelectedGrades(selectedGrades.filter(item => item !== grade));
      } else {
        !selectedGrades.includes(grade) &&
          setSelectedGrades(prev => {
            return prev ? [...prev, grade] : [];
          });
      }
    }
  };
  return (
    <TouchableOpacity
      onPress={() => onPress(text)}
      style={
        selectedGrades?.includes(text)
          ? [style.buttons, style.buttonSelected]
          : style.buttons
      }>
      <Text style={style.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  buttons: {
    width: '30%',
    marginBottom: 10,
    backgroundColor: '#008E97',
    paddingVertical: 13,
    borderRadius: 30,
  },

  buttonSelected: {
    backgroundColor: '#6A5ACD',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
});

export default SubjectButton;
