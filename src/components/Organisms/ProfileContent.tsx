import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet, ms} from 'react-native-size-matters';
import MenuItemsProfile from '../Molecules/MenuItemsProfile';
import badgeImg from '../../assets/Images/Profile/badge.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {RootState} from '../../reduxToolkit/Store';
import {useNavigation} from '@react-navigation/native';
import {useNavContext} from '../../context/bottomNav';
import {screenHeight} from '../../utils/Data/data';

const ProfileContent = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigator = useNavigation<any>();
  const {setShowNavigation} = useNavContext();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {user && (
          <View style={styles.profileHeaderContainer}>
            <TouchableOpacity
              style={styles.iconContainer}
              touchSoundDisabled
              onPress={() => navigator.goBack()}>
              <AntDesign name="left" style={styles.backIcon} size={ms(24)} />
            </TouchableOpacity>
            <View>
              <Text style={styles.userData}>
                {user ? `${user.firstName} ${user.lastName}` : ''}
              </Text>
              <Text style={styles.location}>
                {user ? `${user.region.region}` : ''}
              </Text>
            </View>
            <TouchableOpacity
              touchSoundDisabled
              onPress={() => navigator.navigate('Profile-Edit')}>
              <MaterialIcons name="edit" style={styles.editIcon} size={24} />
            </TouchableOpacity>
          </View>
        )}
        {user && (
          <View style={styles.nameContainer}>
            <View style={styles.activityContainer}>
              <Text style={styles.name}>Activities</Text>
              <Text style={styles.activity}>
                Earn a badge and get discounts!
              </Text>
            </View>

            <Image style={styles.badge} source={badgeImg} />
          </View>
        )}

        {!user && (
          <View style={styles.adsBtnContainer}>
            <TouchableOpacity
              style={styles.adsBtns}
              touchSoundDisabled
              onPress={() => {
                setShowNavigation(false);
                navigator.navigate('HomeSection', {screen: 'Signup'});
              }}>
              <Text style={styles.adsBtnsText}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.adsBtns, styles.adsBtns_secondary]}
              touchSoundDisabled
              onPress={() => {
                setShowNavigation(false);
                navigator.navigate('HomeSection', {screen: 'Login'});
              }}>
              <Text style={styles.adsBtnsText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}

        <MenuItemsProfile />
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    top: '26%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: '30@vs',
    borderTopRightRadius: '30@vs',
    height: '75%',
    width: '100%',
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    paddingBottom: screenHeight * 0.02,
  },
  nameContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#fff',
    marginVertical: '10@vs',
    paddingVertical: '10@vs',
    paddingHorizontal: '30@s',
    borderRadius: 5,
    overflow: 'visible',
    position: 'relative',
  },
  activityContainer: {
    width: '70%',
    flexDirection: 'column',
    gap: 3,
  },
  name: {
    fontSize: '18@ms',
    fontFamily: 'PoppinsSemiBold',
    color: 'black',
  },
  activity: {
    fontFamily: 'PoppinsRegular',
    fontSize: '11.5@ms',
    color: '#000',
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"red",
    position: 'absolute',
    top: '-50@ms',
    right: '2%',
    transform: [{translateX: 12.5}],
    width: '130@s',
    height: '170@vs',
    objectFit: 'contain',
  },
  adsBtnContainer: {
    flexDirection: 'row',
    paddingHorizontal: '6%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '3%',
    backgroundColor: '#fff',
    marginBottom: '10@ms',
  },
  adsBtns: {
    width: '43%',
    paddingVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#6A5ACD',
  },
  adsBtns_secondary: {
    backgroundColor: '#0A6EC7',
  },
  adsBtnsText: {
    textAlign: 'center',
    fontSize: '18@ms',
    color: '#FFFFFF',
    fontFamily: 'PoppinsRegular',
  },
  profileHeaderContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: '5@vs',
    paddingVertical: '5@vs',
    paddingHorizontal: '5@msr',
  },
  iconContainer: {
    color: 'black',
  },
  backIcon: {
    color: 'black',
    fontSize: '28@ms',
    fontWeight: 'bold',
  },
  userData: {
    textAlign: 'center',
    fontSize: '18@ms',
    fontFamily: 'PoppinsSemiBold',
    color: 'black',
  },
  location: {
    textAlign: 'center',
    fontSize: '15@ms',
    fontFamily: 'PoppinsSemiBold',
    color: 'black',
  },
  editIcon: {
    backgroundColor: 'white',
    padding: '5@msr',
    borderRadius: '50@ms',
    overflow: 'hidden',
    color: 'black',
    fontSize: '28@ms',
    fontWeight: 'bold',
    zIndex: 10,
  },
});
export default ProfileContent;
