import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StepIndicator from './components/Organisms/StepIndicator';
import {StyleSheet} from 'react-native';
import SocialOptions from '../components/Organisms/SocialOptions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import ContentDispatcher from './components/Organisms/ContentDispatcher';

export default function Signup() {
  const navigator = useNavigation();

  const [currentStep, setCurrentStep] = useState(2);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <Ionicons name="chevron-back-outline" color="#000" size={28} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Create your account</Text>
        </View>

        <StepIndicator currentStep={currentStep} />

        <ContentDispatcher currentStep={currentStep} />

        {currentStep === 1 && <SocialOptions />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 20,
  },
  headerText: {
    color: '#0066B2',
    marginLeft: 20,
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
  },
});
