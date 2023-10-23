import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Dispatch from './dispatch';

const Index = () => {
  const [pageCounter, setPageCounter] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      {Dispatch({pageCounter, setPageCounter})}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Index;
