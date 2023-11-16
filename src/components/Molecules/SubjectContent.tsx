import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { screenHeight, screenWidth } from '../../utils/Data/data';


interface SubjectContentProps {
  section: {
    unit: string;
    lesson: string;
    progress: number;
  };
}

const SubjectContent: React.FC<SubjectContentProps> = ({ section }) => {
  return (
    <View style={styles.content}>
      <Text style={styles.contenttext}>
        Your expected ability for this chapter is between 2.0 - 2.4. Estimate your ability using the following self-assessment.
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
            <Text style={styles.vedioNumber}>Get to know about cell biology</Text>
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
    padding: 6,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 0,
    backgroundColor: '#FAFCFA',
     width: screenWidth - 30,
     paddingVertical: '2%',
     paddingHorizontal:"2%",
  },
  AccordionContainer: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  contenttext: {
    borderColor: "#E1E1E1",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontFamily: "PoppinsRegular",
    color: 'grey',
    fontSize: screenHeight * 0.02,
  },
  SelfAssessment: {
    borderColor: "#E1E1E1",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    fontSize: screenHeight * 0.02,
  },
  BlueConatibner: {
    height: 40,
    width: 40,
    backgroundColor: "#399BE2",
    borderRadius: 5,
  },
  RedConatibner: {
    height: 40,
    width: 40,
    backgroundColor: "#EB66A3",
    borderRadius: 5,
  },
  contentSubText: {
    fontFamily: "PoppinsRegular",
    color: 'black',
    fontSize: screenHeight * 0.02,
  },
  LeftSide: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rightSide: {

  },
  VedioListContainer: {
    borderColor: "#E1E1E1",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    fontSize: screenHeight * 0.02,
  },
  vedioLeft: {
    gap: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  vedioNumber: {
    textAlign: "left",
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    color: '#BEB3EA'
  },
  IconContainer: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: "#9A85FC",
    alignItems: "center",
    justifyContent: "center",
  }
  });
export default SubjectContent;