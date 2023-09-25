import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import StudySubjects from '../Molecules/StudySubjects';

const Study = () => {
  return (
    <ScrollView
      contentContainerStyle={style.subjectsCardContainer}
      showsVerticalScrollIndicator={false}>
      <StudySubjects subject={'math'} />
      <StudySubjects subject={'math'} />
      <StudySubjects subject={'math'} />
      <StudySubjects subject={'math'} />
      <StudySubjects subject={'math'} />
      <StudySubjects subject={'math'} />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  subjectsCardContainer: {
    paddingBottom: 45,
  },
});

export default Study;
