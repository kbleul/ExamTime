import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import ShareApp from '../../../components/Organisms/ShareApp';
import FaqContener from '../../../components/Organisms/FaqContener';
const Index = () => {
  const navigator = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <Ionicons name="chevron-back-outline" color="#000" size={28} />
        </TouchableOpacity>

        <Text style={styles.headerText}>FAQ</Text>
      </View>
      <View style={styles.faqContaner}>
        <FaqContener />
        <View style={{margin: 8}}>
          <ShareApp />
        </View>
      </View>
      <MainBottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FCFF',
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
