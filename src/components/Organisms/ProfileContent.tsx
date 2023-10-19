import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import badgeImg from '../../assets/Images/Profile/badge1.png';
import MenuItems from '../Molecules/MenuItems';
import { useSelector } from 'react-redux';
import { RootState } from '../../reduxToolkit/Store';
import { useNavigation } from '@react-navigation/native';

const ProfileContent = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {user && (
          <View style={styles.nameContainer}>
            <View>
              <Text style={styles.name}>
                {user ? `${user.firstName} ${user.lastName}` : ''}
              </Text>
              <Text style={styles.name}>
                {user ? `${user.firstName} ${user.lastName}` : ''}
              </Text>
            </View>
            {/* <Text style={styles.name}>
              {user ? `${user.firstName} ${user.lastName}` : ''}
            </Text> */}
            <Image style={styles.badge} source={badgeImg} />
          </View>
        )}

        {!user && (
          <View style={styles.adsBtnContainer}>
            <TouchableOpacity
              style={styles.adsBtns}
              touchSoundDisabled
              onPress={() => navigator.navigate('Signup')}>
              <Text style={styles.adsBtnsText}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.adsBtns, styles.adsBtns_secondary]}
              touchSoundDisabled
              onPress={() => navigator.navigate('Login')}>
              <Text style={styles.adsBtnsText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}

        <MenuItems />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '31%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '67%',
    width: '100%',
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',

  },
  nameContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 5,
    backgroundColor: '#fff',
    marginVertical: 30,
    paddingVertical: 30,
    paddingHorizontal: 30,
    overflow: "visible",
    position: 'relative', // Add this line to make the container relative
  },
  name: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: '#1E90FF',
  },
  badge: {
    // backgroundColor:"red",
    position: 'absolute', // Add this line to make the badge absolute
    top: -40, // Adjust the value as needed to position the badge
    right: '5%', // Adjust the value as needed to horizontally position the badge
    // transform: [{ translateX: -12.5 }], // Adjust the value as needed to center the badge horizontally
    width: 100,
    height: 200,
    objectFit: "contain"

  },
  adsBtnContainer: {
    flexDirection: 'row',
    paddingHorizontal: '6%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '3%',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  adsBtns: {
    width: '43%',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#6A5ACD',
  },
  adsBtns_secondary: {
    backgroundColor: '#0A6EC7',
  },
  adsBtnsText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
  },
});
export default ProfileContent;
