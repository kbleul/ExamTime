/* eslint-disable no-undef */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const SelctInput: React.FC<{isPrevious?: boolean; index?: boolean}> = ({
  isPrevious,
  index,
}) => {
  const [showList, setSHowList] = useState(false);
  return (
    <View
      style={
        isPrevious
          ? [styles.mainContainer, styles.mainContainerPrevious]
          : styles.mainContainer
      }>
      <View style={styles.container}>
        <View
          style={
            isPrevious
              ? [styles.dropdown1BtnStyle, styles.dropdown1BtnStylePrevious]
              : styles.dropdown1BtnStyle
          }>
          <TouchableOpacity
            style={
              isPrevious
                ? [styles.dropdown1Btn, styles.dropdown1BtnPrevious]
                : styles.dropdown1Btn
            }
            touchSoundDisabled
            onPress={() => setSHowList(prev => !prev)}>
            <Text style={styles.dropdown1BtnTxtStyle}>All Exams</Text>
            <FontAwesome name="chevron-down" color={'#008E97'} size={14} />
          </TouchableOpacity>
        </View>

        {index ? (
          <SimpleLineIcons name="calendar" size={24} color="#B5C3E5" />
        ) : (
          <MaterialIcons
            name="tune"
            size={isPrevious ? 24 : 28}
            color="#858585"
          />
        )}
      </View>

      {showList && (
        <View
          style={
            isPrevious
              ? [
                  styles.searchResultContainer,
                  styles.searchResultContainerPrevious,
                ]
              : styles.searchResultContainer
          }>
          <Text style={styles.searchResult}>Math Exam</Text>
          <Text style={styles.searchResult}>Biology Exam</Text>
          <Text style={styles.searchResult}>SAT Exam</Text>
          <Text style={styles.searchResult}>Chemistry Exam</Text>
          <Text style={styles.searchResult}>Civics Exam</Text>
        </View>
      )}
    </View>
  );
};

export default SelctInput;

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
  },
  container: {
    marginHorizontal: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdown1BtnStyle: {
    width: '90%',
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#D3DBF0',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
  },
  dropdown1Btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '83%',
    paddingHorizontal: 20,
  },
  dropdown1BtnTxtStyle: {
    color: '#858585',
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    paddingVertical: 5,
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#FFFFFF',
  },
  searchResultContainer: {
    position: 'absolute',
    top: 42,
    zIndex: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 5,
    width: '87%',
    borderRadius: 10,
  },
  searchResult: {
    paddingVertical: 8,
    marginHorizontal: 20,
    color: '#858585',
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },

  /////////////////////////
  mainContainerPrevious: {
    width: '50%',
  },
  dropdown1BtnStylePrevious: {
    width: '82%',
    borderWidth: 1,
    paddingRight: 0,
  },
  dropdown1BtnPrevious: {
    width: '99%',
  },
  searchResultContainerPrevious: {
    width: '100%',
  },
});
