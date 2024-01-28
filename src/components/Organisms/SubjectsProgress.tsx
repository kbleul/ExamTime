import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BarChart, yAxisSides} from 'react-native-gifted-charts';
import {screenHeight, screenWidth} from '../../utils/Data/data';

const barData = [
  {value: 80, label: 'Che'},
  {value: 20, label: 'Civ', frontColor: '#F27994'},
  {
    value: 50,
    label: 'Math',
  },
  {value: 40, label: 'Bio'},
  {value: 100, label: 'Phy'},
  {value: 60, label: 'Sat'},
  {value: 70, label: 'Eng'},
];

const SubjectsProgress = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Progress on subjects</Text>

      <BarChart
        barWidth={11}
        noOfSections={2}
        barBorderRadius={20}
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
        height={screenHeight * 0.168}
        width={screenWidth - 100}
        gradientColor="#58ECC9"
        frontColor={'#EBAAA8'}
        yAxisSide={yAxisSides.RIGHT}
        yAxisTextStyle={{color: '#9196A2'}}
        xAxisLabelTextStyle={{color: '#9196A2'}}
        maxValue={100}
        spacing={30}
        isAnimated
        showGradient
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.252,
  },
  headerTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.045, //28
    color: '#000',
    lineHeight: screenHeight * 0.045, //34
    marginTop: screenWidth * 0.009,
  },
});

export default SubjectsProgress;
