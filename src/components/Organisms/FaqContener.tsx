import React from 'react'
import { ScrollView,Text,View,TextInput,StyleSheet } from 'react-native'
import Antdesign from 'react-native-vector-icons/AntDesign';
import Accordion from '../Molecules/Accordion';
import { FAQ } from '../../utils/Data/data';
const FaqContener = () => {
  return (
   <View>
        <Text style={styles.subHeadtext}>Find Answers to Your Questions</Text>
        <View style={styles.faqInput}>
          <TextInput placeholder="write your question" style={styles.input} />
          <Antdesign name="search1" size={24} />
        </View>

        <View style={styles.faq}>
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            >
              
            <Text style={styles.faqText}>Frequently asked questions</Text>

            {FAQ.map((item, index) => (
              <Accordion key={index} question={item.ques} answer={item.ans} />
            ))}
          </ScrollView>
        </View>
      
        </View>
  )
}
const styles= StyleSheet.create({
    subHeadtext: {
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'Montserrat',
        lineHeight: 22,
        color: '#4D4D4D',
      },
      scrollContainer: {
        paddingBottom: 40,
      },
      faqInput: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 2,
        alignItems: 'center',
        gap: 1,
        borderColor: '#0D66D03B',
        borderWidth: 1,
        borderRadius: 10,
        width: 342,
        height: 39,
        marginTop: 3,
      },
      input: {
        width: 280,
        height: 39,
      },
      faq: {
        marginTop: 23,
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        height: 400,
      },
      faqText: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 22,
        color: '#4D4D4D',
      },
      faqBtn: {
        height: 44,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#0D66D03B',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        marginTop: 10,
        justifyContent: 'flex-start',
      },
      faqbtnTxt: {
        fontWeight: '500',
        fontSize: 15,
        fontFamily: 'Montserrat',
        lineHeight: 18,
      },
})
export default FaqContener