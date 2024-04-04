import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  ProfileMenuItemsAuth,
  screenHeight,
  screenWidth,
} from '../../utils/Data/data';
import Feather from 'react-native-vector-icons/Feather';
import {formStyles} from '../../screens/Auth/Signup/Styles';
import {useNavigation} from '@react-navigation/native';

const PaymentSuccessfullModal = ({
  showSuccessModal,
  setShowSuccessModal,
  refrenceNumber,
}: {
  showSuccessModal: boolean;
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  refrenceNumber: string;
}) => {
  const navigator: any = useNavigation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showSuccessModal}
      onRequestClose={() => {
        setShowSuccessModal(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.iconContainer}>
            <View style={styles.iconContainerSmall}>
              <Feather style={styles.icon} name="check" size={70} />
            </View>
          </View>

          <Text style={styles.title}>Successful!</Text>

          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Payment request submitted successfully. Please keep your reference
              number for future correspondence. Await SMS notification within 24
              hours. Thank you for your patience.
            </Text>
            <View style={styles.specialContainer}>
              <Text style={styles.text}>Reference Number -</Text>
              <Text style={styles.textSpecial}>{refrenceNumber}</Text>
            </View>
          </View>

          <View style={[formStyles.submitBtnContainer, styles.button]}>
            <TouchableOpacity
              style={[formStyles.submitBtn, styles.button]}
              touchSoundDisabled
              onPress={() => {
                setShowSuccessModal(false);

                navigator.navigate('Profile');
                navigator.navigate('HomeSection', {
                  screen: 'Home',
                });
              }}>
              <Text style={[formStyles.submitText, styles.buttonText]}>ok</Text>
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
    position: 'relative',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
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
    paddingVertical: screenHeight * 0.07,
    position: 'relative',
    paddingHorizontal: screenWidth * 0.03,
  },
  iconContainer: {
    position: 'absolute',
    right: screenWidth * 0.3,
    top: -80,
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    backgroundColor: '#F6FBF5',
    borderRadius: 200,
    padding: 8,
  },
  iconContainerSmall: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
    backgroundColor: '#0097FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: 'white',
  },
  title: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.08,
    color: '#0097FE',
    marginTop: screenWidth * 0.03,
  },
  textContainer: {
    marginTop: screenWidth * 0.03,
    backgroundColor: '#F6FBF5',
    borderRadius: 10,
    padding: screenWidth * 0.03,
  },
  text: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.04,
    color: '#000',
  },
  specialContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  textSpecial: {
    textDecorationLine: 'underline',
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.04,
    color: '#000',
  },
  button: {
    marginTop: screenHeight * 0.04,
    width: '96%',
    borderRadius: 30,
  },
  buttonText: {
    fontSize: screenWidth * 0.05,
  },
});
export default PaymentSuccessfullModal;
