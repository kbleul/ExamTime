import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import badgeImg from '../../../../../assets/Images/Profile/badge1.png';
import MenuItems from '../Molecules/MenuItems';
import {useGlobalState} from '../../../../../context/auth';

const ProfileContent = () => {
  const {user} = useGlobalState();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {user ? `${user.firstName} ${user.lastName}` : ''}
          </Text>
          <Image style={styles.badge} source={badgeImg} />
        </View>

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
});
export default ProfileContent;
