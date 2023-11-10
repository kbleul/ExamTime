import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MenuItemDispatch from '../Organisms/MenuItemDispatch';
import {useNavigation} from '@react-navigation/native';
import {ProfileMenuItems, ProfileMenuItemsAuth} from '../../utils/Data/data';
import {useSelector} from 'react-redux';
import {RootState} from '../../reduxToolkit/Store';

const IconContainer: React.FC<{
  item: string;
  bgColor: string;
  navigate: string;
  setShowLogoutDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({item, bgColor, navigate, setShowLogoutDialog, setShowLDeleteDialog}) => {
  const navigator = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);

  const handlePress = () => {
    if (user && item === ProfileMenuItemsAuth.Logout.name) {
      setShowLogoutDialog(true);
      return;
    }

    if (user && item === ProfileMenuItemsAuth['Delete Account'].name) {
      setShowLDeleteDialog(true);
      return;
    }

    if (item === ProfileMenuItemsAuth.Profile.name) {
      navigator.navigate('Profile-Edit');
      return;
    }
    navigator.navigate(navigate);
  };

  return (
    <TouchableOpacity style={styles.buttonsContainer} onPress={handlePress}>
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
