import React from 'react';
import {ImageBackground, Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import ProfileContent from '../../../components/Organisms/ProfileContent';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';

const Index = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <View style={styles.container}>
      <View style={styles.imageBg}>
        {user && (
          <ImageBackground
            style={styles.img}
            source={require('../../../assets/Images/Profile/1.png')} // Replace with the correct path to your image
          >
            <Text>{''}</Text>
          </ImageBackground>
        )}

        {!user && (
          <View style={styles.avatarContainer}>
            <FontAwesome6 name="user-large" size={120} color="#e9f2f5" />
          </View>
        )}
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
    paddingBottom: 60,
    backgroundColor: '#F5F5F5',
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
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
export default Index;
