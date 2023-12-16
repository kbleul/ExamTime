import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Linking,
} from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../../reduxToolkit/Store';
import {
  useGetFeedBackMutation,
  useGetContactMutation,
} from '../../../reduxToolkit/Services/auth';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import LoginModal from '../../../components/Organisms/LoginModal';
import scale from '../../../utils/Functions/Scale';
import Loading from '../../../components/Atoms/Loading';
import Scale from '../../../utils/Functions/Scale';
import {screenHeight} from '../../../utils/Data/data';
import {checkIsOnline} from '../../../utils/Functions/Helper';

const Index = () => {
  const navigator = useNavigation<any>();

  const [feedback, setFeedback] = useState('');

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const [getContact] = useGetContactMutation();
  const [getFeedBack] = useGetFeedBackMutation();
  const [contactUs, setConatctUs] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: RootState) => state.auth.token);

  const handleSendFeedback = async () => {
    if (!token) {
      setShowLoginPrompt(true);
      return;
    }

    if (!feedback.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Note !',
        text2: 'Feedback message should not be empty.',
        visibilityTime: 3000,
      });
      return;
    }

    const isonLine = await checkIsOnline();
    console.log('isOnline', isonLine);
    try {
      const response: any = await getFeedBack({token, feedback: feedback});

      if (response?.data && response.data.comment) {
        Toast.show({
          type: 'success',
          text1: 'Message sent successfully',
          visibilityTime: 3000,
        });

        return;
      }

      Toast.show({
        type: 'error',
        text1: 'Send message failed!',
        text2: 'Error sending mesage. Please try again',
        visibilityTime: 3000,
      });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Error fetching about us data:', error);
    }

    setFeedback('');
  };
  useEffect(() => {
    const fetchContactUs = async () => {
      const isonLine = await checkIsOnline();
      console.log('isOnline', isonLine);

      if (isonLine) {
        try {
          const response: any = await getContact({});
          console.log(response);
          if (response.data) {
            const contactUsData = response.data;
            setConatctUs(contactUsData);
            setLoading(false);

            return;
          }
        } catch (error: any) {
          setLoading(false);
          Alert.alert('Error fetching about us data:', error);
        }
      } else {
      }
    };

    fetchContactUs();
  }, []);

  const handlePhoneContact = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;

    Linking.openURL(url).catch(error => {
      console.log('Error opening phone app:', error);
      // Handle the error, e.g., show an error message to the user
    });
  };

  const handleMessageContact = (phoneNumber: string) => {
    const url = `sms:${phoneNumber}`;

    Linking.openURL(url).catch(error => {
      console.log('Error opening messaging app:', error);
      // Handle the error, e.g., show an error message to the user
    });
  };

  const handleSendEmail = (email: string) => {
    const subject = 'Feedback and comment for Examtime app';
    const body = '';
    const url = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(url).catch(error => {
      console.log('Error opening email app:', error);
      // Handle the error, e.g., show an error message to the user
    });
  };

  return (
    <>
      {contactUs && (
        <SafeAreaView style={styles.container}>
          <View style={styles.topHeader}>
            <TouchableOpacity onPress={() => navigator.goBack()}>
              <Ionicons name="chevron-back-outline" color="#000" size={28} />
            </TouchableOpacity>

            <Text style={styles.headerText}>Contact us</Text>
          </View>
          {loading ? (
            <View style={styles.loadingIndicator}>
              <Loading />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}>
              <View style={styles.AboutusContener}>
                {contactUs &&
                  contactUs.map((item, index) => (
                    <View key={'contact' + index}>
                      <View style={styles.contactDiv}>
                        <View style={styles.address}>
                          <Text style={styles.addressTitle}>Phone Number</Text>
                          <Text style={styles.addressLInk}>
                            {item.phoneNumber}
                          </Text>
                        </View>
                        <View style={styles.adressIcons}>
                          <TouchableOpacity
                            touchSoundDisabled
                            onPress={() =>
                              handlePhoneContact(item.phoneNumber)
                            }>
                            <Ionicons
                              name="call-sharp"
                              color="#000"
                              size={26}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            touchSoundDisabled
                            onPress={() =>
                              handleMessageContact(item.phoneNumber)
                            }>
                            <Ionicons
                              name="chatbox-ellipses-sharp"
                              color="#000"
                              size={26}
                              style={styles.iconLeft}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <TouchableOpacity
                        touchSoundDisabled
                        style={styles.contactDiv}
                        onPress={() => handleSendEmail(item.email)}>
                        <View style={styles.address}>
                          <Text style={styles.addressTitle}>Email Address</Text>
                          <Text style={styles.addressLInk}>{item.email}</Text>
                        </View>
                        <View style={styles.adressIcons}>
                          <Ionicons
                            name="chevron-forward-outline"
                            color="#000"
                            size={24}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                <View style={styles.CFeedBack}>
                  <Text style={styles.label}>Feed Back</Text>
                  <View style={styles.FeedBack}>
                    <TextInput
                      onChangeText={setFeedback}
                      value={feedback}
                      style={styles.input}
                      multiline
                      numberOfLines={4}
                      placeholder="Message..."
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.SendButton}
                  onPress={() => {
                    handleSendFeedback();
                  }}>
                  <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
          <View>
            <MainBottomNav />
          </View>

          <LoginModal
            loginModalVisible={showLoginPrompt}
            setLoginModalVisible={setShowLoginPrompt}
          />
          <Toast />
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: Scale(10),
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: Scale(5),
    paddingVertical: Scale(10),
  },
  headerText: {
    color: '#0F0F0F',
    marginLeft: 20,
    fontSize: Scale(20),
    fontFamily: 'Montserrat-SemiBold',
  },
  loadingIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: '#F9FCFF',
  },
  contactDiv: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Scale(5),
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#fff',
    // Adjust the width as needed
    // borderBottomColor: 'rgba(0, 0, 0, 0.09)', // Adj
    padding: Scale(8),
    marginTop: Scale(12),
    overflow: 'hidden',
  },
  address: {
    gap: 1,
    flex: 1,
  },
  addressTitle: {
    color: '#A1A1A1',
    fontSize: scale(14),
    fontFamily: 'PoppinsRegular',
    flex: 1,
  },
  addressLInk: {
    color: '#3F3F3F',
    fontSize: scale(15),
    fontFamily: 'PoppinsSemiBold',
    flex: 1,
  },
  adressIcons: {
    gap: Scale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconLeft: {
    marginLeft: 14,
  },
  CFeedBack: {
    marginTop: Scale(25),
  },
  SendButton: {
    maxWidth: '100%',
    marginTop: Scale(5),
    alignSelf: 'flex-end', // Align to the right/end
    width: Scale(100),
    height: Scale(40),
    borderRadius: 10,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sbutton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  FeedBack: {
    marginTop: 1,
    width: '100%',
    padding: Scale(5),
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#fff',
  },
  label: {
    color: '#3F3F3F',
    fontSize: scale(15),
    fontFamily: 'PoppinsMedium',
    flex: 1,
  },
  input: {
    fontSize: Scale(14),
    textAlignVertical: 'top',
    minHeight: screenHeight / 5.5,
  },
  buttonText: {
    color: '#fff', // Example text color
    textAlign: 'center',
    fontSize: Scale(16),
    fontFamily: 'PoppinsMedium',
  },
  SButton: {
    width: Scale(30),
  },
  AboutusContener: {
    padding: Scale(12),
  },
});

export default Index;
