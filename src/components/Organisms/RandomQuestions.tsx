import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Slider from '@react-native-community/slider';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import {Subject} from '../../Realm';
import {checkIsOnline} from '../../utils/Functions/Helper';
import Toast from 'react-native-toast-message';

const minimumAmount = 10;
const maximumAmount = 100;

const RandomQuestions = ({selectedSubject}: {selectedSubject: Subject}) => {
  const navigator = useNavigation();
  const [currentAmount, setCurrentAmount] = useState(minimumAmount);

  const [isLoading, setIsLoading] = useState(false);

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
          onPress={async () => {
            setIsLoading(true);

            let isonline = await checkIsOnline(navigator);

            console.log({isonline});
            if (isonline) {
              navigator.navigate('Random-Exam', {
                selectedSubject: selectedSubject,
                amount: currentAmount,
              });
            } else {
              Toast.show({
                type: 'error',
                text1: 'Fetch random exams failed.',
                text2: 'Network Error',
              });
            }

            setIsLoading(false);
            // navigator.navigate('Random-Exam', {
            //   selectedSubject: selectedSubject,
            //   amount: currentAmount,
            // });
          }}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.startButtonText}>Start</Text>
          )}
          {!isLoading && (
            <AntDesign name="right" color="white" size={screenWidth * 0.03} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: screenHeight * 0.01,
    marginHorizontal: 5,
  },
  title: {
    color: '#008E97',
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.04,
  },
  sliderContainer: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: screenWidth * 0.009,
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
    fontSize: screenWidth * 0.025,
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
    fontSize: screenWidth * 0.03,
    textAlign: 'right',
    paddingTop: 4,
    paddingBottom: 2,
  },
});

export default RandomQuestions;
