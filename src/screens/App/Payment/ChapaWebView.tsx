import React from 'react';
import WebView from 'react-native-webview';
import {
  useGetStudyMutation,
  useVerifyChapaPaymentMutation,
} from '../../../reduxToolkit/Services/auth';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Study, UserData} from '../../../Realm';
import {AuthContext} from '../../../Realm/model';
import {STATUSTYPES} from '../../../utils/Data/data';
import {useUserStatus} from '../../../context/userStatus';
import {useNavigation} from '@react-navigation/native';
import {checkIsOnline} from '../../../utils/Functions/Helper';
import Toast from 'react-native-toast-message';
import {getAllStudies} from '../Study/logic';

const ChapaWebView = ({route}: {route: any}) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const {useQuery, useRealm} = AuthContext;
  const realm = useRealm();

  const savedUserData = useQuery(UserData);

  const navigator: any = useNavigation();
  const {setUserStatus} = useUserStatus();
  const [verifyChapaPayment, {isLoading}] = useVerifyChapaPaymentMutation();

  const [getStudy, {isLoading: isLoadingStudies}] = useGetStudyMutation();

  const {checkout_url, textReference} = route.params;
  const verifyChapa = async () => {
    if (token) {
      try {
        checkIsOnline(navigator);

        const response: any = await verifyChapaPayment({
          textReference,
          token,
        });

        if (
          response.data.message &&
          savedUserData &&
          savedUserData.length > 0
        ) {
          const savedStudies = realm.objects(Study);

          if (savedStudies && savedStudies.length > 0) {
            realm.write(() => {
              savedUserData[0].isSubscribed = true;
              setUserStatus(STATUSTYPES.Subscribed);
              realm.delete(savedStudies);
            });
          }

          getAllStudies(getStudy, navigator, token, realm, Toast);

          navigator.navigate('HomeSection', {
            screen: 'Home',
          });
        }
      } catch (err) {
        console.log('Error verifying chapa payment', err);
      }
    }
  };

  return (
    <>
      {isLoading && (
        <View style={style.loadingContainer}>
          <ActivityIndicator color="#1E90FF" size={25} />
        </View>
      )}
      <WebView
        source={{
          uri: checkout_url,
        }}
        style={{flex: 1}}
        onNavigationStateChange={navState => {
          navState.url.includes('payment-receipt') && verifyChapa();
        }}
      />
    </>
  );
};

const style = StyleSheet.create({
  loadingContainer: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 20,
    zIndex: 100,
    width: '100%',
  },
});

export default ChapaWebView;
