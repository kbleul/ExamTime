import React, {useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Accordion: React.FC<{question: String; answer: String}> = ({
  question,
  answer,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={styles.faqBtn}
        onPress={() => {
          setShowAnswer(!showAnswer);
        }}>
        <Text style={styles.faqbtnTxt}>{question}</Text>
      </TouchableOpacity>
      {showAnswer ? (
        <Text style={styles.answerTextContener}>
          <Text style={styles.span}>Answer:</Text> {answer}
        </Text>
      ) : (
        ''
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  faqBtn: {
    height: 44,

    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#0D66D03B',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  faqbtnTxt: {
    fontWeight: '500',
    fontSize: 15,
    fontFamily: 'Montserrat',
    lineHeight: 18,
  },
  answerTextContener: {
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    color:"#1E90FF",
    textAlign:"justify"
  },
  span: {
    fontFamily:"Montserrat",
    fontWeight:"700",
    fontSize:14,
    lineHeight:17,
    
  },
});
export default Accordion;
