import React, {memo, useEffect, useState} from 'react';
import {
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

const StudyDetails = ({route}) => {
  const {subject} = route.params;

  const {useQuery} = AuthContext;

  const savedStudies = useQuery(Study, studies => {
    return studies.filtered(
      `subject.id = "${subject.id}" OR subject.subject = "${subject.subject}"`,
    );
  });

  const [viewStudies, setViewStudies] = useState([...savedStudies]);
  const [showAccordianId, setShowAccordianId] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState(
    savedStudies[0].section,
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
      <ScrollView
        style={menuStyle.srollContainer}
        contentContainerStyle={menuStyle.contentContainer}
        horizontal
        showsHorizontalScrollIndicator={false}>
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
      </ScrollView>
    </View>
  );
});

export default StudyDetails;
