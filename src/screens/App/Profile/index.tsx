import React, {useCallback} from 'react';
import {ImageBackground, Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import ProfileContent from '../../../components/Organisms/ProfileContent';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';
import Toast from 'react-native-toast-message';
import Config from 'react-native-config';
import {useNavContext} from '../../../context/bottomNav';
import {useFocusEffect} from '@react-navigation/native';

const Index = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const {setShowNavigation} = useNavContext();

  useFocusEffect(
    useCallback(() => {
      setShowNavigation(true);
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageBg}>
        {user && user?.profilePicture ? (
          <ImageBackground
            style={styles.img}
            source={{
              uri: user.profilePicture.includes('https://')
                ? user.profilePicture
                : `${Config.API_URL}profile-pictures/` + user.profilePicture,
            }}
          />
        ) : (
          <View style={styles.noiImageContainer}>
            <Text style={styles.noiImageText}>
              {user?.firstName?.charAt(0)}
            </Text>
          </View>
        )}

        {!user && (
          <View style={styles.avatarContainer}>
            <FontAwesome6 name="user-large" size={120} color="#e9f2f5" />
          </View>
        )}
      </View>

      <ProfileContent />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    position: 'relative',
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
  noiImageContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#0066B2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noiImageText: {
    fontSize: 35,
    color: 'white',
    paddingBottom: 20,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
export default Index;
