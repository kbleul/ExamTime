import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LoginHeader from '../../components/Molecules/LoginHeader';
import {useNavigation} from '@react-navigation/core';
import StepIndicator from '../../components/Molecules/StepIndicator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SetNewPassword from '../../components/Organisms/SetNewPassword';
import {useSelector} from 'react-redux';
import {RootState} from '../../reduxToolkit/Store';

const SetNewPasswordPage = () => {
  const navigator = useNavigation();
  let [currentStep, setCurrentStep] = useState(0);

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <SetNewPassword
          setCurrentStep={setCurrentStep}
          unregisteredUser={user}
          isReset={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FCFF',
    flex: 1,
    paddingTop: 30,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
});

export default SetNewPasswordPage;
