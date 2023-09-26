import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StepIndicator from './components/Organisms/StepIndicator';
import {StyleSheet} from 'react-native';

export default function Signup() {
  return (
    <SafeAreaView>
      <View style={styles.backContainer}>
        <Ionicons name="chevron-back-outline" color="#000" size={24} />
        <Text>Create your account</Text>
      </View>

      <View>
        <StepIndicator />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
