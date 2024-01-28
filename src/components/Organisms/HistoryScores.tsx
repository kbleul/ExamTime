import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {handleShareApp} from '../../utils/Functions/Helper/Share';

const HistoryScores = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Scores</Text>

      <View style={styles.subSubsontainer}>
        <View style={styles.examsScores}>
          <View style={styles.topContainer}>
            <Text style={styles.topContainerText}>70</Text>
            <MaterialIcons
              name="bolt"
              color="#EDC94F"
              size={screenWidth * 0.06}
            />
          </View>

          <Text style={styles.topContainerText2}>High Score</Text>
          <Text style={styles.topContainerText2}>Chemistry 2014</Text>

          <TouchableOpacity touchSoundDisabled style={styles.viewBtn}>
            <Text style={styles.viewBtnText}>View all</Text>
            <AntDesign name="right" size={screenWidth * 0.03} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.rightBox}>
          <View style={styles.challengeScore}>
            <Text style={styles.challengeScoreText}>
              Challenge Phase Progress
            </Text>
            <View style={styles.circleContainer}>
              <AnimatedCircularProgress
                size={60}
                width={4}
                backgroundWidth={2}
                fill={40}
                tintColor="#F0E2A1"
                backgroundColor="#000"
                rotation={0}>
                {fill => (
                  <View style={styles.progressTextContainer}>
                    <Text style={styles.progressText}>{Math.round(fill)}%</Text>
                  </View>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>
          <View style={styles.share}>
            <Text style={[styles.challengeScoreText, styles.shareScoreText]}>
              Share Your Score
            </Text>

            <View style={styles.shareContainer}>
              <TouchableOpacity touchSoundDisabled onPress={handleShareApp}>
                <FontAwesome5Brands
                  name="facebook"
                  color={'#1877F2'}
                  size={34}
                />
              </TouchableOpacity>
              <TouchableOpacity touchSoundDisabled onPress={handleShareApp}>
                <AntDesign name="instagram" color={'red'} size={32} />
              </TouchableOpacity>
              <TouchableOpacity touchSoundDisabled onPress={handleShareApp}>
                <FontAwesome5Brands
                  name="telegram"
                  color={'#2AABEE'}
                  size={32}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.274,
  },
  headerTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.045, //28
    color: '#000',
    lineHeight: screenHeight * 0.045, //34
    marginTop: screenWidth * 0.015,
  },
  subSubsontainer: {
    marginTop: screenHeight * 0.0045,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  examsScores: {
    width: '35%',
    height: screenHeight * 0.21,
    backgroundColor: '#364158',
    borderRadius: 12,
    overflow: 'hidden',
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenWidth * 0.02,
    justifyContent: 'space-between',
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
  rightBox: {
    width: '60%',
    marginLeft: '5%',
    height: screenHeight * 0.21,
    justifyContent: 'space-between',
  },
  challengeScore: {
    height: '47%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F0E2A1',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  challengeScoreText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.035, //28
    color: '#364158',
    width: '65%',
  },
  circleContainer: {
    backgroundColor: '#000',
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  progressTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  progressText: {
    fontSize: screenWidth * 0.042,
    fontFamily: 'PoppinsSemiBold',
    color: '#F0E2A1',
  },
  share: {
    height: '47%',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#F1F1F1',
  },
  shareScoreText: {
    width: '100%',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  shareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default HistoryScores;
