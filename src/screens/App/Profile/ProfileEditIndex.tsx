import React, {useState} from 'react';
import {Image, ImageBackground, Text, TouchableOpacity} from 'react-native';
import {StyleSheet, View} from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import ProfileEdit from '../../../components/Organisms/ProfileEdit';
import {screenHeight, screenWidth} from '../../../utils/Data/data';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {RESULTS} from 'react-native-permissions';
import checkCameraPermission from '../../../utils/Functions/Helper/CameraPermisstion';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';
import Config from 'react-native-config';

const ProfileEditIndex = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const uploadImage = async () => {
    const permissionStatus = await checkCameraPermission();
    if (permissionStatus !== RESULTS.GRANTED) {
      return;
    }

    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
    })
      .then((image: ImageOrVideo | null) => {
        if (image) {
          setAvatar('data:image/jpeg;base64,' + image.data);
        }
      })
      .catch(e => console.error);
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageBg}>
        <ImageBackground
          style={styles.img}
          source={{
            uri: avatar
              ? avatar
              : user && user?.profilePicture
              ? user?.profilePicture.includes('https://')
                ? user.profilePicture
                : `${Config.API_URL}/profile-pictures/` + user.profilePicture
              : 'https://th.bing.com/th/id/OIP.fmwdQXSSqKuRzNiYrbcNFgHaHa?rs=1&pid=ImgDetMain',
          }}>
          <TouchableOpacity
            style={styles.editIconContainer}
            onPress={uploadImage}>
            <Image
              style={styles.editIcon}
              source={require('../../../assets/Images/Profile/edit.png')}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <ProfileEdit avatar={avatar} />

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
    backgroundColor: '#f0efed',
    height: '25%',
    width: '100%',
    resizeMode: 'cover',
  },
  img: {
    height: '100%',
    // aspectRatio: 1,
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  iconContainer: {
    marginTop: '20%',
    paddingHorizontal: 5,
  },
  backIcon: {
    color: 'black',
    fontWeight: 'bold',
  },
  editIconContainer: {
    overflow: 'hidden',
    position: 'absolute',
    height: screenWidth * 0.125,
    width: screenWidth * 0.125,
    padding: screenWidth * 0.0125,
    borderRadius: screenWidth * 0.02,
    bottom: screenHeight * 0.01,
    right: screenWidth * 0.02,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    height: screenWidth * 0.075,
    width: screenWidth * 0.075,
  },
});

export default ProfileEditIndex;
