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
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [data, setPackge] = React.useState([
    {
      key: '1',
      planname: 'Basic Plan',
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
