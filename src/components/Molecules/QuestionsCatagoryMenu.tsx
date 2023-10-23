import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TestQustionsCatagories} from '../../utils/Data/data';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {RootState} from '../../reduxToolkit/Store';
import {useSelector} from 'react-redux';

type QuestionsCatagoryMenuProps = {
  selectedCatagory: string;
  setSelectedCatagory: React.Dispatch<React.SetStateAction<string>>;
};
const QuestionsCatagoryMenu: React.FC<QuestionsCatagoryMenuProps> = ({
  selectedCatagory,
  setSelectedCatagory,
}) => {
  const isSubscribed = useSelector(
    (state: RootState) => state.auth.isSubscribed,
  );

  return (
    <View style={style.container}>
      {TestQustionsCatagories.map(catagory => (
        <TouchableOpacity
          key={catagory}
          onPress={() => setSelectedCatagory(catagory)}
          style={
            selectedCatagory === catagory
              ? [style.buttons, style.activeButton]
              : style.buttons
          }>
          {!isSubscribed && catagory !== TestQustionsCatagories[2] && (
            <Fontisto
              name="locked"
              style={
                selectedCatagory === catagory
                  ? [style.lockIcon, style.lockIconActive]
                  : style.lockIcon
              }
            />
          )}
          <Text
            style={
              selectedCatagory === catagory
                ? style.buttonText
                : [style.buttonText, style.activeButtonText]
            }>
            {catagory}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    borderRadius: 80,
    marginHorizontal: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#1E90FF',
    paddingHorizontal: 3,
    paddingVertical: 4,
    marginVertical: 10,
  },
  subjectsCardContainer: {
    paddingBottom: 45,
  },
  lockIcon: {
    position: 'absolute',
    right: 6,
    top: 1,
    fontSize: 10,
    color: '#4d4d4d',
  },
  lockIconActive: {
    right: 15,
    color: 'white',
  },
  buttons: {
    width: '33.3%',
    paddingVertical: '3%',
    color: 'black',
    position: 'relative',
  },
  activeButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 80,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 12.5,
  },
  activeButtonText: {
    color: '#858585',
  },
});

export default QuestionsCatagoryMenu;
