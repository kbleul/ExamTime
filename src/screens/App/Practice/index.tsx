import React, {useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import TrialHeader from '../../../components/Organisms/TrialHeader';
import EXamModeToogle from '../../../components/Molecules/EXamModeToogle';
import QuestionsCatagoryMenu from '../../../components/Molecules/QuestionsCatagoryMenu';
import {TestQustionsCatagories} from '../../../utils/Data/data';
import PracticeImageHeader from '../../../components/Atoms/PracticeImageHeader';

const Practice = () => {
  const [selectedCatagory, setSelectedCatagory] = useState(
    TestQustionsCatagories[0],
  );
  return (
    <SafeAreaView style={IndexStyle.container}>
      <ScrollView
        contentContainerStyle={IndexStyle.ScrollView}
        showsVerticalScrollIndicator={false}>
        <TrialHeader type="Practice" />
        <EXamModeToogle />
        <QuestionsCatagoryMenu
          selectedCatagory={selectedCatagory}
          setSelectedCatagory={setSelectedCatagory}
        />
        <PracticeImageHeader />
      </ScrollView>
      <MainBottomNav />
    </SafeAreaView>
  );
};

export default Practice;
