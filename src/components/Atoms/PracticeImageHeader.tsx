import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {TestQustionsCatagories} from '../../utils/Data/data';

const PracticeImageHeader: React.FC<{selectedCatagory: String}> = ({
  selectedCatagory,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.img}
        source={
          selectedCatagory === TestQustionsCatagories[0]
            ? require('../../assets/Images/Practice/HeaderImg1.png')
            : require('../../assets/Images/Practice/HeaderImg2.png')
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 3,
  },
  img: {
    width: '100%',
    height: 100,
  },
});

export default PracticeImageHeader;
