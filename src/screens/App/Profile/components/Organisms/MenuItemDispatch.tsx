import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ProfileMenuItems} from '../../../../../utils/Data/data';

const MenuItemDispatch: React.FC<{itemName: string}> = ({itemName}) => {
  switch (itemName) {
    case ProfileMenuItems.Profile.name:
      return <SimpleLineIcons name="user" size={18} color="white" />;

    case ProfileMenuItems['Subscription Plan'].name:
      return <SimpleLineIcons name="badge" size={18} color="white" />;

    case ProfileMenuItems['About Us'].name:
      return <Feather name="info" size={18} color="white" />;

    case ProfileMenuItems['Contact Us'].name:
      return (
        <MaterialIcons name="connect-without-contact" size={18} color="white" />
      );

    case ProfileMenuItems.FAQ.name:
      return <AntDesign name="questioncircleo" size={18} color="white" />;

    case ProfileMenuItems['User Guide'].name:
      return <AntDesign name="questioncircleo" size={18} color="white" />;

    default:
      return <></>;
  }
};

export default MenuItemDispatch;
