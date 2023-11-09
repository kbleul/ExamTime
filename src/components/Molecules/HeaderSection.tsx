import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SignedUpHeader from '../Organisms/SignedUpHeader';
import TrialHeader from '../Organisms/TrialHeader';
import {CourseCatagories} from '../../utils/Data/data';
import {useSelector} from 'react-redux';
import {RootState} from '../../reduxToolkit/Store';

type HeaderSectionType = {
  selectedCatagory: string;
  setSelectedCatagory: React.Dispatch<React.SetStateAction<string>>;
};

const HeaderSection: React.FC<HeaderSectionType> = ({
  selectedCatagory,
  setSelectedCatagory,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      {user ? (
        <SignedUpHeader type="Courses" />
      ) : (
        <TrialHeader type="Courses" />
      )}

      <View style={style.selectorContainer}>
        <TouchableOpacity
          onPress={() => setSelectedCatagory(CourseCatagories[0])}
          style={
            selectedCatagory === CourseCatagories[0]
              ? [style.buttons, style.activeButton]
              : style.buttons
          }>
          <Text
            style={
              selectedCatagory === CourseCatagories[0]
                ? style.buttonText
                : [style.buttonText, style.activeButtonText]
            }>
            {CourseCatagories[0]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedCatagory(CourseCatagories[1])}
          style={
            selectedCatagory === CourseCatagories[1]
              ? [style.buttons, style.activeButton]
              : style.buttons
          }>
          <Text
            style={
              selectedCatagory === CourseCatagories[1]
                ? style.buttonText
                : [style.buttonText, style.activeButtonText]
            }>
            {CourseCatagories[1]}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    borderRadius: 80,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#1E90FF',
    padding: 3,
    paddingVertical: 2,
  },
  subjectsCardContainer: {
    paddingBottom: 45,
  },
  buttons: {
    width: '45%',
    paddingVertical: '3%',
    color: 'black',
  },
  activeButton: {
    backgroundColor: '#1E90FF',
    width: '55%',
    borderRadius: 80,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  activeButtonText: {
    color: '#858585',
  },
});

export default HeaderSection;
