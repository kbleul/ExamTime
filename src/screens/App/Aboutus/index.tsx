import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
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
            Think Hub ET is an innovation company founded with the purpose of
            developing a high-quality E-learning platform for current
            generation. Our dynamic staff provides training, and flexible
            support services to the Exam taker community. We promote an
            atmosphere for growth in teaching and learning via creative problem
            solving, collaboration, and reflection in order to best assist our
            students, teachers, and staff.
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
    width: '100%',
    padding: '10@ms',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: '15@ms',
    textAlign: 'center',
    color: '#222E50',
    fontFamily: 'Montserrat-Regular',
  },
  textContainer: {
    marginTop: '20@vs',
    padding: '5@ms',
    width: '100%',
    overflow: 'hidden',
  },
});
export default Index;
