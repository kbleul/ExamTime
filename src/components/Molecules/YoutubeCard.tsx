import React, { useCallback, useState } from 'react'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import queryString from 'query-string';
import Loading from '../Atoms/Loading';
import { screenHeight } from '../../utils/Data/data';
import scale from '../../utils/Functions/Scale';
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
  }, [])

  const urlParams = queryString.parseUrl(item.videoLink);
  const videoId = urlParams.query.v;
  return (

    <View style={{ width: Width, padding: 10 }}>

      {loadinga ? (
        <View style={styles.loadingIndicator}>
          <Loading />
        </View>

      ) : (
        <>
          <View style={{ width: '100%', height: screenHeight*0.35, borderRadius: 30}}>
            <YoutubePlayer
              height={screenHeight*0.35}
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
    height: screenHeight*0.35,
    width: "100%",
  },
  YoutubeText: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: scale(12),
    lineHeight: scale(14),
    borderRadius: scale(25),
    backgroundColor: 'white',
    color: '#5CADFC',
    padding: scale(10),
    position: 'absolute',
    top: scale(20),
    left: scale(15)
  },
})

export default YoutubeCard