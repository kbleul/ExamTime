import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ProfileMenuItems} from '../../../../../utils/Data/data';
import IconContainer from './IconContainer';
import ShareApp from '../../../../../components/Organisms/ShareApp';

const MenuItems = () => {
  return (
    <View style={styles.container}>
      {Object.keys(ProfileMenuItems).map((item, index) => (
        <IconContainer
          key={item + '--' + index}
          item={item}
          bgColor={ProfileMenuItems[item].color}
        />
      ))}

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
  },
});
export default MenuItems;
