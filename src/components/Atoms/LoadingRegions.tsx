import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingRegions: React.FC = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={14} />
      <Text style={styles.loadingText}>Loading regions ...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default LoadingRegions;