import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ProfileMenuItems, ProfileMenuItemsAuth} from '../../utils/Data/data';
import {useGlobalState} from '../../context/auth';

const MenuItemDispatch: React.FC<{itemName: string}> = ({itemName}) => {
  const {user} = useGlobalState();
  switch (itemName) {
    case user ? ProfileMenuItemsAuth.Profile.name : 'Profile':
      return <SimpleLineIcons name="user" size={18} color="white" />;

    case user
      ? ProfileMenuItemsAuth['Subscription Plan'].name
      : ProfileMenuItems['Subscription Plan'].name:
      return <SimpleLineIcons name="badge" size={18} color="white" />;

    case user
      ? ProfileMenuItemsAuth['About Us'].name
      : ProfileMenuItems['About Us'].name:
      return <Feather name="info" size={18} color="white" />;

    case user
      ? ProfileMenuItemsAuth['Contact Us'].name
      : ProfileMenuItems['Contact Us'].name:
      return (
        <MaterialIcons name="connect-without-contact" size={18} color="white" />
      );

    case user ? ProfileMenuItemsAuth.FAQ.name : ProfileMenuItems.FAQ.name:
      return <AntDesign name="questioncircleo" size={18} color="white" />;

    case user
      ? ProfileMenuItemsAuth['User Guide'].name
      : ProfileMenuItems['User Guide'].name:
      return <AntDesign name="questioncircleo" size={18} color="white" />;

    case user ? ProfileMenuItemsAuth.Logout.name : 'Login':
      return <MaterialIcons name="logout" size={18} color="white" />;

    default:
      return <></>;
  }
};

export default MenuItemDispatch;
