import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const StudySubjects: React.FC<{subject: string}> = ({subject}) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('View-Course')}>
      <View style={styles.imgContainer}>
        <ImageBackground
          style={styles.imagebg}
          source={require('../../assets/Images/courses/1.png')} // Replace with the correct path to your image
        >
          <Text>{''} </Text>
        </ImageBackground>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.subject}>{subject}</Text>
        <Text style={styles.units}>8 units</Text>
        <View style={styles.indicatorContainer}>
          {/* <Text style={}></Text> */}
        </View>
        <Text style={styles.progressText}>0% completed</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#EDF7F6',
    width: '96%',
    marginLeft: '2%',
    padding: '1%',
    marginHorizontal: 2,
    marginVertical: 4,
    borderRadius: 10,
  },
  imgContainer: {
    width: '30%',
    padding: 4,
    backgroundColor: 'white',
    borderTopStartRadius: 10,
    borderBottomLeftRadius: 10,
  },
  imagebg: {
    width: '100%',
    height: 105,
    borderRadius: 10,
    overflow: 'hidden',
  },
  infoContainer: {
    width: '70%',
    padding: 10,
    backgroundColor: 'white',
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    justifyContent: 'flex-end',
  },
  subject: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    textTransform: 'capitalize',
    color: '#1E90FF',
  },
  units: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    textTransform: 'capitalize',
    color: '#858585',
    paddingVertical: 2,
  },
  indicatorContainer: {
    width: '100%',
    height: 6,
    borderRadius: 10,
    backgroundColor: '#e8e6e6',
  },
  progressText: {
    color: '#858585',
  },
});

export default StudySubjects;
