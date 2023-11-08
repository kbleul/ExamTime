import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const minimumAmount = 10;
const maximumAmount = 100;

const RandomQuestions = () => {
  const navigator = useNavigation();
  const [currentAmount, setCurrentAmount] = useState(minimumAmount);

  //catch on every render
  const sliderBgMinValue = `${(currentAmount / maximumAmount) * 100}%`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random Questions</Text>

      <View style={styles.sliderContainer}>
        <View style={styles.sliderSubContainer}>
          <View style={styles.sliderWrapper}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={maximumAmount}
              minimumTrackTintColor="#1E90FF"
              maximumTrackTintColor="#C6BFBF"
              step={10}
              thumbTintColor="#1E90FF"
              value={currentAmount}
              onValueChange={e => setCurrentAmount(e)}
            />
            <View style={styles.sliderBG}>
              <View
                style={[styles.sliderBgMinValue, {width: sliderBgMinValue}]}
              />
            </View>
          </View>

          <View style={styles.sliderTextContainer}>
            <Text style={styles.sliderText}>5 minimum</Text>
            <Text style={styles.sliderText}>{currentAmount}</Text>
            <Text style={styles.sliderText}>100 max</Text>
          </View>
        </View>
        <TouchableOpacity
          touchSoundDisabled
          style={styles.startButton}
          onPress={() => navigator.navigate('Exam-View')}>
          <Text style={styles.startButtonText}>Start</Text>
          <AntDesign name="right" color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 5,
  },
  title: {
    color: '#008E97',
    fontFamily: 'PoppinsSemiBold',
    fontSize: 16,
  },
  sliderContainer: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  sliderSubContainer: {
    width: '80%',
    paddingTop: 8,
  },
  slider: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  sliderWrapper: {
    position: 'relative',
  },
  sliderBG: {
    position: 'absolute',
    top: 2,
    backgroundColor: '#C6BFBF',
    width: '90%',
    marginLeft: '5%',
    height: 8,
    borderRadius: 10,
  },
  sliderBgMinValue: {
    position: 'absolute',
    height: 8,
    top: 0,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
  },
  sliderTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginLeft: '5%',
  },
  sliderText: {
    color: '#858585',
    fontFamily: 'PoppinsRegular',
    fontSize: 10,
  },
  startButton: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  startButtonText: {
    width: '70%',
    color: 'white',
    fontFamily: 'PoppinsSemiBold',
    textAlign: 'right',
    paddingTop: 8,
    paddingBottom: 4,
  },
});

export default RandomQuestions;
