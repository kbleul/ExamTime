import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import badgeImg from '../../assets/Images/Profile/badge.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MenuItems from '../Molecules/MenuItems';
import {useSelector} from 'react-redux';
import {RootState} from '../../reduxToolkit/Store';
import {useNavigation} from '@react-navigation/native';

const ProfileContent = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigator = useNavigation<any>();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {user && (
          <View style={styles.profileHeaderContainer}>
            <TouchableOpacity
              style={styles.iconContainer}
              touchSoundDisabled
              onPress={() => navigator.goBack()}>
              <AntDesign name="left" style={styles.backIcon} size={24} />
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
                You are now in the position of gold to upgrade you have to spent
                time.
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
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#fff',
    marginVertical: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
    overflow: 'visible',
    position: 'relative', // Add this line to make the container relative
  },
  activityContainer: {
    width: '70%',
    flexDirection: 'column',
    gap: 3,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
  },
  activity: {
    fontFamily: 'Montserrat-SemiBold',
    //  width:"20%"
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    //  backgroundColor:"red",
    position: 'absolute', // Add this line to make the badge absolute
    top: -50, // Adjust the value as needed to position the badge
    right: '1%', // Adjust the value as needed to horizontally position the badge
    transform: [{translateX: 12.5}], // Adjust the value as needed to center the badge horizontally
    width: 140,
    height: 200,
    objectFit: 'contain',
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
  profileHeaderContainer: {
    // width: '100%',
    // backgroundColor:"red",
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  iconContainer: {
    color: 'black',
  },
  backIcon: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
  },
  userData: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
  },
  location: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
  },
  editIcon: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 50,
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
export default ProfileContent;
