import {StyleSheet} from 'react-native';
import {screenHeight} from '../../utils/Data/data';

export const IndexStyle = StyleSheet.create({
  container: {
    flex: screenHeight,
    width: '100%',
    padding: 5,
    backgroundColor: '#F9FCFF',
    paddingTop: 25,
    paddingBottom: 80,
  },
  ScrollView: {
    height: screenHeight,
  },
});
