import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createRealmUserData} from '../../screens/App/Onboarding/Logic';
import {AuthContext} from '../../Realm/model';
import {screenWidth} from '../../utils/Data/data';
import {PagesCounterType} from '../../screens/App/Onboarding/Page/types';
const TopIndicator: React.FC<
  PagesCounterType & {
    IsLoadingSubjectsRealm?: boolean;
    setIsLoadingSubjects?: React.Dispatch<React.SetStateAction<boolean>>;
  }
> = ({
  pageCounter,
  setPageCounter,
  IsLoadingSubjectsRealm,
  setIsLoadingSubjects,
}) => {
  const navigator = useNavigation();
  const {useRealm} = AuthContext;
  const realm = useRealm();
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => setPageCounter(prev => --prev)}>
        <Ionicons name="chevron-back-outline" style={style.icon} />
      </TouchableOpacity>

      {pageCounter === 3 && !IsLoadingSubjectsRealm ? (
        <TouchableOpacity
          onPress={() =>
            setIsLoadingSubjects &&
            createRealmUserData(realm, [], navigator, setIsLoadingSubjects)
          }>
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
    paddingVertical: 2,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
  },
  indicator: {
    paddingVertical: 4,
    backgroundColor: '#E2EBFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  indicatorActive: {
    backgroundColor: '#1E90FF',
  },
  icon: {
    fontSize: screenWidth * 0.065,
    color: '#000',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#1E90FF',
  },
});

export default TopIndicator;
