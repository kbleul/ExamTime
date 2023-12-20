import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';

export const HeaderStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: screenHeight * 0.009,
  },
  containerSecondary: {
    justifyContent: 'flex-end',
  },
  nameText: {
    fontFamily: 'PoppinsSemiBold',
    color: '#000',
    fontSize: screenWidth * 0.048,
    paddingLeft: 12,
    paddingTop: screenWidth * 0.03,
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  trialText: {
    fontSize: screenWidth * 0.06,
    margin: 2,
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
  },
  notificationBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    position: 'relative',
    height: 50,
    width: 50,
  },
  dot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 14,
    height: 14,
    borderRadius: 20,
    backgroundColor: '#0066B2',
    overflow: 'visible',
    zIndex: 10,
  },
  leftContainer: {
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#E2725B',
    paddingHorizontal: 12,
    paddingVertical: screenHeight * 0.005,
    borderRadius: 10,
    overflow: 'hidden',

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
