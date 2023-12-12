import React, {memo, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../../../Realm/model';
import {Study} from '../../../Realm';
import StudyDetalsHeader from '../../../components/Molecules/StudyDetalsHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import {screenHeight, screenWidth} from '../../../utils/Data/data';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import {calculateStudyProgress, filterStudies, getSections} from './logic';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import Toast from 'react-native-toast-message';
import {accordiontyles, menuStyle, style, unitCardStyles} from './styles';

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
              <UnitsCard
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

const UnitsCard = ({
  study,
  showAccordianId,
  setShowAccordianId,
}: {
  study: Study;
  showAccordianId: string | null;
  setShowAccordianId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [showContent, setShowContent] = useState(false);

  return (
    <View style={unitCardStyles.container}>
      <TouchableOpacity
        touchSoundDisabled
        style={unitCardStyles.topcontainer}
        onPress={() => {
          if (showAccordianId !== study.id) {
            setShowAccordianId(study.id);
            setShowContent(true);
          } else {
            setShowAccordianId(null);
            setShowContent(false);
          }
        }}>
        <View style={unitCardStyles.menuContainer}>
          <AntDesign name="menuunfold" size={40} color="#EEEAFF" />
        </View>
        <View style={unitCardStyles.textContainer}>
          <Text style={unitCardStyles.textTitle}>{study.unit}</Text>
          <Text style={unitCardStyles.textSubTitle}>{study.title}</Text>
        </View>
        <View style={unitCardStyles.downBtn}>
          <AntDesign
            name={
              showContent && study.id === showAccordianId
                ? 'caretup'
                : 'caretdown'
            }
            size={16}
            color="#4d4d4d"
          />
        </View>
      </TouchableOpacity>
      {showContent && study.id === showAccordianId && (
        <Accordion study={study} />
      )}
    </View>
  );
};

const Accordion = ({study}: {study: Study}) => {
  const navigator: any = useNavigation();

  return (
    <View>
      {study.objective && (
        <Text style={accordiontyles.objectiveText}>{study.objective}</Text>
      )}

      {study.selectedQuestion && study.selectedQuestion.length > 0 && (
        <View style={accordiontyles.container}>
          <TouchableOpacity
            touchSoundDisabled
            style={accordiontyles.assessmentBtn}
            onPress={() =>
              navigator.navigate('ViewAssessment', {
                questions: study.selectedQuestion,
                selectedSubject: study.subject ? study.subject.subject : '',
                subjectId: study.id,
              })
            }>
            <View style={accordiontyles.assessmentIcon}>
              <SimpleLineIcons name="user-following" size={20} />
            </View>
            <Text style={accordiontyles.assessmentTitle}>Self Assessment</Text>
            {/* <View style={accordiontyles.square} /> */}
            <Feather
              name={
                study.userExamAnswers.length > 0 ? 'check-square' : 'square'
              }
              size={24}
              style={accordiontyles.square}
            />
          </TouchableOpacity>
        </View>
      )}

      {study.pdf && study.pdf.length > 0 && (
        <View style={accordiontyles.container}>
          <TouchableOpacity
            touchSoundDisabled
            style={accordiontyles.assessmentBtn}
            onPress={() =>
              navigator.navigate('ViewPdf', {pdf: study.pdf, studyId: study.id})
            }>
            <View
              style={[
                accordiontyles.assessmentIcon,
                accordiontyles.assessmentIconBg,
              ]}
            />

            <Text style={accordiontyles.assessmentTitle}>Unit Review Note</Text>
          </TouchableOpacity>
        </View>
      )}

      {study.videoLink && study.videoLink.length > 0 && (
        <View style={accordiontyles.container}>
          {study.videoLink.map((link, index) => (
            <View key={link.videoLink + '' + index + 'links'}>
              <TouchableOpacity
                touchSoundDisabled
                style={accordiontyles.videoContainer}
                onPress={() =>
                  navigator.navigate('ViewVideo', {
                    videos: study.videoLink,
                    selectedVideoIndex: index,
                    studyId: study.id,
                  })
                }>
                <Text style={accordiontyles.videoText}>
                  0{index + 1}. Study video
                </Text>
                <View style={accordiontyles.videoIcon}>
                  <Entypo name="controller-play" size={30} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default StudyDetails;
