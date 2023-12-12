import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NetworkError = () => {
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      <Ionicons name="cloud-offline-outline" size={170} color="#d4d4d4" />

      <Text style={styles.textHeader}>Can’t connect to the internet!</Text>
      <Text style={styles.textSmall}>
        check your internet connection to continue using this app.
      </Text>

      <TouchableOpacity
        touchSoundDisabled
        style={styles.tryAgainContainer}
        onPress={() => navigator.goBack()}>
        <Text style={styles.tryAgainBtnText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    marginTop: 8,
    marginBottom: 6,
    paddingHorizontal: 30,
  },
  textSmall: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  tryAgainContainer: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 30,
    backgroundColor: '#1E90FF',
  },
  tryAgainBtnText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
  },
});

export default NetworkError;
