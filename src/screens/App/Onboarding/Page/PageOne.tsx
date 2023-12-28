import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import img from '../../../../assets/Images/onboarding/1a.png';
import {PagesProps} from './types';
import {screenHeight, screenWidth} from '../../../../utils/Data/data';

const PageOne: React.FC<PagesProps> = ({setPageCounter}) => {
  return (
    <View style={style.container}>
      <ScrollView
        contentContainerStyle={style.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={style.imgContainer}>
          <Image source={img} style={style.img} resizeMode="contain" />
        </View>

        <View style={style.agreementContainer}>
          <TouchableOpacity
            touchSoundDisabled
            onPress={() => setPageCounter(2)}
            style={style.buttonContainer}>
            <Text style={style.agreeBtnText}>Agree and continue</Text>
          </TouchableOpacity>
          <Text style={style.agreementText}>
            By tapping “Agree and continue," you agree to Exam Time’s Terms of
            Service and acknowledge any of its related products and services.
            You acknowledge that you have read, understood, and agreed to be
            bound by the terms of this agreement. This agreement is legally
            binding between you and Think Hub ET Software Development PLC.
          </Text>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: screenHeight * 0.2,
  },
  img: {
    width: '70%',
    height: '100%',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: screenHeight * (3 / 10),
    marginTop: screenHeight * 0.05,
  },
  agreementContainer: {
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 10,
    marginBottom: 10,
    overflow: 'hidden',
    borderRadius: 12,
  },
  agreeBtnText: {
    fontSize: screenWidth * 0.037,
    fontFamily: 'PoppinsRegular',
    color: '#fff',
    textAlign: 'center',
  },
  agreementText: {
    fontSize: screenWidth * 0.028,
    fontFamily: 'PoppinsMedium',
    color: '#66676B',
    paddingHorizontal: 5,
  },
});

export default PageOne;
