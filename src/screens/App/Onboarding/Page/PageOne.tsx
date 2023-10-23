import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import img from '../../../../assets/Images/onboarding/1a.png';
import {PagesProps} from './types';
import {screenHeight} from '../../../../utils/Data/data';

const PageOne: React.FC<PagesProps> = ({setPageCounter}) => {
  return (
    <View style={style.container}>
      <ScrollView
        contentContainerStyle={style.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={style.imgContainer}>
          <Image source={img} style={style.img} resizeMode="contain" />
        </View>

        <View style={style.contentContainer}>
          <Text style={style.contentTitle}>Study To Pass</Text>

          <Text style={style.contentText}>
            Study and get the highest score in your class, the exam won't be
            this fun,
          </Text>
        </View>

        <TouchableOpacity
          touchSoundDisabled
          onPress={() => setPageCounter(2)}
          style={style.buttonContainer}>
          <View style={style.buttonContainer_first}>
            <View style={style.buttonContainer_second}>
              <View style={style.buttonContainer_three}>
                <AntDesign
                  name="arrowright"
                  style={style.arrowIcon}
                  size={30}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    height: screenHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgContainer: {
    width: '100%',
    height: screenHeight * (4 / 10),
    marginTop: screenHeight * (1 / 10),
  },
  img: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: screenHeight * (3 / 10),
  },
  contentTitle: {
    fontSize: 24,
    marginBottom: '10%',
    color: '#2D466A',
    fontFamily: 'Montserrat-Bold',
  },
  contentText: {
    fontSize: 16,
    color: '#2D466A',
    lineHeight: 22,
    paddingHorizontal: 60,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    marginBottom: '10%',
  },
  buttonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: screenHeight * (3 / 10),
    paddingVertical: 20,
  },
  buttonContainer_first: {
    width: 85,
    height: 85,
    borderRadius: 800,
    backgroundColor: '#F1F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer_second: {
    width: 73,
    height: 73,
    borderRadius: 800,
    backgroundColor: '#C1E5FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer_three: {
    width: 57,
    height: 57,
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
