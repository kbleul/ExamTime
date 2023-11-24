import React, { useState } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import ProfileEdit from '../../../components/Organisms/ProfileEdit';
import { screenHeight, screenWidth } from '../../../utils/Data/data';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
const ProfileEditIndex = () => {
  const [avatar, setAvatar] = useState('');
  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        setAvatar('data:image/jpeg;base64,' + image.data);
      }
    }).catch((e)=>console.error);
  };
  return (
    <View style={styles.container}>

      <View style={styles.imageBg}>
        <ImageBackground
          style={styles.img}
          source={{ uri: avatar
            ? avatar:  'https://th.bing.com/th/id/OIP.nub7_Qz4ZciQCswUMV1KpAHaJj?w=768&h=990&rs=1&pid=ImgDetMain',}} // Replace with the correct path to your image
        >
          <Text>{''}</Text>
          <TouchableOpacity style={styles.editIconContainer} onPress={uploadImage}>
              <Image style={styles.editIcon} source={require('../../../assets/Images/Profile/edit.png')} />
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
    backgroundColor: '#F5F5F5',
  },
  imageBg: {
    backgroundColor: "blue",
    height: '25%',
    width: '100%',
    resizeMode: 'cover',
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
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
    borderRadius: screenWidth * 0.020,
    bottom: screenHeight * 0.01,
    right: screenWidth * 0.02,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    height: screenWidth * 0.075,
    width: screenWidth * 0.075,
  }
});

export default ProfileEditIndex;
