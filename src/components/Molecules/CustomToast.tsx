import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import {Alert, AlertIcon, AlertText} from '@gluestack-ui/themed';
import {screenHeight} from '../../utils/Data/data';

import Entypo from 'react-native-vector-icons/Entypo';

const CustomToast = ({
  text,
  showAlert,
  setShowAlert,
  topPosition,
}: {
  text: string;
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  topPosition: number;
}) => {
  useEffect(() => {
    setTimeout(() => setShowAlert(false), 4500);
  }, [showAlert, setShowAlert]);

  return (
    <>
      {showAlert && (
        <View style={[styles.alertContainer, {top: topPosition}]}>
          <Alert mx="$2.5" action="info" variant="accent">
            <Entypo name="info-with-circle" size={18} style={styles.icon} />

            <AlertText>{text}</AlertText>
          </Alert>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    width: '100%',
    marginTop: screenHeight * 0.045,
    zIndex: 10,
  },
  icon: {
    marginRight: 8,
  },
});

export default CustomToast;
