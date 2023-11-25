import React, { useCallback, useState } from 'react'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import queryString from 'query-string';
import Loading from '../Atoms/Loading';
type YoutubeCardProps = {
  item: any,
  loadinga: boolean

}

const YoutubeCard: React.FC<YoutubeCardProps> = ({ item, loadinga }) => {
  const Width = Dimensions.get('window').width
  const [playing, setPlaying] = useState(false);


  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  const urlParams = queryString.parseUrl(item.videoLink);
  const videoId = urlParams.query.v;
  // if (loading) return 
  // <View style={styles.loadingIndicator}>
  //   <Loading />
  // </View>
  console.log(videoId);
  // console.log(loading);
  return (

    <View style={{ width: Width, padding: 10 }}>

      {loadinga ? (
        <View style={styles.loadingIndicator}>
          <Loading />
        </View>

      ) : (
        <>
          <View style={{ width: '100%', height: 250, borderRadius: 10 }}>
            <YoutubePlayer
              height={300}
              play={playing}
              videoId={`${videoId}`}
              onChangeState={onStateChange}
            />
          </View>
          <Text style={styles.YoutubeText}>{item.title}</Text>
        </>
      )}
    </View>

  )
}

const styles = StyleSheet.create({
  Youtube: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    transform: [{ translateX: -50 }, { translateY: -50 }]
  },
  loadingIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 250,
    width: "100%",
    // backgroundColor: 'green',
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
    left: 15
  },
})

export default YoutubeCard