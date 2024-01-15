import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ChosenCoursesCard from '../Molecules/ChosenAndOtherCourses/ChosenCoursesCard';
import {screenWidth} from '../../utils/Data/data';
import {Subject} from '../../Realm';
import {AuthContext} from '../../Realm/model';
import {subjectType} from '../../types';

const getSavedSubjects = (
  realm: Realm,
  selectedSubjectId: string | null | undefined,
): string[] | [] => {
  let savedSubjects = realm.objects(Subject);

  const savedSubjectsIds: string[] = [];

  savedSubjects.forEach(item => {
    item.id !== selectedSubjectId && savedSubjectsIds.push(item.id);
  });

  return savedSubjectsIds;
};

const SubjectSelectViewBox: React.FC<{
  SelectedSubjectId: string | null | undefined;
  setSelectedSubject: React.Dispatch<
    React.SetStateAction<subjectType | Subject | null>
  >;
}> = ({SelectedSubjectId, setSelectedSubject}) => {
  const {useQuery, useRealm} = AuthContext;
  const SelectedSubject = useQuery(Subject, SubjectItem => {
    return SubjectItem.filtered(`id = "${SelectedSubjectId}"`);
  });

  const realm = useRealm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [SelectedSubjectId]);

  const renderItem = ({item}: {item: string}) => {
    const selectedSubject = realm.objects(Subject).filtered(`id = "${item}"`);

    return (
      <View style={styles.renderStyle}>
        {SelectedSubjectId &&
          selectedSubject &&
          selectedSubject.length > 0 &&
          selectedSubject[0]?.subject && (
            <SubjectsButton
              title={selectedSubject[0]?.subject.subject}
              updateSelectedSubject={() => {
                setIsLoading(true);
                setSelectedSubject(selectedSubject[0]);
              }}
              SelectedSubjectId={SelectedSubjectId}
              itemId={selectedSubject[0].id}
            />
          )}
      </View>
    );
  };
  return (
    <View style={styles.subjectsContainer}>
      <View style={styles.subjectsImgContainer}>
        {SelectedSubject && SelectedSubject[0] && SelectedSubject[0].icon && (
          <ChosenCoursesCard subjectId={SelectedSubjectId} />
        )}
        <Text style={styles.dot}>1</Text>
      </View>

      <View style={styles.subjectsButtonContaier}>
        {SelectedSubject && SelectedSubject.length > 0 && (
          <FlatList
            data={getSavedSubjects(realm, SelectedSubjectId)}
            renderItem={renderItem}
            keyExtractor={item => item}
            contentContainerStyle={styles.listContaier}
            style={styles.listContaier}
            numColumns={2} // Set the number of columns to 2 for a 2-column layout
          />
        )}
      </View>
    </View>
  );
};

const SubjectsButton: React.FC<{
  title: string;
  updateSelectedSubject: () => void;
  SelectedSubjectId: string;
  itemId: string;
}> = ({title, updateSelectedSubject, SelectedSubjectId, itemId}) => {
  return (
    <TouchableOpacity
      touchSoundDisabled
      style={
        SelectedSubjectId === itemId
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
    backgroundColor: '#000',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    overflow: 'hidden',
    marginTop: 5,
    color: '#000',
  },
  subjectsButtonContaier: {
    width: '63%',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 220,
  },
  listContaier: {
    width: '100%',
  },
  renderStyle: {
    width: '48%',
    marginHorizontal: '1%',
    marginVertical: '3.5%',
  },
  subjectsButton: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    overflow: 'hidden',
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
    fontSize: screenWidth * 0.03,
  },
});

export default SubjectSelectViewBox;
