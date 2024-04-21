import React, {useState} from 'react';
import {Challange, Study} from '../../Realm';
import {Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';
import {accordiontyles, unitCardStyles} from '../../screens/App/Study/styles';
import {screenWidth} from '../../utils/Data/data';
import {isHtml} from '../../utils/Functions/Helper';
import RenderHTML from 'react-native-render-html';
import {AuthContext} from '../../Realm/model';

const tagsStylesQuestion = {
  p: {
    whiteSpace: 'normal',
    color: '#000',
    textAlign: 'left',
    width: screenWidth * 0.9,
    marginLeft: screenWidth * 0.025,
    fontFamily: 'PoppinsSemiBold',
    fontWeight: 600,
    textTransform: 'capitalize',
    fontSize: screenWidth * 0.036,
    lineHeight: 25,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 10,
    padding: 10,
  },
  li: {
    whiteSpace: 'normal',
    color: '#000',
    textAlign: 'left',
    width: screenWidth * 0.8,
    marginLeft: screenWidth * 0.025,
    fontFamily: 'PoppinsSemiBold',
    fontWeight: 600,
    textTransform: 'capitalize',
    fontSize: screenWidth * 0.036,
    padding: 2,
  },
  img: {
    width: screenWidth * 0.8,
    marginTop: 5,
  },
};

const UnitCardWithAccordion = ({
  study,
  showAccordianId,
  setShowAccordianId,
  showSubject,
  isChallenge,
  index,
}: {
  study: Study;
  showAccordianId: string | null;
  setShowAccordianId: React.Dispatch<React.SetStateAction<string | null>>;
  showSubject?: boolean;
  isChallenge: boolean;
  index: number;
}) => {
  const [showContent, setShowContent] = useState(false);
  return (
    <View style={unitCardStyles.container}>
      <TouchableOpacity
        touchSoundDisabled
        style={
          isChallenge && index
            ? [
                unitCardStyles.topcontainer,
                unitCardStyles.topcontainerSecondary,
              ]
            : unitCardStyles.topcontainer
        }
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
          {isChallenge && index ? (
            <Text style={unitCardStyles.indexText}>{index}</Text>
          ) : (
            <AntDesign name="menuunfold" size={40} color="#EEEAFF" />
          )}
        </View>
        <View
          style={
            isChallenge && index
              ? [
                  unitCardStyles.textContainer,
                  unitCardStyles.textContainerSecondary,
                ]
              : unitCardStyles.textContainer
          }>
          <Text
            style={
              isChallenge && index
                ? [unitCardStyles.textTitle, unitCardStyles.textTitleSecondary]
                : unitCardStyles.textTitle
            }>
            {showSubject && (
              <Text
                style={
                  isChallenge && index
                    ? [
                        unitCardStyles.textTitleSubject,
                        unitCardStyles.textTitleSubjectSecondary,
                      ]
                    : unitCardStyles.textTitleSubject
                }>
                {study.subject?.subject + ' | '}
              </Text>
            )}
            {study.unit}
          </Text>
          <Text
            style={
              isChallenge && index
                ? [
                    unitCardStyles.textSubTitle,
                    unitCardStyles.textSubTitleSecondary,
                  ]
                : unitCardStyles.textSubTitle
            }>
            {study.title}
          </Text>
        </View>
        <View
          style={
            isChallenge && index
              ? [unitCardStyles.downBtn, unitCardStyles.downBtnSecondary]
              : unitCardStyles.downBtn
          }>
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
        <Accordion study={study} isChallenge={isChallenge} />
      )}
    </View>
  );
};

const Accordion = ({
  study,
  isChallenge,
}: {
  study: Study;
  isChallenge: boolean;
}) => {
  const navigator: any = useNavigation();
  const {useQuery} = AuthContext;

  const savedChallenges = useQuery(Challange);

  return (
    <View>
      {study.objective && study.objective !== 'undefined' && (
        <>
          {isHtml(study.objective) ? (
            <RenderHTML
              contentWidth={screenWidth}
              source={{html: study.objective}}
              tagsStyles={tagsStylesQuestion}
            />
          ) : (
            <Text style={accordiontyles.objectiveText}>{study.objective}</Text>
          )}
        </>
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
              navigator.navigate('ViewPdf', {
                pdf: study.pdf,
                studyId: study.id,
                isChallenge,
              })
            }>
            <View
              style={[
                accordiontyles.assessmentIcon,
                accordiontyles.assessmentIconBg,
              ]}
            />
            {isChallenge ? (
              <Feather
                name={
                  savedChallenges[0].finishedItems.includes(study.pdf[0].id)
                    ? 'check-square'
                    : 'square'
                }
                size={24}
                style={accordiontyles.square}
              />
            ) : (
              <Feather
                name={study.pdf[0].isViewed ? 'check-square' : 'square'}
                size={24}
                style={accordiontyles.square}
              />
            )}
            <Text style={accordiontyles.assessmentTitle}>Unit Review Note</Text>
          </TouchableOpacity>
        </View>
      )}

      {study.videoLink && study.videoLink.length > 0 && (
        <View style={accordiontyles.container}>
          {study.videoLink.map((link, index) => (
            <View key={link.id + '' + index + 'links'}>
              <TouchableOpacity
                touchSoundDisabled
                style={accordiontyles.videoContainer}
                onPress={() =>
                  navigator.navigate('ViewVideo', {
                    videos: study.videoLink,
                    selectedVideoIndex: index,
                    studyId: study.id,
                    isChallenge,
                  })
                }>
                <Text style={accordiontyles.videoText}>
                  0{index + 1}. Study video
                </Text>
                <View style={accordiontyles.videoIcon}>
                  <Entypo name="controller-play" size={30} color="#fff" />
                </View>
              </TouchableOpacity>
              {isChallenge ? (
                <Feather
                  name={
                    savedChallenges[0].finishedItems.includes(link.id)
                      ? 'check-square'
                      : 'square'
                  }
                  size={24}
                  style={accordiontyles.square}
                />
              ) : (
                <Feather
                  name={link.isViewed ? 'check-square' : 'square'}
                  size={24}
                  style={accordiontyles.square}
                />
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default UnitCardWithAccordion;
