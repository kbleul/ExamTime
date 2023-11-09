import {Text} from '@gluestack-ui/themed/build/components/Badge/styled-components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity, View} from 'react-native';

type AuthNavigatorOptionProps = {
  headingText: string;
  buttonText: string;
  onPress: () => void;
};
const AuthNavigatorOption: React.FC<AuthNavigatorOptionProps> = ({
  headingText,
  buttonText,
  onPress,
}) => {
  return (
    <View style={styles.regiterPromptContainer}>
      <Text style={styles.registerPromptText}>{headingText}</Text>
      <TouchableOpacity touchSoundDisabled onPress={onPress}>
        <Text style={styles.registerPromptBtnText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  regiterPromptContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  registerPromptText: {
    color: '#4F4F4F',
    fontFamily: 'PoppinsRegular',
    fontSize: 15,
    textTransform: 'none',
  },
  registerPromptBtnText: {
    color: '#1E90FF',
    fontFamily: 'Montserrat-Bold',
    marginLeft: 4,
    fontSize: 15,
    textTransform: 'none',
  },
});

export default AuthNavigatorOption;
