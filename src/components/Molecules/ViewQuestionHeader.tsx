import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {screenWidth} from '../../utils/Data/data';

const ViewQuestionHeader: React.FC<{
  title: string;
  setShowFullPage?: React.Dispatch<React.SetStateAction<boolean>>;
  showFullPage?: boolean;
  unansweredQuestionsLength?: number;
  filterUnansweredQuestions?: () => void;
  isReview?: boolean;
  setCurrentQuestion?: React.Dispatch<React.SetStateAction<number>>;
  refIndex?: React.MutableRefObject<number>;
}> = ({
  title,
  setShowFullPage,
  showFullPage,
  unansweredQuestionsLength,
  filterUnansweredQuestions,
  isReview,
  setCurrentQuestion,
  refIndex,
}) => {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity touchSoundDisabled onPress={() => navigator.goBack()}>
        <Ionicons name="chevron-back" color="black" size={30} />
      </TouchableOpacity> */}

      <Text style={styles.titleText}>{title}</Text>

      {/* <TouchableOpacity touchSoundDisabled>
            <FontAwesome5
              name="undo-alt"
              size={25}
              color="#1E90FF"
              style={styles.icon}
            />
          </TouchableOpacity> */}
      <View
        style={
          isReview
            ? [styles.buttonsContainer, styles.buttonsContainerSingle]
            : styles.buttonsContainer
        }>
        {!isReview && (
          <TouchableOpacity
            touchSoundDisabled
            style={styles.flagBtn}
            onPress={() =>
              unansweredQuestionsLength &&
              filterUnansweredQuestions &&
              unansweredQuestionsLength > 0 &&
              filterUnansweredQuestions()
            }>
            <View style={styles.flagContainer}>
              <MaterialCommunityIcons
                name="folder-text-outline"
                size={36}
                color="#1E90FF"
              />
              {unansweredQuestionsLength !== 0 && (
                <Text style={styles.flagBtnCounterText}>
                  {unansweredQuestionsLength}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}

        {setShowFullPage && (
          <TouchableOpacity
            touchSoundDisabled
            onPress={() => {
              setShowFullPage && setShowFullPage(prev => !prev);

              if (setCurrentQuestion && refIndex && refIndex.current) {
                setCurrentQuestion(refIndex.current);
                refIndex.current = 0;
              }
            }}
            style={
              showFullPage
                ? styles.pageToggle
                : [styles.pageToggle, styles.pageToggleActive]
            }>
            <FontAwesome
              name="file-text-o"
              size={20}
              color={showFullPage ? '#fff' : '#d9d9d9'}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 5,
    paddingRight: 15,
    marginBottom: 5,
  },
  titleText: {
    width: '75%',
    color: 'black',
    fontFamily: 'PoppinsBold',
    fontSize: screenWidth * 0.045,
    textAlign: 'left',
    paddingTop: 5,
    paddingLeft: 10,
  },
  titleTextSecondary: {
    width: '90%',
  },
  buttonsContainer: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonsContainerSingle: {
    justifyContent: 'flex-end',
  },
  doneContainer: {
    borderRadius: 5,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 0.5,
  },
  doneText: {
    fontSize: 9,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
  },
  iconContainer: {
    width: '10%',
  },
  icon: {
    paddingTop: 2,
  },
  flagBtn: {
    padding: 2,
  },
  flagContainer: {
    position: 'relative',
  },
  flagBtnCounterText: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    color: 'white',
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.03,
    borderRadius: 10,
    backgroundColor: '#1E90FF',
    width: 18,
    height: 18,
    textAlign: 'center',
  },
  pageToggle: {
    width: 35,
    height: 35,
    backgroundColor: '#1E90FF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
  },
  pageToggleActive: {
    borderRadius: 80,
    backgroundColor: '#35494A',
  },
  lockStyle: {
    backgroundColor: '#2968F5',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewQuestionHeader;
