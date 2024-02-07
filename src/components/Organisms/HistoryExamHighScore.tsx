import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {screenHeight, screenWidth} from '../../utils/Data/data';
import {AuthContext} from '../../Realm/model';
import {getHighScoreExam} from '../../utils/Functions/Helper/historyCalculations';

const HistoryExamHighScore = ({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {useRealm} = AuthContext;
  const realm = useRealm();

  const highScore = getHighScoreExam(realm);

  return (
    <View style={styles.examsScores}>
      {!highScore && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyContainerText}>No exam history yet!</Text>
        </View>
      )}

      {highScore && (
        <>
          <View style={styles.topContainer}>
            <Text style={styles.topContainerText}>{highScore.score}%</Text>
            <MaterialIcons
              name="bolt"
              color="#EDC94F"
              size={screenWidth * 0.06}
            />
          </View>

          <Text style={styles.topContainerText2}>High Score</Text>
          <Text style={styles.topContainerText2}>
            {highScore.exam.subject?.subject} {highScore.exam.year}
          </Text>

          <TouchableOpacity
            touchSoundDisabled
            style={styles.viewBtn}
            onPress={() => setOpenModal(true)}>
            <Text style={styles.viewBtnText}>View all</Text>
            <AntDesign
              name="right"
              size={screenWidth * 0.025}
              style={styles.icon}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default HistoryExamHighScore;
const styles = StyleSheet.create({
  examsScores: {
    width: '35%',
    height: screenHeight * 0.21,
    backgroundColor: '#364158',
    borderRadius: 12,
    overflow: 'hidden',
    paddingHorizontal: screenWidth * 0.03,
    paddingVertical: screenWidth * 0.02,
    justifyContent: 'space-between',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  emptyContainerText: {
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.032, //28
    color: '#fff',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: screenWidth * 0.02,
  },
  topContainerText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.05, //28
    color: '#fff',
    paddingTop: screenHeight * 0.008,
  },
  topContainerText2: {
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.032, //28
    color: '#fff',
  },
  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7A00',
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  viewBtnText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.03, //28
    color: '#fff',
  },
  icon: {
    color: '#fff',
    paddingBottom: 2,
  },
});
