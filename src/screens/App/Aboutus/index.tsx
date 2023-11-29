import React from 'react';
import {View, Text, Image} from 'react-native';
import {ScaledSheet, ms} from 'react-native-size-matters';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';
import BackWithItem from '../../../components/Organisms/BackWithItem';
import {ScrollView} from 'react-native-gesture-handler';
import ShareApp from '../../../components/Organisms/ShareApp';

const Index = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.backicon}>
          <BackWithItem type="About Us" isTrial={user ? false : true} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Exam Time App is your comprehensive companion for learning in the
            digital age. We empower students to make the most of their education
            by providing support, extensive resources, and effective learning
            tools. Our app helps you learn more efficiently and effectively, so
            you can confidently achieve your academic goals.
          </Text>
        </View>
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
      <MainBottomNav />
    </View>
  );
};

const styles = ScaledSheet.create({
  backicon: {
    marginTop: '25@ms',
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
  },
  share: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: '10@ms',
    paddingTop: '30@vs',
  },
  text: {
    padding: '10@ms',
    fontSize: '14@ms',
    textAlign: 'center',
    color: '#222E50',
    fontFamily: 'Montserrat-Regular',
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
