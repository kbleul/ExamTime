import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {screenWidth, userGuideData} from '../../utils/Data/data';
import {useNavigation} from '@react-navigation/native';
import {GuideDataType} from '../../types';

const YoutubeCard = ({item, index}: {item: GuideDataType; index: number}) => {
  const navigator: any = useNavigation();
  console.log('===', item);
  return (
    <TouchableOpacity
      touchSoundDisabled
      style={{width: screenWidth, padding: 10}}
      onPress={() =>
        navigator.navigate('ViewVideo', {
          videos: userGuideData,
          selectedVideoIndex: index,
        })
      }>
      <Image
        source={item.image}
        style={{width: '100%', height: 200, borderRadius: 10}}
      />
      <Ionicons
        style={styles.Youtube}
        name="logo-youtube"
        color={'red'}
        size={150}
      />
      <Text style={styles.YoutubeText}>{item.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Youtube: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    transform: [{translateX: -50}, {translateY: -50}],
  },
  YoutubeText: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14,
    borderRadius: 25,
    backgroundColor: 'white',
    color: '#5CADFC',
    padding: 10,
    position: 'absolute',
    top: 20,
    left: 15,
  },
});

export default YoutubeCard;
