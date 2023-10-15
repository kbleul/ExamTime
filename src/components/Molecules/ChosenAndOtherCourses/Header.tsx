import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header: React.FC<{
  title: string;
  subTitle?: string;
  seeAll?: boolean;
}> = ({title, subTitle, seeAll}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {seeAll && (
        <View style={styles.bottomBox}>
          <Text style={styles.subtext}>{subTitle}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>See all</Text>
            <MaterialIcons name="navigate-next" color="#99BCE0" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    color: '#008E97',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16.5,
  },
  bottomBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtext: {
    color: '#858585',
    fontFamily: 'Montserrat-Regular',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#62aaf5',
    fontFamily: 'Montserrat-Regular',
  },
});
export default Header;
