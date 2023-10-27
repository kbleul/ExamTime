import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ChosenCoursesCard from '../Molecules/ChosenAndOtherCourses/ChosenCoursesCard';
import {DummySubjects} from '../Molecules/ChosenAndOtherCourses';
import {screenHeight} from '../../utils/Data/data';

type propType = {
  id: string;
  title: string;
  lessonsCount: number;
  progress: number;
  bgImage: any;
};
const SubjectSelectViewBox: React.FC<{
  SelectedSubject: propType;
  setSelectedSubject: React.Dispatch<React.SetStateAction<propType>>;
}> = ({SelectedSubject, setSelectedSubject}) => {
  const renderItem = ({item}: {item: any}) => (
    <View style={styles.renderStyle}>
      <SubjectsButton
        title={item.title}
        updateSelectedSubject={() => setSelectedSubject(item)}
        SelectedSubject={SelectedSubject.id}
        itemId={item.id}
      />
    </View>
  );

  return (
    <View style={styles.subjectsContainer}>
      <View style={styles.subjectsImgContainer}>
        <ChosenCoursesCard
          title={SelectedSubject.title}
          lessonsCount={SelectedSubject.lessonsCount}
          bgImage={SelectedSubject.bgImage}
        />
        <Text style={styles.dot} />
      </View>

      <View style={styles.subjectsButtonContaier}>
        <FlatList
          data={DummySubjects.filter(
            subject => subject.id !== SelectedSubject.id,
          )}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContaier}
          style={styles.listContaier}
          numColumns={2} // Set the number of columns to 2 for a 2-column layout
        />
      </View>
    </View>
  );
};

const SubjectsButton: React.FC<{
  title: string;
  updateSelectedSubject: () => void;
  SelectedSubject: string;
  itemId: string;
}> = ({title, updateSelectedSubject, SelectedSubject, itemId}) => {
  return (
    <TouchableOpacity
      touchSoundDisabled
      style={
        SelectedSubject === itemId
          ? [styles.subjectsButton, styles.subjectsButtonActive]
          : styles.subjectsButton
      }
      onPress={updateSelectedSubject}>
      <Text style={styles.subjectButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  subjectsContainer: {
    flexDirection: 'row',
  },
  subjectsImgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    borderRadius: 20,
    marginTop: 5,
  },
  subjectsButtonContaier: {
    width: '63%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContaier: {
    width: '100%',
  },
  renderStyle: {
    width: '48%',
    marginHorizontal: '1%',
  },
  subjectsButton: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    marginVertical: '8.5%',
  },
  subjectsButtonActive: {
    borderWidth: 1,
    borderColor: '#000',
  },
  subjectButtonText: {
    color: '#000',
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
    paddingVertical: 8,
  },
});

export default SubjectSelectViewBox;
