import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MenuItemDispatch from '../Organisms/MenuItemDispatch';
import {ProfileMenuItems} from '../../../../../utils/Data/data';
import {useNavigation} from '@react-navigation/native';

const IconContainer: React.FC<{item: string; bgColor: string}> = ({
  item,
  bgColor,
}) => {
  const navigator = useNavigation();
  return (
    <TouchableOpacity
      style={styles.buttonsContainer}
      onPress={() => {
        item === ProfileMenuItems.Profile.name &&
          navigator.navigate('Profile-Edit');
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
