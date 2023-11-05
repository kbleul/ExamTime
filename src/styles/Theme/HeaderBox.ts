import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';

export const HeaderStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.01,
    paddingVertical: screenHeight * 0.01,
  },
  containerSubscribed: {
    justifyContent: 'flex-end',
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  trialText: {
    fontSize: screenWidth * 0.06,
    margin: 2,
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
  },
  typeText: {
    margin: 4,
    marginBottom: 6,
    fontSize: screenWidth * 0.05,
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
  },
  notificationBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 3,
  },
  dot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: '#0066B2',
  },
  leftContainer: {
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#E2725B',
    paddingHorizontal: 12,
    paddingVertical: screenHeight * 0.005,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer_text: {
    color: '#E2725B',
    marginRight: 2,
    fontSize: screenWidth * 0.03,
    fontFamily: 'Montserrat-Regular',
  },
});
