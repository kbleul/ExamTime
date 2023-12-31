import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {Modal, StyleSheet, Text, View} from 'react-native';

import {screenHeight, screenWidth} from '../../utils/Data/data';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useNavContext} from '../../context/bottomNav';

const LoginModal: React.FC<{
  loginModalVisible: boolean;
  setLoginModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({loginModalVisible, setLoginModalVisible}) => {
  const navigator: any = useNavigation();
  const {setShowNavigation} = useNavContext();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={loginModalVisible}
      onRequestClose={() => {
        setLoginModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            touchSoundDisabled
            style={styles.icon}
            onPress={() => setLoginModalVisible(false)}>
            <AntDesign name="close" size={20} color="#000" />
          </TouchableOpacity>
          <Image
            source={require('../../assets/Images/Practice/tip.png')}
            style={styles.modalImg}
          />

          <Text style={styles.modalText}>
            Please login or create an account all functions on the app
          </Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              touchSoundDisabled
              style={[styles.optionButton, styles.optionButtonSecondary]}
              onPress={() => {
                setLoginModalVisible(false);
                setShowNavigation(false);
                navigator.navigate('HomeSection', {screen: 'Signup'});
              }}>
              <Text
                style={[
                  styles.optionButtonText,
                  styles.optionButtonTextSecondary,
                ]}>
                Register
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              touchSoundDisabled
              style={[styles.optionButton, styles.optionButtonSecondary]}>
              <Text
                style={[
                  styles.optionButtonText,
                  styles.optionButtonTextSecondary,
                ]}
                onPress={() => {
                  setLoginModalVisible(false);
                  setShowNavigation(false);
                  navigator.navigate('HomeSection', {screen: 'Login'});
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    overflow: 'hidden',
    maxHeight: 600,
    paddingVertical: screenHeight * 0.04,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 18,
    top: 18,
  },
  modalImageContaner: {
    width: '100%',
    height: 280,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cancelIconBtn: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  modalImg: {
    width: screenHeight * 0.1,
    height: screenHeight * 0.15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.045,
    width: '80%',
    color: '#505050',
    marginVertical: 20,
  },

  optionsContainer: {
    marginTop: 5,
    paddingBottom: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
    marginHorizontal: 20,
  },
  optionButton: {
    width: '40%',
    borderRadius: 10,
    overflow: 'hidden',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#F5A52D',
  },
  optionButtonSecondary: {
    backgroundColor: '#1E90FF',
    borderWidth: 0,
  },
  optionButtonText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#F5A52D',
  },
  optionButtonTextSecondary: {
    color: 'white',
  },
});

export default LoginModal;
