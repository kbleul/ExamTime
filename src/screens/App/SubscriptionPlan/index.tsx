import React, {useState} from 'react';
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
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';
const {width, height} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import SubscriptionPlanCards from '../../../components/Organisms/SubscriptionPlanCards';
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.5 : width * 0.5;

const Index: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [data, setPackge] = React.useState([
    {
      key: '1',
      planname: 'Pro',
      price: 199,
      current: true,
      color: '#F5A52D',
      packages: [
        {
          available: false,
          packagesname: 'Only One challenge phase',
        },
        {
          available: false,
          packagesname: 'Bronze Badge',
        },
        {
          available: false,
          packagesname: 'updated Insured ',
        },
        {
          available: false,
          packagesname: 'Full Features including Video',
        },
      ],
    },
    {
      key: '2',
      planname: 'BUSINESS',
      price: 299.99,
      current: false,
      color: '#4F8FCB',
      packages: [
        {
          available: true,
          packagesname: 'Full Time Challenge',
        },
        {
          available: true,
          packagesname: 'Silver Badge',
        },
        {
          available: true,
          packagesname: 'updated Insured',
        },
        {
          available: false,
          packagesname: 'Full Features including Video',
        },
      ],
    },
    {
      key: '3',
      planname: 'Pro Plan',
      price: 499.99,
      current: false,
      color: '#8075CB',
      packages: [
        {
          available: true,
          packagesname: 'Full Time Challenge feature one',
        },
        {
          available: true,
          packagesname: 'Gold Badge',
        },
        {
          available: true,
          packagesname: 'updated Insured ',
        },
        {
          available: false,
          packagesname: 'Full Features including Video',
        },
      ],
    },
  ]);

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
        </View>
      </ScrollView>
      <MainBottomNav />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FCFF',
  },
  backicon: {
    marginTop: 0,
  },
  HorizontalList: {
    alignItems: 'center',
    height: 500,
    justifyContent: 'center',
    margin: 5,
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
  textContainer: {
    overflow: 'hidden',
    padding: 5,
    width: '100%',
  },
});

export default Index;
