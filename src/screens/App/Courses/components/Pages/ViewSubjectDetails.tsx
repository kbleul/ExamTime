import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import img from '../../../../../assets/Images/courses/4.png';
import Octicons from 'react-native-vector-icons/Octicons';

import BackWithItem from '../../../../../components/Organisms/BackWithItem';
import MainBottomNav from '../../../../../components/Organisms/MainBottomNav';
import ProgressBar from '../Molecules/ProgressBar';
import UnitsAccordion from '../Molecules/UnitsAccordion';
import AuthPrompt from '../../../../../components/Organisms/AuthPrompt';

const Grades = ['Grade 5', 'Grade 6'];

const ViewSubjectDetails = () => {
  const [selectedGrade, setSelectedGrade] = useState(Grades[0]);
  const [showAuthPromp, setShowAuthPromp] = useState(false);

  return (
    <View
      style={
        showAuthPromp ? [styles.container, styles.prompOn] : styles.container
      }>
      <ScrollView>
        <BackWithItem type="Courses" isTrial={true} />

        <View style={styles.topSectionContainer}>
          <Image source={img} style={styles.topImg} />

          <View style={styles.selectorContainer}>
            <TouchableOpacity
              onPress={() => setSelectedGrade(Grades[0])}
              style={
                selectedGrade === Grades[0]
                  ? [styles.buttons, styles.activeButton]
                  : styles.buttons
              }>
              <Text
                style={
                  selectedGrade === Grades[0]
                    ? styles.buttonText
                    : [styles.buttonText, styles.activeButtonText]
                }>
                {Grades[0]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedGrade(Grades[1])}
              style={
                selectedGrade === Grades[1]
                  ? [styles.buttons, styles.activeButton]
                  : styles.buttons
              }>
              <Text
                style={
                  selectedGrade === Grades[1]
                    ? styles.buttonText
                    : [styles.buttonText, styles.activeButtonText]
                }>
                {Grades[1]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.title}>Mathemathics</Text>

          <ProgressBar />
          <UnitsAccordion
            showAuthPromp={showAuthPromp}
            setShowAuthPromp={setShowAuthPromp}
          />
        </View>
      </ScrollView>

      {showAuthPromp && (
        <View style={styles.adsPrompContainer}>
          <TouchableOpacity
            style={styles.cancleContainer}
            onPress={() => setShowAuthPromp(false)}>
            <Octicons name="x-circle-fill" size={26} color="black" />
          </TouchableOpacity>
          <AuthPrompt />
        </View>
      )}

      <MainBottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  prompOn: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  topSectionContainer: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topImg: {
    width: '50%',
    height: '50%',
  },
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    borderRadius: 80,
    width: '65%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#1E90FF',
    marginTop: 15,
    padding: 2,
  },
  subjectsCardContainer: {
    paddingBottom: 45,
  },
  buttons: {
    width: '45%',
    paddingVertical: '3%',
    color: 'black',
  },
  activeButton: {
    backgroundColor: '#1E90FF',
    width: '55%',
    borderRadius: 80,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  activeButtonText: {
    color: '#858585',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: '#222E50',
    marginHorizontal: 20,
  },
  adsPrompContainer: {
    position: 'absolute',
    top: '30%',
    zIndex: 20,
    marginLeft: 13,
    borderRadius: 10,
    paddingTop: 5,
  },
  cancleContainer: {
    alignItems: 'flex-end',
  },
});

export default ViewSubjectDetails;
