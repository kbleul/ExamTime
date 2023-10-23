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
      <Text
        style={
          selectedGrades?.includes(text)
            ? [style.buttonText, style.buttonTextSelected]
            : style.buttonText
        }>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  buttons: {
    width: 'auto',
    marginBottom: 30,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#D3D3D3',
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginRight: 10,
    borderRadius: 30,
  },

  buttonSelected: {
    backgroundColor: '#1E90FF',
    borderColor: '#1E90FF',
  },
  buttonText: {
    textAlign: 'center',
    color: '#D3D3D3',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  buttonTextSelected: {
    color: '#fff',
  },
});

export default SubjectButton;
