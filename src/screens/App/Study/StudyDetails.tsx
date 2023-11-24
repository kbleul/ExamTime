import React from 'react';
import {Text, View} from 'react-native';
import {AuthContext} from '../../../Realm/model';
import {Study} from '../../../Realm';

const StudyDetails = ({route}) => {
  const {subject} = route.params;

  const {useQuery} = AuthContext;

  console.log(subject);

  const savedSubjects = useQuery(Study, studies => {
    return studies.filtered(
      `subject.id = "${subject.id}" OR subject.subject = "${subject.subject}"`,
    );
  });

  //   const savedExam = useQuery(Exam, examItems => {
  //     return examItems.filtered(`id == "${exam.id}"`);
  //   });
  console.log(savedSubjects);
  return (
    <View>
      {savedSubjects && savedSubjects[0] && (
        <Text
          style={{
            color: 'black',
            fontSize: 30,
            marginTop: 30,
          }}>
          {savedSubjects[0].title}
        </Text>
      )}
    </View>
  );
};

export default StudyDetails;
