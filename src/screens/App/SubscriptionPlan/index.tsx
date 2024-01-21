import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import BackWithItem from '../../../components/Organisms/BackWithItem';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';
import SubscriptionPlanCards from '../../../components/Organisms/SubscriptionPlanCards';
import {screenHeight} from '../../../utils/Data/data';

const Index: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [data, setPackge] = React.useState([
    {
      key: '1',
      planname: 'Pro',
      price: 199,
      current: true,
      color: '#F5A52D',
      duration: '/3 Month',
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
      duration: '/6 Month',
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
      duration: '/Year',
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
      <View style={styles.scrollContainer}>
        {/* <View style={styles.backicon}>
          <BackWithItem type="Subscription Plan" isTrial={false} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Upgrade to a subscription plan to access a world of benefits and
            take your experience to the next level.
          </Text>
        </View> */}

        {/* <View style={styles.HorizontalList}>
          <SubscriptionPlanCards data={data} pagination={true} />
        </View> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backicon: {
    marginTop: 0,
  },
  HorizontalList: {
    alignItems: 'center',
    height: screenHeight + 0.8,
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    flexGrow: 1,
    marginTop: screenHeight * 0.045,
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
