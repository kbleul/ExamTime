import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {screenHeight, screenWidth} from '../../../utils/Data/data';
import {useFocusEffect} from '@react-navigation/native';
import {useNavContext} from '../../../context/bottomNav';
import HistoryStatus from '../../../components/Organisms/HistoryStatus';
import SubjectsProgress from '../../../components/Organisms/SubjectsProgress';
import HistoryScores from '../../../components/Organisms/HistoryScores';

const History = () => {
  const {setShowNavigation} = useNavContext();

  useFocusEffect(
    useCallback(() => {
      setShowNavigation(true);
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>History</Text>
        <Text style={styles.welcomeText}>Here is the overall Progress!</Text>
      </View>

      <HistoryStatus />

      <SubjectsProgress />

      <HistoryScores />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    backgroundColor: '#F9FCFF',
    paddingTop: screenHeight * 0.045,
    paddingHorizontal: 20,
  },
  scrollStyle: {
    flex: 1,
  },
  headerContainer: {
    height: screenHeight * 0.1,
  },
  headerTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.065, //28
    color: '#000',
    lineHeight: screenHeight * 0.05, //34
    marginTop: screenWidth * 0.009,
  },
  welcomeText: {
    fontFamily: 'PoppinsLight',
    fontSize: screenWidth * 0.045, //28
    color: '#C1C2C6',
    lineHeight: screenHeight * 0.04, //34
  },
});

export default History;
