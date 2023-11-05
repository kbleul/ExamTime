import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

let timerInterval: any;
const startCountTime = (
  formattedTime: string,
  setTimer: React.Dispatch<React.SetStateAction<string>>,
) => {
  const timeParts = formattedTime.split(':').map(part => parseInt(part));
  let [hours, minutes, seconds] = timeParts;

  timerInterval = setInterval(() => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(timerInterval);
    } else {
      if (seconds > 0) {
        seconds--;
      } else {
        if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else {
          hours--;
          minutes = 59;
          seconds = 59;
        }
      }

      const formatted =
        hours !== 0
          ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
              .toString()
              .padStart(2, '0')}`
          : `${minutes.toString().padStart(2, '0')}:${seconds
              .toString()
              .padStart(2, '0')}`;

      console.log(hours);
      setTimer(formatted);
    }
  }, 1000);
};

const ExamTimer: React.FC<{
  formatedTime: string;
  timer: string;
  setTimer: React.Dispatch<React.SetStateAction<string>>;
  startTimer: string;
}> = ({formatedTime, timer, setTimer, startTimer}) => {
  useEffect(() => {
    startTimer && startCountTime(formatedTime, setTimer);

    return () => {
      clearInterval(timerInterval);
    };
  }, [startTimer]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Images/gif/watch.gif')}
        style={styles.watchImg}
      />

      <Text style={styles.timeText}>{timer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#008e97',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 2,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 10,
  },
  timeText: {
    fontSize: 16,
    color: '#008e97',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 5,
  },
  watchImg: {
    width: 35,
    height: 35,
  },
});

export default ExamTimer;
