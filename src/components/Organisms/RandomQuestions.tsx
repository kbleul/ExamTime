import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import {Subject} from '../../Realm';
import {checkIsOnline} from '../../utils/Functions/Helper';
import Toast from 'react-native-toast-message';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@gluestack-ui/themed';
import {AuthContext} from '../../Realm/model';
import {getRealmSubject} from '../../utils/Functions/Get';

const RandomQuestions = ({
  selectedSubjectId,
}: {
  selectedSubjectId: string | null | undefined;
}) => {
  const navigator: any = useNavigation();
  const [currentAmount, setCurrentAmount] = useState(10);

  const [isLoading, setIsLoading] = useState(false);

  const {useRealm} = AuthContext;
  const realm = useRealm();

  const selectedSubject = getRealmSubject(selectedSubjectId, realm);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random Questions</Text>

      {selectedSubject && selectedSubject.length > 0 && (
        <View style={styles.sliderContainer}>
          <View style={styles.sliderSubContainer}>
            <View style={styles.sliderWrapper}>
              <Slider
                step={10}
                sliderTrackHeight={4}
                value={currentAmount}
                maxValue={100}
                minValue={0}
                onChange={v => {
                  setCurrentAmount(v);
                }}>
                <SliderTrack>
                  <SliderFilledTrack bg="#1E90FF" />
                </SliderTrack>
                <SliderThumb bg="#1E90FF" />
              </Slider>
            </View>

            <View style={styles.sliderTextContainer}>
              <Text style={styles.sliderText}>10 minimum</Text>
              <Text style={styles.sliderText}>{currentAmount}</Text>
              <Text style={styles.sliderText}>100 max</Text>
            </View>
          </View>
          <TouchableOpacity
            touchSoundDisabled
            style={styles.startButton}
            disabled={isLoading}
            onPress={async () => {
              setIsLoading(true);

              let isonline = await checkIsOnline(navigator);
              if (isonline) {
                navigator.navigate('Random-Exam', {
                  selectedSubject: selectedSubject[0],
                  amount: currentAmount,
                });
                setTimeout(() => setCurrentAmount(10), 1500);
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Fetch random exams failed.',
                  text2: 'Network Error',
                });
              }

              setIsLoading(false);
            }}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.startButtonText}>Start</Text>
            )}
            {!isLoading && (
              <AntDesign
                name="right"
                color="white"
                size={screenWidth * 0.035}
              />
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: screenHeight * 0.01,
    marginBottom: screenHeight * 0.023,
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
    overflow: 'hidden',
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
    overflow: 'hidden',
    zIndex: 10,
  },
  sliderWrapper: {
    position: 'relative',
    width: '90%',
    marginLeft: '5%',
    paddingTop: 8,
    paddingBottom: 8,
  },
  sliderTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginLeft: '5%',
    marginTop: 3,
  },
  sliderText: {
    color: '#858585',
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.03,
  },
  startButton: {
    width: '20%',
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 0,
  },
  startButtonText: {
    width: '60%',
    color: 'white',
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.035,
    textAlign: 'right',
    paddingTop: screenWidth * 0.002,
    paddingBottom: 0,
  },
});

export default RandomQuestions;
