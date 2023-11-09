import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface DoneButtonProps {
  onPress: () => void;
}

const DoneButton: React.FC<DoneButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.doneContainer} onPress={onPress}>
      <Text style={styles.doneText}>Done</Text>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  doneContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: '5@s',
    marginTop: '10@vs',
  },
  doneText: {
    color: '#1E90FF',
    fontFamily: 'PoppinsRegular',
    fontSize: '20@ms',
  },
});

export default DoneButton;