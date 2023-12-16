import React, {useEffect, useState} from 'react';
import {View, Text, Image, ActivityIndicator, Alert} from 'react-native';
import {ScaledSheet, ms} from 'react-native-size-matters';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';
import BackWithItem from '../../../components/Organisms/BackWithItem';
import {ScrollView} from 'react-native-gesture-handler';
import ShareApp from '../../../components/Organisms/ShareApp';
import {useGetAboutUsMutation} from '../../../reduxToolkit/Services/auth';
import Loading from '../../../components/Atoms/Loading';

const Index = () => {
  const [getAboutUs] = useGetAboutUsMutation();
  const [aboutUs, setAboutUS] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response: any = await getAboutUs({});

        if (response.error) {
          Alert.alert(response.error);
        } else if (response.data[0].aboutUs) {
          const aboutUsData = response.data[0].aboutUs;
          setAboutUS(aboutUsData);
          setLoading(false);
        } else {
          Alert.alert(
            'Invalid response format - missing or empty array:',
            response.data[0].aboutUs,
          );
        }
      } catch (error: any) {
        setLoading(false);
        Alert.alert('Error fetching about us data:', error);
      }
    };

    fetchAboutUs();
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingIndicator}>
          <Loading />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.backicon}>
            <BackWithItem type="About Us" isTrial={user ? false : true} />
          </View>

          {aboutUs && (
            <View style={styles.textContainer}>
              <Text style={styles.text}>{aboutUs}</Text>
            </View>
          )}
          <View style={styles.imageBg}>
            <Image
              source={require('../../../assets/Logo/ThinkHubIcon.png')}
              style={styles.img}
            />
          </View>
          <View style={styles.share}>
            <ShareApp />
          </View>
        </ScrollView>
      )}
      <MainBottomNav />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    width: '100%',
    backgroundColor: '#F9FCFF',
    marginTop: 10,
  },
  backicon: {
    marginTop: '20@ms',
  },
  loadingIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: '#F9FCFF',
  },
 
  imageBg: {
    height: '25%',
    width: '70%',
    marginLeft: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '15@ms',
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  innerContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: '100@ms',
  },
  share: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: '10@ms',
    paddingTop: '30@vs',
  },
  text: {
    padding: '10@ms',
    fontSize: '12@ms',
    textAlign: 'center',
    color: 'black',
    fontFamily: 'PoppinsRegular',
    lineHeight: '24@ms',
  },
  textContainer: {
    marginTop: '10@vs',
    padding: '5@ms',
    width: '100%',
    overflow: 'hidden',
  },
});
export default Index;
