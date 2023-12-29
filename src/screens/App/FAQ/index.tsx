import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import FaqContener from '../../../components/Organisms/FaqContener';
import Toast from 'react-native-toast-message';
const Index = () => {
  const navigator = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mcontainer}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <Ionicons name="chevron-back-outline" color="#000" size={28} />
          </TouchableOpacity>

          <Text style={styles.headerText}>FAQ</Text>
        </View>
        <View style={styles.faqContaner}>
          <FaqContener />
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  mcontainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 20,
  },
  headerText: {
    color: '#0F0F0F',
    marginLeft: 20,
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
  },
  faqContaner: {
    marginVertical: 14,
    marginHorizontal: 8,
    flex: 1,
  },
});
export default Index;
