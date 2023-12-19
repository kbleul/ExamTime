import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';

type SubjectButtonProps = {
  text: string;
  subjectId: string;
  selectedSubjects: string[] | null;
  setSelectedSubjects: React.Dispatch<React.SetStateAction<string[] | null>>;
};

const SubjectButton: React.FC<SubjectButtonProps> = ({
  text,
  subjectId,
  selectedSubjects,
  setSelectedSubjects,
}) => {
  const onPress = () => {
    if (selectedSubjects === null) {
      setSelectedSubjects([subjectId]);
      return;
    }

    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(selectedSubjects.filter(item => item !== subjectId));
    } else {
      setSelectedSubjects(prev => {
        return prev && [...prev, subjectId];
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        selectedSubjects?.includes(subjectId)
          ? [style.buttons, style.buttonSelected]
          : style.buttons
      }>
      <Text
        style={
          selectedSubjects?.includes(subjectId)
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
    marginBottom: screenHeight * 0.045,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#D3D3D3',
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginRight: 10,
    borderRadius: 30,
    overflow: 'hidden',
  },

  buttonSelected: {
    backgroundColor: '#00509D',
    borderColor: '#00509D',
  },
  buttonText: {
    textAlign: 'center',
    color: '#D3D3D3',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: screenWidth * 0.035,
  },
  buttonTextSelected: {
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
  },
});

export default SubjectButton;
