import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IconContainer from './IconContainer';
import LogoutAlertBox from '../Organisms/LogoutAlertBox';
import ShareApp from '../Organisms/ShareApp';
import {ProfileMenuItems, ProfileMenuItemsAuth} from '../../utils/Data/data';
import {useSelector} from 'react-redux';
import {RootState} from '../../reduxToolkit/Store';
import DeleteAccountAlertBox from '../Organisms/DeleteAccountAlertBox';

const MenuItemsProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigator = useNavigation();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteDialog, setShowLDeleteDialog] = useState(false);

  return (
    <View style={styles.container}>
      {user &&
        Object.keys(ProfileMenuItemsAuth).map((item, index) => (
          <IconContainer
            key={item + '--' + index}
            item={item}
            bgColor={ProfileMenuItemsAuth[item].color}
<<<<<<< HEAD
<<<<<<< HEAD:src/components/Molecules/MenuItems.tsx
            navigate={ProfileMenuItems[item].navigate}
            setShowLogoutDialog={setShowLogoutDialog}
            
=======
            navigate={ProfileMenuItemsAuth[item].navigate}
            setShowLogoutDialog={setShowLogoutDialog}
            setShowLDeleteDialog={setShowLDeleteDialog}
>>>>>>> dev:src/components/Molecules/MenuItemsProfile.tsx
=======
<<<<<<<< HEAD:src/components/Molecules/MenuItems.tsx
            navigate={ProfileMenuItems[item].navigate}
            setShowLogoutDialog={setShowLogoutDialog}
            
========
            navigate={ProfileMenuItemsAuth[item].navigate}
            setShowLogoutDialog={setShowLogoutDialog}
            setShowLDeleteDialog={setShowLDeleteDialog}
>>>>>>>> dev:src/components/Molecules/MenuItemsProfile.tsx
>>>>>>> dev
          />
        ))}

      {!user &&
        Object.keys(ProfileMenuItems).map((item, index) => (
          <IconContainer
            key={item + '--' + index}
            item={item}
            bgColor={ProfileMenuItems[item].color}
            navigate={ProfileMenuItems[item].navigate}
            setShowLogoutDialog={setShowLogoutDialog}
<<<<<<< HEAD
<<<<<<< HEAD:src/components/Molecules/MenuItems.tsx

=======
            setShowLDeleteDialog={setShowLDeleteDialog}
>>>>>>> dev:src/components/Molecules/MenuItemsProfile.tsx
=======
<<<<<<<< HEAD:src/components/Molecules/MenuItems.tsx

========
            setShowLDeleteDialog={setShowLDeleteDialog}
>>>>>>>> dev:src/components/Molecules/MenuItemsProfile.tsx
>>>>>>> dev
          />
        ))}

      {showLogoutDialog && (
        <LogoutAlertBox setShowLogoutDialog={setShowLogoutDialog} />
      )}

      {showDeleteDialog && (
        <DeleteAccountAlertBox setShowLDeleteDialog={setShowLDeleteDialog} />
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
export default MenuItemsProfile;
