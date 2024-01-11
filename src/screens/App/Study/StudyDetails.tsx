import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../../../Realm/model';
import {Study} from '../../../Realm';
import StudyDetalsHeader from '../../../components/Molecules/StudyDetalsHeader';

import {calculateStudyProgress, filterStudies, getSections} from './logic';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import Toast from 'react-native-toast-message';
import {menuStyle, style} from './styles';
import UnitCardWithAccordion from '../../../components/Organisms/UnitCardWithAccordion';
import {useNavContext} from '../../../context/bottomNav';
import {useNavigation, useNavigationState} from '@react-navigation/native';

const fectSavedStudies = (realm: Realm, subject: any) => {
  const savedStudies = realm
    .objects(Study)
    .filtered(
      `subject.id = "${subject.id}" OR subject.subject = "${subject.subject}"`,
    );

  return savedStudies;
};

const StudyDetails = ({route}) => {
  const navigationState = useNavigationState(state => state);
  const currentScreen = navigationState.routes[navigationState.index].name;

  const {subject} = route.params;
  const {setShowNavigation} = useNavContext();

  const navigator: any = useNavigation();

  const {useRealm} = AuthContext;

  const realm = useRealm();
  const savedStudies = useMemo(
    () => fectSavedStudies(realm, subject),
    [subject, realm],
  );
  const [viewStudies, setViewStudies] = useState([...savedStudies]);
  const [showAccordianId, setShowAccordianId] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState(
    savedStudies && savedStudies.length > 0 ? savedStudies[0].section : null,
  );

  useEffect(() => {
    if (savedStudies.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'No study items found',
        text2: 'Try a different subject',
      });
      return;
    }

    selectedSection &&
      filterStudies(
        savedStudies,
        selectedSection,
        setViewStudies,
        setSelectedSection,
      );
  }, [subject]);

  useEffect(() => {
    const backAction = () => {
      navigator.navigate('StudySection');
      setShowNavigation(true);

      return true;
    };

    let backHandler: any;

    if (currentScreen === 'StudyDetails') {
      backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
    } else {
      backHandler && backHandler.remove();
    }

    // Clean up the event listener when the component is unmounted
    return () => {
      if (backHandler) {
        backHandler.remove();
      }
    };
  }, []);

  return (
    <SafeAreaView style={[IndexStyle.container, style.container]}>
      <ScrollView
        style={style.ScrollView}
        contentContainerStyle={style.contentContainer}
        showsVerticalScrollIndicator={false}>
        {savedStudies && savedStudies[0] && (
          <>
            <StudyDetalsHeader
              subjectName={subject.subject}
              progress={calculateStudyProgress(savedStudies)}
            />

            <SectionMenu
              studies={savedStudies}
              setViewStudies={setViewStudies}
              setSelectedSection={setSelectedSection}
              selectedSection={selectedSection}
            />

            {viewStudies.map((study, index) => (
              <UnitCardWithAccordion
                key={study.id + '--' + index}
                study={study}
                showAccordianId={showAccordianId}
                setShowAccordianId={setShowAccordianId}
              />
            ))}
          </>
        )}
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

const SectionMenu = memo(function SectionMenu({
  studies,
  setViewStudies,
  setSelectedSection,
  selectedSection,
}: {
  studies: ResultsType<Study>;
  setViewStudies: React.Dispatch<React.SetStateAction<Study[]>>;
  setSelectedSection: React.Dispatch<React.SetStateAction<string | null>>;
  selectedSection: string | null;
}) {
  const sectionItems = getSections(studies);

  return (
    <View style={menuStyle.container}>
      <View style={menuStyle.contentContainer}>
        {sectionItems.map((section, index) => (
          <TouchableOpacity
            touchSoundDisabled
            key={section + '--' + index}
            style={
              selectedSection === section
                ? [menuStyle.button, menuStyle.buttonSelected]
                : menuStyle.button
            }
            onPress={() =>
              filterStudies(
                studies,
                section,
                setViewStudies,
                setSelectedSection,
              )
            }>
            <Text style={menuStyle.buttonText}>{section}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

export default StudyDetails;
