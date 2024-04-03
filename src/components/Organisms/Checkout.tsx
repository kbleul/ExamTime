import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BackWithItem from './BackWithItem';
import {screenWidth} from '../../utils/Data/data';

const Checkout = () => {
  return (
    <View style={styles.container}>
      <View>
        <BackWithItem type="Subscription Plan" isTrial={false} />
      </View>

      <View style={styles.topContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Payment Methood</Text>
          <Text style={styles.infoText}>CBE</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Name</Text>
          <Text style={styles.infoText}>Kibrom Leul</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Phone Number</Text>
          <Text style={styles.infoText}>0911223344</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  topContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#ECEDED',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  infoTitle: {
    color: '#838383',
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.045,
    width: '50%',
  },
  infoText: {
    color: '#000',
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.045,
    width: '50%',
  },
});

export default Checkout;
