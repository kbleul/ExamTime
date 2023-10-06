import React from 'react';
import ShareApp from '../../../components/Organisms/ShareApp';
import {ImageBackground, Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import ProfileEdit from '../../../components/Organisms/ProfileEdit';

const ProfileEditIndex = () => {
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageBg}>
        <ImageBackground
          style={styles.img}
          source={require('../../../assets/Images/Profile/1.png')} // Replace with the correct path to your image
        >
          <TouchableOpacity
            style={styles.iconContainer}
            touchSoundDisabled
            onPress={() => navigator.goBack()}>
            <AntDesign name="left" style={styles.backIcon} size={24} />
          </TouchableOpacity>
        </ImageBackground>
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
