import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {screenWidth} from '../../utils/Data/data';

const StudyDetalsHeader = ({
  subjectName,
  progress,
}: {
  subjectName: string;
  progress: number;
}) => {
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        touchSoundDisabled
        onPress={() => navigator.goBack()}
        style={styles.button}>
        <AntDesign name="left" size={22} color="#000" />
        <Text style={styles.buttonText}>{subjectName}</Text>
      </TouchableOpacity>

      <View style={styles.progressContainer}>
        <View style={styles.progress}>
          <View style={[styles.progressBar, {width: `${progress}%`}]} />
        </View>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: screenWidth * 0.04,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: screenWidth * 0.05,
    color: 'black',
    fontFamily: 'PoppinsSemiBold',
    marginLeft: 10,
    marginTop: 2,
  },
  progressContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.09,
  },
  progress: {
    height: 8,
    width: '95%',
    backgroundColor: '#DAD0E2',
    borderRadius: 100,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#1B3C26',
    borderRadius: 100,
  },
  progressText: {
    fontSize: screenWidth * 0.045,
    color: '#37383A',
    marginLeft: 3,
  },
});

export default StudyDetalsHeader;
