import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

interface DoneButtonProps {
  onPress: () => void;
  isLoading: boolean;
}

const DoneButton: React.FC<DoneButtonProps> = ({onPress, isLoading}) => {
  return (
    <TouchableOpacity
      style={styles.doneContainer}
      onPress={onPress}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.doneText}>Done</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  doneContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  doneText: {
    color: '#1E90FF',
    fontFamily: 'PoppinsRegular',
    fontSize: '18@ms',
  },
});

export default DoneButton;
