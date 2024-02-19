import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import CircleProgressIndicator from '../Molecules/CircleProgressIndicatorsHistory';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  getAggrgategaStudiesProgress,
  getTopAndBottomStudyProgress,
} from '../../utils/Functions/Helper/historyCalculations';
import {AuthContext} from '../../Realm/model';

const HistoryStatus = () => {
  const {useRealm} = AuthContext;
  const realm = useRealm();
  getTopAndBottomStudyProgress(realm);
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Status</Text>

      <View style={styles.statusContainer}>
        <CircleProgressIndicator
          progress={getAggrgategaStudiesProgress(realm)}
        />
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
  const {useRealm} = AuthContext;
  const realm = useRealm();
  const topAndBottom = getTopAndBottomStudyProgress(realm);
  return (
    <>
      {topAndBottom && (
        <View style={subjectsStyles.subjectsContainer}>
          <View style={subjectsStyles.subjectsSubContainer}>
            <View style={subjectsStyles.subjectsPercentage}>
              <AntDesign name="arrowup" size={20} color="green" />
              <Text style={subjectsStyles.text1}>
                {topAndBottom.top.value}%
              </Text>
            </View>
            <Text style={subjectsStyles.text2}>{topAndBottom.top.name}</Text>
          </View>
          <View style={subjectsStyles.subjectsSubContainer}>
            <View style={subjectsStyles.subjectsPercentage}>
              <AntDesign name="arrowup" size={20} color="red" />
              <Text style={subjectsStyles.text1}>
                {topAndBottom.bottom.value}%
              </Text>
            </View>
            <Text style={subjectsStyles.text2}>{topAndBottom.bottom.name}</Text>
          </View>
        </View>
      )}
    </>
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
  },
  statusTextContainer: {
    width: '60%',
  },
  statusHeaderTexts: {
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.036,
    color: '#868B98',
  },
  subjects: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: screenHeight * 0.055,
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
    fontSize: screenWidth * 0.04,
    color: 'black',
    lineHeight: screenWidth * 0.045,
    paddingTop: screenHeight * 0.005,
  },
  text2: {
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.034,
    color: '#85949F',
    lineHeight: screenWidth * 0.04,
    width: '100%',
    paddingLeft: screenWidth * 0.01,
    paddingTop: screenWidth * 0.013,
  },
});
export default HistoryStatus;
