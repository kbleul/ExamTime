import React, { useEffect, useState } from 'react';
import {ScrollView, Text, View, TextInput, StyleSheet} from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import Accordion from '../Molecules/Accordion';
import { screenHeight} from '../../utils/Data/data';
import { useGetFaqMutation } from '../../reduxToolkit/Services/auth';
import { checkIsOnline } from '../../utils/Functions/Helper';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
const FaqContener = () => {
  const [faq,setFaq] =useState([])
  const [
    getFaq,
    {isLoading: loading},
  ] = useGetFaqMutation();
  const fetchFaq = async()=>{
    try {
      const response = await getFaq().unwrap();
      setFaq(response)
    } catch (err) {
      //console.log(err);
    }
  }
  const HandelSearch = (input)=>{
    //console.log(input)
    setFaq(faq?.filter((faq)=>faq.question.toUpperCase().includes(input.toUpperCase())))
  }
  useEffect(() => {
   fetchFaq()
  }, []);
  if(loading){
    return(
      <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'black',fontSize:18}}>Loading....</Text>
      </View>
    )
  }
  return (
    <View>
      <Text style={styles.subHeadtext}>Find Answers to Your Questions</Text>
      <View style={styles.faqInput}>
        <TextInput onChangeText={HandelSearch} placeholder="write your question" style={styles.input} />
        <Antdesign name="search1" size={24} color="#d4d4d4" />
      </View>

      <View style={styles.faq}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <Text style={styles.faqText}>Frequently asked questions</Text>

          {faq?.map((item, index) => (
            <Accordion key={index} question={item.question} answer={item.answer} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  subHeadtext: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Montserrat-SemiBold',
    lineHeight: 22,
    color: '#4D4D4D',
    paddingHorizontal: 15,
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    height: 39,
    marginTop: 3,
    paddingHorizontal: 15,
    marginHorizontal: 15,
  },
  input: {
    width: 280,
    height: 39,
    color: '#d4d4d4',
  },
  faq: {
    marginTop: 23,
    borderRadius: 10,
    paddingHorizontal: 6,
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    height: screenHeight - 380,
  },
  faqText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 22,
    color: '#4D4D4D',
    marginBottom: 10,
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
    fontFamily: 'Montserrat-SemiBold',
    lineHeight: 18,
  },
});
export default FaqContener;
