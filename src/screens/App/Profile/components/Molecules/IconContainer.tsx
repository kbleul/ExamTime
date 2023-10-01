import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MenuItemDispatch from '../Organisms/MenuItemDispatch';
import {ProfileMenuItemsAuth} from '../../../../../utils/Data/data';
import {useNavigation} from '@react-navigation/native';
import {useGlobalState} from '../../../../../context/auth';

const IconContainer: React.FC<{
  item: string;
  bgColor: string;
  setShowLogoutDialog: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({item, bgColor, setShowLogoutDialog}) => {
  const navigator = useNavigation();
  const {user} = useGlobalState();

  return (
    <TouchableOpacity
      style={styles.buttonsContainer}
      onPress={() => {
        item === ProfileMenuItemsAuth.Profile.name &&
          navigator.navigate('Profile-Edit');

        user &&
          item === ProfileMenuItemsAuth.Logout.name &&
          setShowLogoutDialog(true);
      }}>
      <View style={[styles.iconContainer, {backgroundColor: bgColor}]}>
        <MenuItemDispatch itemName={item} />
      </View>
      <Text style={styles.title}>{item}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginBottom: 6,
    paddingHorizontal: 30,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  iconContainer: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    color: '#4D4D4D',
  },
});

export default IconContainer;
