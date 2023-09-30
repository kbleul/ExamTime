import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import img from '../../../../../assets/Images/onboarding/1.png';
import {PagesProps} from './types';

const PageOne: React.FC<PagesProps> = ({setPageCounter}) => {
  return (
    <View>
      <View style={style.container}>
        <Image source={img} style={style.img} />
      </View>

      <View style={style.contentContainer}>
        <Text style={style.contentTitle}>Exam Time</Text>

        <Text style={style.contentText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>

      <TouchableOpacity
        touchSoundDisabled
        onPress={() => setPageCounter(2)}
        style={style.buttonContainer}>
        <View style={style.buttonContainer_second}>
          <View style={style.buttonContainer_three}>
            <AntDesign name="arrowright" style={style.arrowIcon} size={30} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '50%',
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '90%',
  },
  contentContainer: {
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentTitle: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 16,
    color: 'black',
    lineHeight: 22,
    paddingHorizontal: 30,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  buttonContainer: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: '#F1F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '13%',
  },
  buttonContainer_second: {
    width: 60,
    height: 60,
    borderRadius: 800,
    backgroundColor: '#C1E5FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer_three: {
    width: 40,
    height: 40,
    borderRadius: 800,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  arrowIcon: {
    color: 'white',
  },
});

export default PageOne;
