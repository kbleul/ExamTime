import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, TextInput, StyleSheet} from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import Accordion from '../Molecules/Accordion';
import {FAQ, screenHeight} from '../../utils/Data/data';
import AccordionComponet from '../Molecules/Accordion';
import scale from '../../utils/Functions/Scale';
const FaqContener = () => {
  const [faq, setFaq] = useState([]);
  const [getFaq, {isLoading: loading}] = useGetFaqMutation();
  const fetchFaq = async () => {
    try {
      const response = await getFaq().unwrap();
      setFaq(response);
    } catch (err) {}
  };
  const HandelSearch = input => {
    setFaq(
      faq?.filter(faq =>
        faq.question.toUpperCase().includes(input.toUpperCase()),
      ),
    );
  };
  useEffect(() => {
    fetchFaq();
  }, []);
  if (loading) {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontSize: 18}}>Loading....</Text>
      </View>
    );
  }
  return (
    <View>
      {/* <View style={styles.faqInput}>
        <Antdesign name="search1" size={24} color="#d4d4d4" />
        <TextInput placeholder="Search Using Keywords" style={styles.input} />
      </View> */}

      <View style={styles.faq}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <Text style={styles.faqText}>About Exam Time</Text>
          <AccordionComponet />
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
    // paddingBottom: 40,
  },
  faqInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    borderColor: '#0D66D03B',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: scale(45),
    marginTop: 3,
    elevation: 5,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    fontSize: scale(15),
    color: '#9A9A9A',
    fontFamily: 'PoppinsRegular',
  },
  faq: {
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 6,
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
    height: screenHeight - 200,
  },
  faqText: {
    fontFamily: 'PoppinsMedium',
    fontSize: scale(20),
    fontWeight: '500',
    color: '#3C3D6E',
    paddingLeft: 4,
  },
  faqBtn: {
    height: 44,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
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
