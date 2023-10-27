import React from 'react';
import {ImageBackground} from 'react-native';
import {StyleSheet, View} from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import ProfileEdit from '../../../components/Organisms/ProfileEdit';

const ProfileEditIndex = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageBg}>
        <ImageBackground
          style={styles.img}
          source={require('../../../assets/Images/Profile/1.png')} // Replace with the correct path to your image
        />
      </View>

      <ProfileEdit />

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
    backgroundColor: '#F5F5F5',
  },
  imageBg: {
    height: '25%',
    width: '100%',
    resizeMode: 'cover',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  iconContainer: {
    marginTop: '20%',
    paddingHorizontal: 5,
  },
  backIcon: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ProfileEditIndex;
