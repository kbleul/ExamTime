import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {screenHeight, screenWidth} from '../../utils/Data/data';

interface SubjectContentProps {
  section: {
    unit: string;
    lesson: string;
    progress: number;
  };
}

const SubjectContent: React.FC<SubjectContentProps> = ({section}) => {
  return (
    <View style={styles.content}>
      <Text style={styles.contenttext}>
        Your expected ability for this chapter is between 2.0 - 2.4. Estimate
        your ability using the following self-assessment.
      </Text>
      <View style={styles.SelfAssessment}>
        <View style={styles.LeftSide}>
          <View style={styles.BlueConatibner} />
          <Text style={styles.contentSubText}>Self Assessment</Text>
        </View>
        <View style={styles.rightSide}>
          <TouchableOpacity>
            <Ionicons
              name={'tablet-landscape-outline'}
              size={20}
              color="#333333"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.SelfAssessment}>
        <View style={styles.LeftSide}>
          <View style={styles.RedConatibner} />
          <Text style={styles.contentSubText}>Unit Review Note</Text>
        </View>
        <View style={styles.rightSide}>
          <TouchableOpacity>
            <Ionicons
              name={'tablet-landscape-outline'}
              size={20}
              color="#333333"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.VedioListContainer}>
        <View style={styles.vedioLeft}>
          <Text style={styles.vedioNumber}>01</Text>
          <View>
            <Text style={styles.vedioNumber}>
              Get to know about cell biology
            </Text>
            <Text style={styles.vedioNumber}>12.05 mins</Text>
          </View>
        </View>
        <View style={styles.rightSide}>
          <TouchableOpacity>
            <View style={styles.IconContainer}>
              <Ionicons name={'play'} size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    padding: screenWidth * 0.01,
    borderBottomLeftRadius: screenWidth * 0.02,
    borderBottomRightRadius: screenWidth * 0.02,
    borderTopWidth: 0,
    backgroundColor: '#FAFCFA',
    width: screenWidth - 30,
    paddingVertical: screenHeight * 0.02,
    paddingHorizontal: screenWidth * 0.02,
  },
  AccordionContainer: {
    marginHorizontal: screenWidth * 0.02,
    marginTop: screenHeight * 0.02,
  },
  contenttext: {
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderRadius: screenWidth * 0.02,
    overflow: 'hidden',
    padding: screenWidth * 0.02,
    fontFamily: 'PoppinsRegular',
    color: 'grey',
    fontSize: screenHeight * 0.018,
  },
  SelfAssessment: {
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderRadius: screenWidth * 0.02,
    overflow: 'hidden',
    padding: screenWidth * 0.02,
    marginTop: screenHeight * 0.02,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    fontSize: screenHeight * 0.028,
  },
  BlueConatibner: {
    height: screenWidth * 0.091,
    width: screenWidth * 0.091,
    backgroundColor: '#399BE2',
    borderRadius: screenWidth * 0.01,
  },
  RedConatibner: {
    height: screenWidth * 0.091,
    width: screenWidth * 0.091,
    backgroundColor: '#EB66A3',
    borderRadius: screenWidth * 0.01,
    overflow: 'hidden',
  },
  contentSubText: {
    fontFamily: 'PoppinsRegular',
    color: 'black',
    fontSize: screenHeight * 0.018,
  },
  LeftSide: {
    gap: screenWidth * 0.016,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightSide: {},
  VedioListContainer: {
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderRadius: screenWidth * 0.02,
    overflow: 'hidden',
    padding: screenWidth * 0.02,
    marginTop: screenHeight * 0.02,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    fontSize: screenHeight * 0.028,
  },
  vedioLeft: {
    gap: screenWidth * 0.016,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  vedioNumber: {
    textAlign: 'left',
    fontSize: screenHeight * 0.018,
    fontFamily: 'PoppinsMedium',
    color: '#BEB3EA',
  },
  IconContainer: {
    height: screenWidth * 0.125,
    width: screenWidth * 0.125,
    borderRadius: screenWidth * 0.02,
    overflow: 'hidden',
    backgroundColor: '#9A85FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SubjectContent;
