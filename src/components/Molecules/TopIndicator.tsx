import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createRealmUserData} from '../../screens/App/Onboarding/Logic';
import {AuthContext} from '../../Realm/model';
import {screenHeight} from '../../utils/Data/data';
const TopIndicator: React.FC<PagesCounterType> = ({
  pageCounter,
  setPageCounter,
}) => {
  const navigation = useNavigation();
  const {useRealm} = AuthContext;
  const realm = useRealm();
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => setPageCounter(prev => --prev)}>
        <Ionicons name="chevron-back-outline" style={style.icon} />
      </TouchableOpacity>
      <View style={style.indicatorContainer}>
        <View style={[style.indicator, style.indicatorActive]}>{''}</View>
        <View
          style={
            pageCounter === 3
              ? [style.indicator, style.indicatorActive]
              : style.indicator
          }>
          {''}
        </View>
      </View>

      {pageCounter === 3 ? (
        <TouchableOpacity
          onPress={() => createRealmUserData(realm, [], navigation)}>
          <Text style={style.text}>Skip</Text>
        </TouchableOpacity>
      ) : (
        <Text style={style.text}>{''}</Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '7%',
    height: screenHeight * (1 / 10),
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
  },
  indicator: {
    width: '48%',
    padding: 4,
    backgroundColor: '#E2EBFF',
    borderRadius: 10,
  },
  indicatorActive: {
    backgroundColor: '#1E90FF',
  },
  icon: {
    fontSize: 20,
    color: '#000',
  },
  text: {
    fontSize: 16,
    color: '#1E90FF',
  },
});

export default TopIndicator;
