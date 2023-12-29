import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import {faqType} from '../Molecules/Accordion';

const FaqContent: React.FC = ({faqContent}: {faqContent: faqType}) => {
  return (
    <View style={styles.content}>
      <Text style={styles.contenttext}>{faqContent.answer}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 4,
    borderColor: '#E1E1E1',
    borderBottomWidth: 1,
  },
  AccordionContainer: {
    marginHorizontal: screenWidth * 0.02,
  },
  contenttext: {
    borderRadius: screenWidth * 0.02,
    fontFamily: 'PoppinsRegular',
    color: '#919192',
    fontSize: screenHeight * 0.02,
    paddingRight: 10,
  },
});
export default FaqContent;
