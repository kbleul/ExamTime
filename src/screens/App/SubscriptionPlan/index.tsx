import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

import BackWithItem from '../../../components/Organisms/BackWithItem';

import SubscriptionPlanCards from '../../../components/Organisms/SubscriptionPlanCards';
import {STATUSTYPES, screenHeight} from '../../../utils/Data/data';
import {
  useGetSubscriptionPackagesMutation,
  useGetUserSubscriptionMutation,
} from '../../../reduxToolkit/Services/auth';
import Loading from '../../../components/Atoms/Loading';
import {useUserStatus} from '../../../context/userStatus';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';

const Index: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const {userStatus} = useUserStatus();

  const [userSubscribedStatus, setUserSubscribedStatus] = useState<
    null | string
  >(null);

  const [getSubscriptionPackages, {isLoading}] =
    useGetSubscriptionPackagesMutation();
  const [getUserSubscription, {isLoading: isLoadingUserSubscription}] =
    useGetUserSubscriptionMutation();
  const [data, setPackge] = useState<null | any[]>(null);

  useEffect(() => {
    const getPackages = async () => {
      try {
        const packages: any[] = await getSubscriptionPackages({}).unwrap();

        if (token && userStatus === STATUSTYPES.Subscribed) {
          const usersubscriptions: any = await getUserSubscription({
            token,
          }).unwrap();
          if (
            usersubscriptions &&
            usersubscriptions.subscriptionPackage &&
            usersubscriptions.subscriptionPackage.id
          ) {
            setUserSubscribedStatus(usersubscriptions.subscriptionPackage.id);
          }
        }

        if (packages && packages.length > 0) {
          const newPackagesList: any[] = [];
          packages.forEach(packageItem => {
            const newPackage = {
              id: packageItem.id,
              key: '1',
              planname: packageItem.subscriptionPlan,
              price: packageItem.price,
              current: true,
              color: '#F5A52D',
              duration: '/' + packageItem.subscriptionPlan,
              packages: [
                {
                  available: true,
                  packagesname: 'All Subjects',
                },
                {
                  available: true,
                  packagesname: '6 years of previous exams with explanations.',
                },
                {
                  available: true,
                  packagesname: 'Short Notes with the New Curriculum',
                },
                {
                  available: true,
                  packagesname: 'Video Lessons',
                },
                {
                  available: true,
                  packagesname: 'Unlimited Random Questions',
                },
                {
                  available: true,
                  packagesname: 'Study Challenges',
                },
                {
                  available: true,
                  packagesname:
                    'Buy now for an exceptional learning experience!',
                },
              ],
              allPackages: packages,
            };

            newPackagesList.push(newPackage);
          });
          setPackge([...newPackagesList]);
        }
      } catch (err) {
        console.log('Error getting packages', err);
      }
    };

    getPackages();
  }, []);

  if (isLoading || isLoadingUserSubscription) {
    return (
      <View style={styles.container}>
        <View style={styles.scrollContainer}>
          <Loading />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data && data.length > 0 && (
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContainer}>
          <View style={styles.backicon}>
            <BackWithItem type="Subscription Plan" isTrial={false} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Upgrade to a subscription plan to access a world of benefits and
              take your experience to the next level.
            </Text>
          </View>

          <View style={styles.HorizontalList}>
            <SubscriptionPlanCards
              data={data}
              pagination={true}
              userSubscribedStatus={userSubscribedStatus}
            />
          </View>
        </ScrollView>
      )}
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
    height: screenHeight + 2,
    marginTop: screenHeight * 0.035,
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
