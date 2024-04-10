import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';
import BackWithItem from '../../../components/Organisms/BackWithItem';
import {ScrollView} from 'react-native-gesture-handler';
import {useGetAboutUsMutation} from '../../../reduxToolkit/Services/auth';
import Loading from '../../../components/Atoms/Loading';
import Toast from 'react-native-toast-message';
import {checkIsOnline} from '../../../utils/Functions/Helper';

const Index = () => {
  const [getAboutUs] = useGetAboutUsMutation();
  const [aboutUs, setAboutUS] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchAboutUs = async () => {
      const isonline = await checkIsOnline();

      if (!isonline) {
        Toast.show({
          type: 'error',
          text1: 'Error getting about us information',
          text2: 'There was a problem wwith your internet connection',
          visibilityTime: 3000,
        });

        return;
      }
      try {
        const response: any = await getAboutUs({});

        if (response.data[0]) {
          setAboutUS(response.data[0].aboutUs);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error getting about us information',
            text2: 'No about us information available',
            visibilityTime: 3000,
          });
        }

        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error getting about us information',
          text2: 'Could not fetch about us data. Please try again!',
          visibilityTime: 3000,
        });
      }
    };

    fetchAboutUs();
  }, []);
  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingIndicator}>
          <Loading />
        </View>
      )}

      {aboutUs && (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.backicon}>
            <BackWithItem type="About Us" isTrial={user ? false : true} />
          </View>

          {aboutUs && (
            <>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{aboutUs}</Text>
              </View>
              <View style={styles.imageBg}>
                <Image
                  source={require('../../../assets/Logo/ThinkHubIcon.png')}
                  style={styles.img}
                />
              </View>
            </>
          )}
        </ScrollView>
      )}
      <Toast />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
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
    height: '20%',
    width: '60%',
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
