import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MenuItems from '../Molecules/MenuItems';
import {useSelector} from 'react-redux';
import {RootState} from '../../reduxToolkit/Store';
import {useNavigation} from '@react-navigation/native';
//import badgeImg from '../../assets/Images/Profile/1.png';

const ProfileContent = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigator = useNavigation<any>();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {user && (
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {user ? `${user.firstName} ${user.lastName}` : ''}
            </Text>
            {/*<Image style={styles.badge} source={badgeImg} />*/}
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '67%',
    width: '100%',
    backgroundColor: '#F9FCFF',
    overflow: 'hidden',
  },
  nameContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 30,
    paddingVertical: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: '#1E90FF',
  },
  badge: {
    width: 25,
    height: 33,
    marginLeft: 10,
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
