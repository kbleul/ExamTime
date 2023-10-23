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
import ContactUs from '../../../components/Organisms/ContactUs';

const Index = () => {
  const navigator = useNavigation<any>();
  const SendMessage = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <Ionicons name="chevron-back-outline" color="#000" size={28} />
        </TouchableOpacity>

        <Text style={styles.headerText}>Contact us</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.AboutusContener}>
          <ContactUs onPress={SendMessage} />
          <ShareApp />
        </View>
      </ScrollView>

      <View>
        <MainBottomNav />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FCFF',
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 80,
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
  AboutusContener: {
    padding: 10,
  },
});

export default Index;
