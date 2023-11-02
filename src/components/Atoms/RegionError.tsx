import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RegionErrorProps {
  error: boolean;
}

const RegionError: React.FC<RegionErrorProps> = ({ error }) => {
  return (
    <View>
      {error && !region ? (
        <Text style={styles.error}>Region is required *</Text>
      ) : (
        <Text style={styles.error}>{''}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 8,
  },
});

export default RegionError;