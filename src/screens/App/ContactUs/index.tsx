import React, {useState} from 'react';
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
import {RootState} from '../../../reduxToolkit/Store';
import {useCreatecommentMutation} from '../../../reduxToolkit/Services/auth';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

const Index = () => {
  const navigator = useNavigation<any>();

  const token = useSelector((state: RootState) => state.auth.token);
  const [Createcomment, {isLoading: isLoadingChange}] =
    useCreatecommentMutation();

  const SendMessage = async (text: any) => {
    try {
      console.log('clicked');
      const result: any = await Createcomment({
        token: token || '',
        comment: text,
      });
      console.log(result);

      if (result?.statusCode == 401) {
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: `Post comment unsuccessfull. Please try again`,
        });
        return;
      }

      Toast.show({
        type: 'success',
        text1: 'success',
        text2: 'Message sent successfully',
        visibilityTime: 4000,
      });
    } catch (error) {}
  };

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
          <ContactUs onPress={SendMessage} isLoading={isLoadingChange} />
          <ShareApp />
        </View>
      </ScrollView>

      <View>
        <MainBottomNav />
      </View>

      <Toast />
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
