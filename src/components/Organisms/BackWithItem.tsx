import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

type BackWithItemsType = {
  type: string;
  isTrial?: boolean;
};
const BackWithItem: React.FC<BackWithItemsType> = ({type, isTrial}) => {
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.subContainer}
        touchSoundDisabled
        onPress={() => navigator.goBack()}>
        <Ionicons name="chevron-back-outline" color="#000" size={24} />
        <Text style={styles.typeText}>{type}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    paddingHorizontal: 10,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trialText: {
    fontSize: 24,
    margin: 2,
    color: '#000',
  },
  typeText: {
    margin: 4,
    marginBottom: 6,
    marginLeft: 10,
    fontSize: 22,
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
  },
  leftContainer: {
    margin: 2,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#E2725B',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer_text: {
    color: '#E2725B',
    marginRight: 2,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
});

export default BackWithItem;
