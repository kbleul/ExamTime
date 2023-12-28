import {StyleSheet} from 'react-native';
import {screenHeight} from '../../utils/Data/data';

export const IndexStyle = StyleSheet.create({
  container: {
    flex: screenHeight,
    width: '100%',
    paddingTop: screenHeight * 0.02,
    padding: 5,
    backgroundColor: '#F9FCFF',
  },
  ScrollView: {
    height: screenHeight,
  },
});
