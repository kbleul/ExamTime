import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {CourseCatagories} from '../../../utils/Data/data';
import HeaderSection from '../../../components/Molecules/HeaderSection';
import Study from '../../../components/Templates/Study';
import Challenges from '../../../components/Templates/Challenges';

const Index = () => {
  const [selectedCatagory, setSelectedCatagory] = useState(CourseCatagories[0]);
  return (
    <View style={style.container}>
      <HeaderSection
        selectedCatagory={selectedCatagory}
        setSelectedCatagory={setSelectedCatagory}
      />

      {selectedCatagory === CourseCatagories[0] ? <Study /> : <Challenges />}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 5,
    backgroundColor: '#F9FCFF',
  },
});

export default Index;
