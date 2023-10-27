import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import StepIndicator from '../../../components/Molecules/StepIndicator';
import ContentDispatcher from './ContentDispatcher';

export default function Signup() {
  const navigator = useNavigation<any>();

  const [currentStep, setCurrentStep] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topHeader}>
          {currentStep === 1 && (
            <TouchableOpacity onPress={() => navigator.navigate('Login')}>
              <Ionicons name="chevron-back-outline" color="#000" size={28} />
            </TouchableOpacity>
          )}
          <Text style={styles.headerText}>Create your account</Text>
        </View>

        <StepIndicator currentStep={currentStep} />

        <ContentDispatcher
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FCFF',
    flex: 1,
    paddingTop: 30,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  headerText: {
    color: '#0066B2',
    marginLeft: 20,
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
  },
});
