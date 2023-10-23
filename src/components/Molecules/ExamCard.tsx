import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DummyType} from '../../screens/App/Practice';
import {screenHeight} from '../../utils/Data/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const ExamCard: React.FC<{exam: DummyType}> = ({exam}) => {
  const navigate = useNavigation();
  return (
    <View
      style={
        exam.isTaken
          ? [styles.container, styles.containerTaken]
          : styles.container
      }>
      <View style={styles.imgContainer}>
        <ImageBackground
          style={styles.img}
          source={exam.img} // Replace with the correct path to your image
          resizeMode="cover"
        />
      </View>

      <View style={styles.leftBoxContainer}>
        <Text style={styles.title}>{exam.title}</Text>
        <View style={styles.smallBox}>
          <AntDesign name="question" size={14} style={styles.icon} />

          <Text style={styles.text}>{exam.questions} Qusetions</Text>
        </View>
        <View style={styles.smallBox}>
          <Ionicons name="time" size={22} color="#0066B2" />
          <Text style={styles.text}>{exam.time} Minutes</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigate.navigate('Exam-View')}
            style={
              exam.isTaken ? [styles.button, styles.buttonTaken] : styles.button
            }
            touchSoundDisabled>
            <Text
              style={
                exam.isTaken
                  ? [styles.buttonText, styles.buttonTextActive]
                  : styles.buttonText
              }>
              {exam.isTaken ? 'Taken' : 'Start now'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 8,
    borderColor: '#F9FCFF',
    borderRadius: 10,
    minHeight: 140,
    height: screenHeight / 5.7,
    width: '97%',
    alignSelf: 'center',
    marginBottom: 5,
    flexDirection: 'row',
  },
  containerTaken: {
    borderColor: '#FCCB06',
    borderWidth: 6,
  },
  imgContainer: {
    width: '30%',
    height: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  leftBoxContainer: {
    width: '70%',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    color: '#1E90FF',
    fontFamily: 'Montserrat-SemiBold',
  },
  smallBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 5,
  },
  icon: {
    backgroundColor: '#0066B2',
    color: '#FFFFFF',
    borderRadius: 10,
    padding: 2,
  },
  text: {
    color: '#858585',
    fontFamily: 'Montserrat-Regular',
    marginLeft: 8,
    fontSize: 14,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 2,
  },
  button: {
    borderRadius: 20,
    width: '50%',
    paddingVertical: 7,
    paddingHorizontal: 20,
    backgroundColor: '#1E90FF',
  },
  buttonTaken: {
    backgroundColor: '#FCCB06',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Montserrat-Regular',
  },
  buttonTextActive: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default ExamCard;
