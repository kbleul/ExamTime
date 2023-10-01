import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ProfileMenuItems,
  ProfileMenuItemsAuth,
} from '../../../../../utils/Data/data';
import IconContainer from './IconContainer';
import ShareApp from '../../../../../components/Organisms/ShareApp';
import {useGlobalState} from '../../../../../context/auth';
import LogoutAlertBox from '../../../../Auth/Login/components/Organisms/LogoutAlertBox';

const MenuItems = () => {
  const {user} = useGlobalState();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  return (
    <View style={styles.container}>
      {user &&
        Object.keys(ProfileMenuItemsAuth).map((item, index) => (
          <IconContainer
            key={item + '--' + index}
            item={item}
            bgColor={ProfileMenuItemsAuth[item].color}
            setShowLogoutDialog={setShowLogoutDialog}
          />
        ))}

      {!user &&
        Object.keys(ProfileMenuItems).map((item, index) => (
          <IconContainer
            key={item + '--' + index}
            item={item}
            bgColor={ProfileMenuItems[item].color}
            setShowLogoutDialog={setShowLogoutDialog}
          />
        ))}

      {showLogoutDialog && (
        <LogoutAlertBox setShowLogoutDialog={setShowLogoutDialog} />
      )}
      <ShareApp />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginLeft: '5%',
    position: 'relative',
  },
});
export default MenuItems;
