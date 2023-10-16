import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import TrialHeader from '../../../components/Organisms/TrialHeader';
import ExamModeToggle from '../../../components/Molecules/ExamModeToggle';
import QuestionsCatagoryMenu from '../../../components/Molecules/QuestionsCatagoryMenu';
import {TestQustionsCatagories} from '../../../utils/Data/data';
import PracticeImageHeader from '../../../components/Atoms/PracticeImageHeader';
import ExamCard from '../../../components/Molecules/ExamCard';
import img1 from '.././../../assets/Images/home/s1.png';
import img2 from '.././../../assets/Images/home/s2.png';
import img3 from '.././../../assets/Images/home/s3.png';
import img4 from '.././../../assets/Images/home/s4.png';
import img5 from '.././../../assets/Images/home/s5.png';
import SelectInput from '../../../components/Atoms/SelectInput';
import CustomSlider from '../../../components/Molecules/CustomSlider';

export type DummyType = {
  id: string;
  title: string;
  questions: number;
  time: string;
  isTaken: boolean;
  img: any;
};
const Dummy: DummyType[] = [
  {
    id: 'exam1',
    title: 'Biology 2012 exam',
    questions: 100,
    time: '60',
    isTaken: false,
    img: img1,
  },
  {
    id: 'exam2',
    title: 'MAth 2012 exam',
    questions: 30,
    time: '40',
    isTaken: true,
    img: img2,
  },
  {
    id: 'exam3',
    title: 'English 2012 exam',
    questions: 60,
    time: '60',
    isTaken: false,
    img: img3,
  },
  {
    id: 'exam4',
    title: 'SAT 2012 exam',
    questions: 10,
    time: '60',
    isTaken: false,
    img: img4,
  },
  {
    id: 'exam5',
    title: 'Civics 2012 exam',
    questions: 10,
    time: '60',
    isTaken: false,
    img: img5,
  },
];
const Practice = () => {
  const [selectedCatagory, setSelectedCatagory] = useState(
    TestQustionsCatagories[0],
  );
  return (
    <SafeAreaView style={[IndexStyle.container, styles.container]}>
      <TrialHeader type="Practice" />
      <ExamModeToggle />
      <QuestionsCatagoryMenu
        selectedCatagory={selectedCatagory}
        setSelectedCatagory={setSelectedCatagory}
      />
      <PracticeImageHeader selectedCatagory={selectedCatagory} />

      {selectedCatagory === TestQustionsCatagories[0] && (
        <>
          <SelectInput />

          <ScrollView
            style={styles.ScrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <View style={{backgroundColor: 'white'}}>
              {Dummy.map(exam => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </View>
          </ScrollView>
        </>
      )}

      {selectedCatagory === TestQustionsCatagories[1] && (
        <>
          <View style={styles.previousInputContainer}>
            <SelectInput isPrevious index />
            <SelectInput isPrevious />
          </View>
          <ScrollView
            style={styles.ScrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <View style={{backgroundColor: 'white'}}>
              {Dummy.map(exam => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </View>
          </ScrollView>
        </>
      )}

      {selectedCatagory === TestQustionsCatagories[2] && <></>}

      <MainBottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ScrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  previousInputContainer: {
    flexDirection: 'row',
  },
});

export default Practice;
