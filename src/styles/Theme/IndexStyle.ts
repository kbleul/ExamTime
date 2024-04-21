import {StyleSheet} from 'react-native';
import {screenHeight} from '../../utils/Data/data';

export const IndexStyle = StyleSheet.create({
  container: {
    flex: screenHeight,
    width: '100%',
    padding: 5,
    paddingTop: screenHeight * 0.02,
    backgroundColor: '#F9FCFF',
  },
  ScrollView: {
    height: screenHeight - screenHeight * 0.09,
  },
});
