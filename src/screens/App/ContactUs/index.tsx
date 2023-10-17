import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@gluestack-ui/themed';
import ShareApp from '../../../components/Organisms/ShareApp';

const Index = () => {
  const navigator = useNavigation<any>();

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
          <View style={styles.textContener}>
            <Text style={styles.aboutUsText}>
              Please feel free to reach out with any question or concerns{' '}
            </Text>
            <Text style={styles.aboutusSubText}>
              we get back to you as soon as possible{' '}
            </Text>
          </View>
          <View style={styles.sendUsmessage}>
            <Text style={styles.messageText}>messeage</Text>
            <TextInput
              multiline
              numberOfLines={4}
              style={styles.messageInput}
            />
            <TouchableOpacity style={styles.Sendbtn}>
              <Text style={styles.sendbtnText}>send</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.befamTextContener}>
            <Text style={styles.befamText}>
              be a part of our famliy by joining our Tekegram Chanale
            </Text>
            <View style={styles.telegramlink}>
              <Text style={styles.linkText}> https://t.me/thinkhub</Text>
              <Ionicons name="link-sharp" color="#1E90FF" size={28} />
            </View>
          </View>

          <TouchableOpacity style={styles.befamTextContener2}>
            <FontAwesome5 name="headphones-alt" size={28} />
            <Text>Call custommer service</Text>
          </TouchableOpacity>
          <View style={{marginTop:10,width:343}}>
          <ShareApp />
     
          </View>
     
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
  textContener: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 102,
    borderColor: '#B5C3E5',
    borderWidth: 0.5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingRight: 0,
    paddingBottom: 10,
    paddingLeft: 13,
  },
  aboutUsText: {
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 22,
    color: '#1E90FF',
  },
  aboutusSubText: {
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    color: '#1E90FF',
  },
  sendUsmessage: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 6,
  },
  messageText: {
    fontFamily: 'Montserrat',
    fontWeight: '400',
    color: '#4D4D4D',
    marginVertical: 4,
  },
  messageInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#0D66D03B',
    borderWidth: 0.5,
    height: 94,
    width: 347,
  },
  Sendbtn: {
    width: 343,
    height: 50,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    marginTop: 10,
    paddingTop: 11,
    paddingRight: 23,
    paddingBottom: 11,
    paddingLeft: 23,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendbtnText: {
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 21,
    color: '#FFFFFF',
  },
  befamTextContener: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    width: 343,
    height: 94,
    marginTop: 50,
    padding: 8,
  },
  befamTextContener2: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    width: 343,
    height: 50,
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
    marginTop: 10,
  },
  telegramlink: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#1E90FF',
  },
  befamText: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    color: '#4D4D4D',
  },
});

export default Index;
