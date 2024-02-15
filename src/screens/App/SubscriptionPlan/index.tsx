import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import BackWithItem from '../../../components/Organisms/BackWithItem';

import SubscriptionPlanCards from '../../../components/Organisms/SubscriptionPlanCards';
import {screenHeight} from '../../../utils/Data/data';
import {useGetSubscriptionPackagesMutation} from '../../../reduxToolkit/Services/auth';
import Loading from '../../../components/Atoms/Loading';

const Index: React.FC = () => {
  const [getSubscriptionPackages, {isLoading, error}] =
    useGetSubscriptionPackagesMutation();

  const [data, setPackge] = useState<null | any[]>(null);

  useEffect(() => {
    const getPackages = async () => {
      try {
        const packages: any[] = await getSubscriptionPackages({}).unwrap();

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
                  packagesname: 'All Studies',
                },
                {
                  available: true,
                  packagesname: 'All Exams',
                },
                {
                  available: true,
                  packagesname: 'All challenges',
                },
                {
                  available: true,
                  packagesname: 'All videos and pdfs materials ',
                },
                {
                  available: true,
                  packagesname: 'Unlimited random exam questions',
                },
              ],
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

  if (isLoading) {
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
        <View style={styles.scrollContainer}>
          <View style={styles.backicon}>
            <BackWithItem type="SubscriptionPlan" isTrial={false} />
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
        </View>
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
