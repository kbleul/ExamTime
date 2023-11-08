import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface BackButtonProps {
  onPress: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.iconContainer}
      touchSoundDisabled
      onPress={onPress}
    >
      <AntDesign name="left" style={styles.backIcon} size={ms(24)} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    iconContainer: {
    color: 'black',
  },
  backIcon: {
    color: 'black',
  },
});

export default BackButton;