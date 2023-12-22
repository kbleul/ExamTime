import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

interface TextPrefixProps {
  prefix: string;
}

const TextPrefix: React.FC<TextPrefixProps> = ({prefix}) => {
  return <Text style={styles.prefixText}>{prefix}</Text>;
};

const styles = ScaledSheet.create({
  prefixText: {
    fontSize: '16@ms',
    fontWeight: 'bold',
    marginRight: '5@s',
    color: '#abaaa9',
  },
});

export default TextPrefix;
