import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
  ScrollView,
  FlatList,
} from 'react-native';

import BackWithItem from '../../../components/Organisms/BackWithItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reduxToolkit/Store';
const { width, height } = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import SubscriptionPlanCards from '../../../components/Organisms/SubscriptionPlanCards';
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.5 : width * 0.5;

const Index: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [data, setPackge] = React.useState([
    {
      key: '1',
      planname: 'Basic Plan',
      image: require('./frame_blue.png'),
      price: 200,
      current: true,
      color: '#F5A52D',
      packages: [
        {
          available: true,
          packagesname: 'Activated',
        },
        {
          available: true,
          packagesname: 'Full Access',
        },
        {
          available: true,
          packagesname: '3 month',
        },
        {
          available: false,
          packagesname: 'Dimond Badge',
        },
      ],
    },
    {
      key: '2',
      planname: 'Intermediate Plan',
      price: 200,
      image: require('./frame_blue.png'),
      current: false,
      color: '#4F8FCB',
      packages: [
        {
          available: true,
          packagesname: 'Activated',
        },
        {
          available: true,
          packagesname: 'Full Access',
        },
        {
          available: true,
          packagesname: '3 month',
        },
        {
          available: false,
          packagesname: 'Dimond Badge',
        },
      ],
    },
    {
      key: '3',
      image: require('./frame_blue.png'),
      planname: 'Pro Plan',
      price: 200,
      current: false,
      color: '#8075CB',
      packages: [
        {
          available: true,
          packagesname: 'Activated',
        },
        {
          available: true,
          packagesname: 'Full Access',
        },
        {
          available: true,
          packagesname: '3 month',
        },
        {
          available: false,
          packagesname: 'Dimond Badge',
        },
      ],
    },
  ]);
  const data1 = [
    {
      image: require('./frame_blue.png'),
    },
    {
      image: require('./frame_blue.png'),
    },
    {
      image: require('./frame_blue.png'),
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.backicon}>
          <BackWithItem type="SubscriptionPlan" isTrial={user ? false : true} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Upgrade to a subscription plan to access a world of benefits and
            take your experience to the next level.
          </Text>
        </View>

        <View style={styles.HorizontalList}>
          <SubscriptionPlanCards data={data} pagination={true} />
          {/* <CustomImageCarousal data={data} pagination={true} /> */}
        </View>
      </ScrollView>
      <MainBottomNav />
    </View>
  );
};
const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: '#0066B2',
    height: 10,
    width: 30,
  },
  backicon: {
    marginTop: 0,
  },
  circle: {
    alignItems: 'center',
    backgroundColor: '#F5A52D',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 50,
    height: 70,
    justifyContent: 'center',
    width: 70,
  },
  circleContainer: {
    alignItems: 'center',
    bottom: -30,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  circleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },

  carouselContainer: {
    marginBottom: 20,
  },
  dot: {
    borderRadius: 5,
    height: 10,
    marginHorizontal: 5,
    width: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  HorizontalList: {
    alignItems: 'center',
    height: 500,
    justifyContent: 'center',
    margin: 5,
  },
  inactiveDot: {
    backgroundColor: 'grey',
  },
  listofPackages: {
    color: '#222E50',
    fontFamily: 'Montserrat-Regular',
    marginTop: 20,
    padding: 10,
  },
  listofPackagesBottom: {
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 34,
    height: 50,
    justifyContent: 'center',
    padding: 10,
    width: '100%',
  },
  listofPackagesBottomtext: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  listofPackagesText: {
    color: '#222E50',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 24,
    textAlign: 'center',
  },
  posterImage: {
    borderRadius: 24,
    height: ITEM_SIZE * 1.2,
    margin: 0,
    marginBottom: 10,
    resizeMode: 'cover',
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    marginTop: 40,
  },
  text: {
    color: '#222E50',
    fontFamily: 'PoppinsLight',
    fontSize: 15,
    padding: 10,
    textAlign: 'left',
  },
  textBottom: {
    color: '#1E90FF',
    fontFamily: 'PoppinsLight',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'left',
  },
  textContainer: {
    overflow: 'hidden',
    padding: 5,
    width: '100%',
  },
  topCardContainer: {
    alignItems: 'center',
    backgroundColor: '#F5A52D',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    height: '30%',
    justifyContent: 'center',
    paddingBottom: 35,
    position: 'relative',
    width: '100%',
  },
  topCardContainerText: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
});

export default Index;
