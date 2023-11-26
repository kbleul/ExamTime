import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {screenWidth} from '../../../utils/Data/data';
import {videoType} from '../../../types';

const ViewVideo = ({route}) => {
  const {videos, selectedVideoIndex} = route.params;
  const navigator: any = useNavigation();

  const [displayedVideo, setDisplayedVideo] = useState(selectedVideoIndex);

  const youtubeVideoId = videos[displayedVideo].videoLink
    .split('?v=')[1]
    .split('&')[0];

  console.log(youtubeVideoId);
  console.log('vid', videos.length);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        touchSoundDisabled
        style={styles.backBtn}
        onPress={() => navigator.goBack()}>
        <Ionicons name="arrow-back" color="#000" size={25} />
      </TouchableOpacity>
      <View style={styles.videoContainer}>
        <ActivityIndicator style={styles.loading} />
        <YoutubePlayer height={230} play={false} videoId={youtubeVideoId} />
      </View>

      <View style={styles.videosList}>
        {videos &&
          videos.length > 0 &&
          videos.map((video: videoType, index: number) => (
            <TouchableOpacity
              key={video.id + 'vid' + index}
              touchSoundDisabled
              style={styles.videoButton}
              onPress={() =>
                index !== displayedVideo && setDisplayedVideo(index)
              }>
              <Text
                style={
                  index === displayedVideo
                    ? [styles.videoText, styles.videoTextActive]
                    : styles.videoText
                }>
                0{index + 1}. Study video
              </Text>
              <View
                style={
                  index === displayedVideo
                    ? [styles.videoIcon, styles.videoIconActive]
                    : styles.videoIcon
                }>
                <Entypo name="controller-play" size={30} color="#fff" />
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    backgroundColor: '#F9FCFF',
  },
  backBtn: {
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 100,
  },
  videoContainer: {
    position: 'relative',
    marginTop: 20,
    width: '100%',
    height: 230,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  loading: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
  videosList: {
    marginHorizontal: 10,
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E1E1E1',
    paddingHorizontal: 8,
  },
  videoButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    marginVertical: 10,
  },
  videoText: {
    color: '#000',
    fontSize: screenWidth * 0.04,
    fontFamily: 'PoppinsSemiBold',
  },
  videoTextActive: {
    color: '#A4A4AE',
  },
  videoIcon: {
    backgroundColor: '#f0292f',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  videoIconActive: {
    backgroundColor: '#f09295',
  },
});
export default ViewVideo;
