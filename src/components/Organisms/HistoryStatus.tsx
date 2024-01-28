import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import CircleProgressIndicator from '../Molecules/CircleProgressIndicatorsHistory';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HistoryStatus = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Status</Text>

      <View style={styles.statusContainer}>
        <CircleProgressIndicator progress={50} />
        <View style={styles.statusTextContainer}>
          <Text style={styles.statusHeaderTexts}>Level up your knowledge.</Text>
          <Text style={styles.statusHeaderTexts}>Unlock new achievements!</Text>

          <SubjectsStats />
        </View>
      </View>
    </View>
  );
};

const SubjectsStats = () => {
  return (
    <View style={subjectsStyles.subjectsContainer}>
      <View style={subjectsStyles.subjectsSubContainer}>
        <View style={subjectsStyles.subjectsPercentage}>
          <AntDesign name="arrowup" size={20} color="green" />
          <Text style={subjectsStyles.text1}>25%</Text>
        </View>
        <Text style={subjectsStyles.text2}>Chemistry</Text>
      </View>
      <View style={subjectsStyles.subjectsSubContainer}>
        <View style={subjectsStyles.subjectsPercentage}>
          <AntDesign name="arrowup" size={20} color="red" />
          <Text style={subjectsStyles.text1}>40%</Text>
        </View>
        <Text style={subjectsStyles.text2}>Subject</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.23,
  },
  headerTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.045, //28
    color: '#000',
    lineHeight: screenHeight * 0.045, //34
  },
  statusContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: screenWidth * 0.06,
    marginTop: screenHeight * 0.002,
  },
  statusTextContainer: {
    width: '60%',
  },
  statusHeaderTexts: {
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.04,
    color: '#868B98',
  },
  subjects: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: screenHeight * 0.06,
  },
});

const subjectsStyles = StyleSheet.create({
  subjectsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: screenHeight * 0.01,
  },
  subjectsSubContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '50%',
  },
  subjectsPercentage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  text1: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.05,
    color: 'black',
    lineHeight: screenWidth * 0.055,
    paddingTop: screenHeight * 0.002,
  },
  text2: {
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.038,
    color: '#85949F',
    lineHeight: screenWidth * 0.04,
    width: '100%',
    paddingLeft: screenWidth * 0.015,
    paddingTop: screenWidth * 0.015,
  },
});
export default HistoryStatus;
