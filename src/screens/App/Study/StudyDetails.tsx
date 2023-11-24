import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../../../Realm/model';
import {Study} from '../../../Realm';
import StudyDetalsHeader from '../../../components/Molecules/StudyDetalsHeader';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import {screenHeight, screenWidth} from '../../../utils/Data/data';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
  console.log(savedSubjects.length);
  return (
    <View style={style.container}>
      {savedSubjects && savedSubjects[0] && (
        <>
          <StudyDetalsHeader
            subjectName={savedSubjects[0].title}
            progress={savedSubjects[0].progress}
          />

          <UnitsCard />
          <UnitsCard />
          <UnitsCard />
          <UnitsCard />
        </>
      )}
    </View>
  );
};

const UnitsCard = () => {
  return (
    <View style={unitCardStyles.container}>
      <View style={unitCardStyles.menuContainer}>
        <AntDesign name="menuunfold" size={50} color="#EEEAFF" />
      </View>
      <View style={unitCardStyles.textContainer}>
        <Text style={unitCardStyles.textTitle}>Unit One</Text>
        <Text style={unitCardStyles.textSubTitle}>Cell Biology</Text>
      </View>
      <View style={unitCardStyles.downBtn}>
        <AntDesign name="caretdown" size={16} color="#4d4d4d" />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#F9FCFF',
    flex: screenHeight,
  },
});

const unitCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E1E1E1',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  menuContainer: {
    width: '20%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContainer: {
    width: '70%',
    position: 'relative',
  },
  textTitle: {
    color: '#1E90FF',
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.045,
  },
  textSubTitle: {
    color: '#000',
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.035,
    position: 'absolute',
    bottom: -1,
  },
  downBtn: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default StudyDetails;
