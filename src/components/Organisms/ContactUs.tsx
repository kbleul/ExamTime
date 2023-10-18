import React from 'react'
import {StyleSheet, View, Text,TouchableOpacity  } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons'
import SendUsmessage from '../Molecules/SendUsmessage';

const ContactUs:React.FC<{onPress:()=>void}> =({onPress}) => {
  return (
   <View style={styles.AboutusContener}>
       <View style={styles.textContener}>
            <Text style={styles.aboutUsText}>
              Please feel free to reach out with any question or concerns{' '}
            </Text>
            <Text style={styles.aboutusSubText}>
              we get back to you as soon as possible{' '}
            </Text>
          </View>
          <SendUsmessage onPress={onPress}/>
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
    <FontAwesome5Icon name="headphones-alt" size={28} />
    <Text>Call custommer service</Text>
  </TouchableOpacity>
   </View>
  
  )
}
const styles = StyleSheet.create({
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
    
    befamTextContener: {
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        width: 343,
        height: 94,
        marginTop: 40,
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
})
export default ContactUs