import React, {useState} from 'react';
import {Study} from '../../Realm';
import {Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';
import {accordiontyles, unitCardStyles} from '../../screens/App/Study/styles';

const UnitCardWithAccordion = ({
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
            <Feather
              name={study.pdf[0].isViewed ? 'check-square' : 'square'}
              size={24}
              style={accordiontyles.square}
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
              <Feather
                name={link.isViewed ? 'check-square' : 'square'}
                size={24}
                style={accordiontyles.square}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default UnitCardWithAccordion;