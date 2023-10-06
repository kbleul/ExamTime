import React from 'react';
import {ImageBackground, Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import ProfileContent from '../../../components/Organisms/ProfileContent';

const Index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageBg}>
        <ImageBackground
          style={styles.img}
          source={require('../../../assets/Images/Profile/1.png')} // Replace with the correct path to your image
        >
          <Text>{''}</Text>
        </ImageBackground>
      </View>

      <ProfileContent />

      <MainBottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    position: 'relative',
    paddingBottom: 35,
    backgroundColor: '#F9FCFF',
  },
  imageBg: {
    height: '35%',
    width: '100%',
    resizeMode: 'cover',
  },
  img: {
    height: '100%',
    width: '100%',
  },
});
export default Index;
