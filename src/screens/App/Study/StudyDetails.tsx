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
import {calculateProgress, filterStudies, getSections} from './logic';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import Toast from 'react-native-toast-message';

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
              progress={calculateProgress(savedStudies)}
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
            onPress={() => navigator.navigate('ViewPdf', {pdf: study.pdf})}>
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
            <View style={{}} key={link.videoLink + '' + index + 'links'}>
              <TouchableOpacity
                touchSoundDisabled
                style={accordiontyles.videoContainer}
                onPress={() =>
                  navigator.navigate('ViewVideo', {
                    videos: study.videoLink,
                    selectedVideoIndex: index,
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

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 30,
    width: '100%',
    backgroundColor: '#F9FCFF',
    flex: screenHeight,
  },
  ScrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

const menuStyle = StyleSheet.create({
  container: {
    height: 60,
  },
  srollContainer: {
    width: screenWidth,
    marginBottom: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 30,
    marginLeft: screenWidth * 0.07,
  },
  button: {
    paddingVertical: 2,
    paddingHorizontal: screenWidth / 6,
  },
  buttonSelected: {
    borderBottomWidth: 3,
    borderColor: '#399BE2',
  },
  buttonText: {
    fontSize: screenWidth * 0.04,
    color: '#000',
    fontFamily: 'PoppinsMedium',
    textTransform: 'capitalize',
  },
});

const unitCardStyles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#949090',
  },
  topcontainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  menuContainer: {
    width: '20%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textContainer: {
    width: '70%',
    position: 'relative',
  },
  textTitle: {
    color: '#1e90ff',
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.042,
    textTransform: 'capitalize',
  },
  textSubTitle: {
    color: '#000',
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.04,
    position: 'absolute',
    bottom: -10,
  },
  downBtn: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

const accordiontyles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#E1E1E1',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  objectiveText: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 8,
    marginBottom: 5,
    fontFamily: 'PoppinsMedium',
    textTransform: 'capitalize',
    fontSize: screenWidth * 0.036,
    color: '#000',
    lineHeight: 24,
  },
  videoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    marginVertical: 10,
  },
  videoText: {
    color: '#A4A4AE',
    fontSize: screenWidth * 0.04,
    fontFamily: 'PoppinsSemiBold',
  },
  videoIcon: {
    backgroundColor: '#9A85FC',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  assessmentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assessmentIcon: {
    marginHorizontal: 5,
    marginVertical: 7,
    backgroundColor: '#EEF1F6',
    borderRadius: 8,
    overflow: 'hidden',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
  },
  assessmentIconBg: {
    backgroundColor: '#399BE2',
    height: 45,
  },
  assessmentTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.04,
    marginLeft: screenWidth * 0.03,
    color: '#000',
    width: '72%',
  },
  square: {
    color: '#000',
    alignSelf: 'flex-start',
  },
});

export default StudyDetails;
