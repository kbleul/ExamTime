import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import IconContainer from './IconContainer';
import LogoutAlertBox from '../Organisms/LogoutAlertBox';
import ShareApp from '../Organisms/ShareApp';
import {ProfileMenuItems, ProfileMenuItemsAuth} from '../../utils/Data/data';
import {useSelector} from 'react-redux';
import {RootState} from '../../reduxToolkit/Store';

const MenuItems = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  return (
    <View style={styles.container}>
      {user &&
        Object.keys(ProfileMenuItemsAuth).map((item, index) => (
          <IconContainer
            key={item + '--' + index}
            item={item}
            bgColor={ProfileMenuItemsAuth[item].color}
<<<<<<< HEAD
            navigate={item}
=======
            navigate={ProfileMenuItemsAuth[item].navigate}
>>>>>>> ETID-15
            setShowLogoutDialog={setShowLogoutDialog}
          />
        ))}

      {!user &&
        Object.keys(ProfileMenuItems).map((item, index) => (
          <IconContainer
            key={item + '--' + index}
            item={item}
            bgColor={ProfileMenuItems[item].color}
<<<<<<< HEAD
            navigate={item}
=======
            navigate={ProfileMenuItems[item].navigate}
>>>>>>> ETID-15
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
