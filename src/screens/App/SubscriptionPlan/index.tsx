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
import Toast from 'react-native-toast-message';

const Index: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const {userStatus} = useUserStatus();

  const [userSubscribedStatus, setUserSubscribedStatus] = useState<
    null | string
  >(null);

  const [subscriptionEndDate, setSubscriptionEndDate] = useState<null | string>(
    null,
  );

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
            usersubscriptions.subscription &&
            usersubscriptions.subscription.subscriptionPackage &&
            usersubscriptions.subscription.subscriptionPackage.id
          ) {
            setUserSubscribedStatus(
              usersubscriptions.subscription.subscriptionPackage.id,
            );
            setSubscriptionEndDate(usersubscriptions.endOfSubscription);
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
                  packagesname: '7 years of previous exams with explanations.',
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
                  packagesname: 'Study Challenges',
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
            {!subscriptionEndDate && (
              <Text style={styles.text}>
                Upgrade to a subscription plan for enhanced benefits and an
                elevated experience.
              </Text>
            )}

            {subscriptionEndDate && (
              <Text style={styles.text}>
                Upgrade to a subscription plan for enhanced benefits and an
                elevated experience. Your plan is set to end on
                {subscriptionEndDate && (
                  <Text style={styles.textBold}>
                    {' ' + subscriptionEndDate}
                  </Text>
                )}
              </Text>
            )}
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
      <Toast />
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
  textBold: {
    fontFamily: 'PoppinsSemiBold',
  },
  textContainer: {
    overflow: 'hidden',
    padding: 5,
    width: '100%',
  },
});

export default Index;
