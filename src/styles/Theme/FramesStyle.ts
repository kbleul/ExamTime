import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';

export const styles = StyleSheet.create({
  container: {
    width: screenWidth - 20,
    height: screenHeight / 5.1,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    marginLeft: screenHeight * 0.006,
  },
});

export const frameOnestyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftBoxContainer: {
    width: '75%',
    height: '100%',
    paddingLeft: screenWidth * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#484A51',
    fontSize: screenWidth * 0.038,
    lineHeight: 25,
    marginTop: 8,
    fontFamily: 'PoppinsMedium',
  },
  rightBoxContainer: {
    width: '25%',
    height: screenHeight / 7,
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export const frameTwostyles = StyleSheet.create({
  mainContainer: {
    width: screenWidth - 23,
    height: screenHeight / 5.1,
    marginLeft: screenWidth * 0.055,
    borderRadius: 10,
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    height: screenHeight / 5.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: screenHeight * 0.04,
  },
  leftBoxContainer: {
    width: '70%',
    paddingLeft: screenWidth * 0.02,
    paddingRight: screenWidth * 0.02,
  },
  rightBoxContainer: {
    width: screenWidth * 0.28,
    height: screenWidth * 0.28,
    maxWidth: 105,
    maxHeight: 105,
    borderWidth: 8,
    borderColor: '#2a90f5',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
  },
  firstText: {
    fontSize: screenWidth * 0.05,
    fontFamily: 'PoppinsMedium',
    marginBottom: 5,
    color: 'white',
  },
  secondText: {
    fontSize: screenWidth * 0.036,
    fontFamily: 'PoppinsLight',
    color: 'white',
    lineHeight: 22,
  },
  progressText: {
    fontSize: screenWidth * 0.08,
    fontFamily: 'Montserrat=Bold',
    color: 'white',
  },
});

export const frameThreestyles = StyleSheet.create({
  adsContainer: {
    width: screenWidth - 23,
    height: screenHeight / 5.1,
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: screenWidth * 0.055,
    marginRight: 7,
  },
  adsTile1: {
    color: 'black',
    fontFamily: 'PoppinsSemiBold',
    paddingHorizontal: '6%',
    marginTop: '1%',
    fontSize: screenWidth * 0.048,
  },
  adsTile2: {
    color: 'white',
    fontFamily: 'PoppinsRegular',
    paddingHorizontal: '6%',
    fontSize: screenWidth * 0.06,
  },
  adsText: {
    color: '#000',
    fontFamily: 'PoppinsRegular',
    paddingHorizontal: '6%',
    fontSize: 16,
    lineHeight: 23,
  },
  adsBtnContainer: {
    flexDirection: 'row',
    paddingHorizontal: '6%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: screenHeight * 0.008,
  },
  adsBtnContainerCentered: {
    justifyContent: 'center',
  },
  adsBtns: {
    width: '43%',
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: '#6A5ACD',
    overflow: 'hidden',
  },
  adsBtns_secondary: {
    backgroundColor: '#0A6EC7',
  },
  adsBtnsText: {
    textAlign: 'center',
    fontSize: screenWidth * 0.045,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
  },
});

export const frameFourstyles = StyleSheet.create({
  container: {
    width: screenWidth - 20,
    height: screenHeight / 5.1,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  textContainer: {
    backgroundColor: '#f2f0eb',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 10,
    left: 10,
    overflow: 'hidden',
  },
  text: {
    color: '#7fbbf5',
    fontFamily: 'Montserrat-Bold',
    fontSize: screenWidth * 0.043,
  },
  iconCOntainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingTop: screenHeight * 0.02,
  },
});
