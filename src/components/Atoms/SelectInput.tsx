/* eslint-disable no-undef */
import React, {useState} from 'react';
import {View, Text, Dimensions, StyleSheet, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SelctInput = () => {
  const [showList, setSHowList] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.dropdown1BtnStyle}>
          <TouchableOpacity
            style={styles.dropdown1Btn}
            touchSoundDisabled
            onPress={() => setSHowList(prev => !prev)}>
            <Text style={styles.dropdown1BtnTxtStyle}>All Exams</Text>
            <FontAwesome name="chevron-down" color={'#008E97'} size={14} />
          </TouchableOpacity>
        </View>

        <MaterialIcons name="tune" size={28} color="#858585" />
      </View>

      {showList && (
        <View style={styles.searchResultContainer}>
          <Text style={styles.searchResult}>MAth Exam</Text>
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
    fontSize: 18,
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
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },
});
