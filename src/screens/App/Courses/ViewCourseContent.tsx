import React from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import BackWithItem from '../../../components/Organisms/BackWithItem';

const ViewCourseContent = ({route}: any) => {
  const {isVideo} = route.params;
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackWithItem type="Unit 1" isTrial={false} />

        <View style={styles.pdfContainer}>
          <Text style={styles.title}>Introduction</Text>

          {isVideo ? (
            <View style={styles.videoContainer}>
              <ActivityIndicator style={styles.loading} />
              <YoutubePlayer
                height={230}
                play={false}
                videoId={'84WIaK3bl_s'}
              />
            </View>
          ) : (
            <View>
              <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.nextButtonContainer}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingVertical: 30,
    backgroundColor: '#F9FCFF',
  },
  pdfContainer: {
    backgroundColor: 'white',
    marginTop: 5,
    paddingHorizontal: 20,
    paddingTop: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: '#000',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    marginBottom: 20,
    lineHeight: 24,
  },
  videoContainer: {
    position: 'relative',
  },
  loading: {
    position: 'absolute',
    top: '30%',
    left: '45%',
  },
  nextButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 60,
  },
  buttonText: {
    backgroundColor: '#1E90FF',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    width: '45%',
    marginRight: '2%',
    borderRadius: 10,
    overflow: 'hidden',
    paddingVertical: 8,
    textAlign: 'center',
  },
});
export default ViewCourseContent;
