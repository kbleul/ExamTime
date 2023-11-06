import React from 'react';
import { StyleSheet, View } from 'react-native';
import Dot from './Dot';
import { screenHeight } from '../../utils/Data/data';

interface PaginationProps {
  data: any[]; 
  x: any; 
  size: number; 
}

const Pagination: React.FC<PaginationProps> = ({ data, x, size }) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, i) => {
        return <Dot key={i} x={x} index={i} size={size} />;
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height:  screenHeight* 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
