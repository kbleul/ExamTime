import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {screenWidth} from '../../../utils/Data/data';
import {videoType} from '../../../types';
import {AuthContext} from '../../../Realm/model';
import {Study} from '../../../Realm';
import {calculate_and_Assign_UnitProgress} from './logic';
import {useNavContext} from '../../../context/bottomNav';

const getYoutubeVidId = (videosLink: string) => {
  return videosLink.includes('?v=')
    ? videosLink.split('?v=')[1].split('&')[0]
    : null;
};

const createPlaylist = (videos: videoType[]) => {
  const playlistVidsArr = videos.map((video: videoType) =>
    getYoutubeVidId(video.videoLink),
  );

  return playlistVidsArr.filter(vid => vid !== null);
};

const saveProgress = (study: Study, videoId: string, realm: Realm) => {
  if (study?.videoLink.length > 0) {
    const videoIndex = study?.videoLink.findIndex(v => v.id === videoId);

    if (study?.videoLink[videoIndex].isViewed === false) {
      calculate_and_Assign_UnitProgress(study, realm);

      realm.write(() => {
        study.videoLink[videoIndex].isViewed = true;
      });
    }
  }
};

const ViewVideo = ({route}) => {
  const navigationState = useNavigationState(state => state);
  const currentScreen = navigationState.routes[navigationState.index].name;
  const {setShowNavigation} = useNavContext();

  const {videos, selectedVideoIndex, studyId} = route.params;
  const navigator: any = useNavigation();

  const {useRealm, useQuery} = AuthContext;
  const realm = useRealm();
  const savedStudy = useQuery(Study, studyItem => {
    return studyItem.filtered(`id == "${studyId}"`);
  });

  const [displayedVideo, setDisplayedVideo] = useState(selectedVideoIndex);

  const playlistVids = useMemo(() => {
    return createPlaylist(videos);
  }, [videos]);

  const youtubeVideoId = getYoutubeVidId(videos[displayedVideo].videoLink);

  const handlePress = (index: number, videoId: string) => {
    if (index !== displayedVideo) {
      setDisplayedVideo(index);
      saveProgress(savedStudy[0], videoId, realm);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      saveProgress(savedStudy[0], videos[selectedVideoIndex].id, realm);
    }, 2000);
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigator.goBack();
      setShowNavigation(false);

      return true;
    };

    let backHandler: any;

    if (currentScreen === 'ViewVideo') {
      backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
    } else {
      backHandler && backHandler.remove();
    }

    // Clean up the event listener when the component is unmounted
    return () => {
      if (backHandler) {
        backHandler.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        touchSoundDisabled
        style={styles.backBtn}
        onPress={() => navigator.goBack()}>
        <Ionicons name="arrow-back" color="#000" size={25} />
      </TouchableOpacity>

      {youtubeVideoId && (
        <View>
          <View style={styles.videoContainer}>
            <ActivityIndicator style={styles.loading} />
            <YoutubePlayer
              height={230}
              play={false}
              videoId={youtubeVideoId}
              playList={[...playlistVids]}
            />
          </View>

          <View style={styles.videosList}>
            {videos &&
              videos.length > 0 &&
              videos.map((video: videoType, index: number) => (
                <TouchableOpacity
                  key={video.id + 'vid' + index}
                  touchSoundDisabled
                  style={styles.videoButton}
                  onPress={() => handlePress(index, video.id)}>
                  <Text
                    style={
                      index === displayedVideo
                        ? [styles.videoText, styles.videoTextActive]
                        : styles.videoText
                    }>
                    {`0${index + 1}. Study video`}
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
      )}

      {!youtubeVideoId && (
        <View style={styles.invalidContainer}>
          <Text style={styles.invalidTitle}>
            It seems that the YouTube video link you are trying to access is
            invalid or inaccessible. Please select another video to watch.
          </Text>
        </View>
      )}
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
    overflow: 'hidden',
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
    textTransform: 'capitalize',
  },
  videoTextActive: {
    color: '#A4A4AE',
  },
  videoIcon: {
    backgroundColor: '#f0292f',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  videoIconActive: {
    backgroundColor: '#f09295',
  },
  invalidContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  invalidTitle: {
    fontFamily: 'PoppinsMedium',
    color: '#000',
    fontSize: screenWidth * 0.045,
  },
});
export default ViewVideo;
