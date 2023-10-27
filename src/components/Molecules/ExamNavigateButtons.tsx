import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const ExamNavigateButtons: React.FC<{
  setExitExamModalVisible?: (value: boolean) => void;
  showFullPage: boolean;
}> = ({setExitExamModalVisible, showFullPage}) => {
  return (
    <View style={ButtonStyles.contaienr}>
      {!showFullPage && <Buttons text="Prev." bgColor="#0081BA" />}
      <Buttons
        text="End"
        bgColor="#4CB050"
        setExitExamModalVisible={setExitExamModalVisible}
      />
      {!showFullPage && <Buttons text="Next." bgColor="#0081BA" />}
    </View>
  );
};

const Buttons: React.FC<{
  text: string;
  bgColor: string;
  setExitExamModalVisible?: (value: boolean) => void;
}> = ({text, bgColor, setExitExamModalVisible}) => {
  return (
    <TouchableOpacity
      touchSoundDisabled
      style={[ButtonStyles.button, {backgroundColor: bgColor}]}
      onPress={() => setExitExamModalVisible && setExitExamModalVisible(true)}>
      <Text style={ButtonStyles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const ButtonStyles = StyleSheet.create({
  contaienr: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 20,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'PoppinsSemiBold',
    color: 'white',
    fontSize: 12,
  },
});
export default ExamNavigateButtons;
