import {View} from '@gluestack-ui/themed';
import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

const Loading = () => {
  return (
    <View style={style.loadingCOntainer}>
      <ActivityIndicator color="#1E90FF" size={30} />
    </View>
  );
};

const style = StyleSheet.create({
  loadingCOntainer: {
    paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Loading;
