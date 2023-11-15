import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import  Ionicons  from 'react-native-vector-icons';
import { screenWidth } from '../../utils/Data/data';


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
      <View style={styles.selfAssessment}>
        <View style={styles.leftSide}>
          <View style={styles.blueContainer} />
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
      <View style={styles.unitReviewNote}>
        <View style={styles.leftSide}>
          <View style={styles.redContainer} />
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
      <View style={styles.videoListContainer}>
        <View style={styles.videoLeft}>
          <Text style={styles.videoNumber}>01</Text>
          <View>
            <Text style={styles.videoTitle}>Get to know about cell biology</Text>
            <Text style={styles.videoDuration}>12.05 mins</Text>
          </View>
        </View>
        <View style={styles.rightSide}>
          <TouchableOpacity>
            <View style={styles.iconContainer}>
              <Ionicons name={'play'} size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    lcontainer: {
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#FAFCFA',
        padding: '1%',
        marginBottom: 5,
        width: screenWidth - 20,
        borderColor: "lightgrey",
        borderWidth: 1,
        borderRadius: 10,
    
      },
      Activelcontainer: {
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#FAFCFA',
        padding: '1%',
        // marginBottom: 5,
        borderColor: "lightgrey",
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: 0
    
      },
      imgContainer: {
        width: '20%',
        padding: 8,
      },
      imagebg: {
        width: '100%',
        height: 80,
        objectFit: "cover",
      },
      infoContainer: {
        width: '80%',
        padding: 10,
        flexDirection: "row",
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,
        alignItems: "center",
        justifyContent: 'space-between',
      },
      subject: {
        fontSize: 18,
        fontFamily: 'PoppinsMedium',
        textTransform: 'capitalize',
        color: '#1E90FF',
      },
      units: {
        fontSize: 16,
        fontFamily: 'PoppinsMedium',
        textTransform: 'capitalize',
        color: '#858585',
        paddingVertical: 2,
      },
  });
export default SubjectContent;