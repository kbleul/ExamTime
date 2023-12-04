import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';

export const styles = StyleSheet.create({
  container: {
    width: screenWidth - 20,
    height: screenHeight / 6,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
    marginLeft: screenHeight * 0.004,
  },
});

export const frameOnestyles = StyleSheet.create({
  leftBoxContainer: {
    width: screenWidth * (6 / 10),
    paddingLeft: screenWidth * 0.04,
  },
  leftSubcontainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  helloIcon: {
    transform: [{rotate: '-80deg'}],
  },
  rightBoxContainer: {
    width: screenWidth * 0.28,
    height: screenWidth * 0.28,
    maxWidth: 120,
    maxHeight: 120,
    borderRadius: 30,
    marginRight: 20,
    borderWidth: 2,
    overflow: 'hidden',
  },
  helloText: {
    fontSize: screenWidth * 0.07,
    fontFamily: 'PoppinsSemiBold',
    color: 'black',
    marginRight: 20,
  },
  subText: {
    color: '#C1C2C6',
    fontSize: screenWidth * 0.043,
    lineHeight: 25,
    marginTop: 8,
    fontFamily: 'PoppinsRegular',
  },
});

export const frameTwostyles = StyleSheet.create({
  mainContainer: {
    width: screenWidth - 23,
    height: screenHeight / 5,
    marginLeft: screenWidth * 0.05,
    borderRadius: 10,
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    height: screenHeight / 5,
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
    fontFamily: 'PoppinsSemiBold',
    marginBottom: 5,
    color: 'white',
  },
  secondText: {
    fontSize: screenWidth * 0.035,
    fontFamily: 'PoppinsRegular',
    color: 'white',
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
    height: screenHeight / 5,
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: screenWidth * 0.048,
    marginRight: 9,
  },
  adsTile1: {
    color: 'black',
    fontFamily: 'PoppinsSemiBold',
    paddingHorizontal: '6%',
    marginTop: '1%',
    marginBottom: '2%',
    fontSize: screenWidth * 0.048,
  },
  adsTile2: {
    color: 'white',
    fontFamily: 'PoppinsRegular',
    paddingHorizontal: '6%',
    fontSize: screenWidth * 0.06,
  },
  adsText: {
    color: '#b5b5b5',
    fontFamily: 'Montserrate-Regular',
    paddingHorizontal: '6%',
    fontSize: 16,
    lineHeight: 20,
  },
  adsBtnContainer: {
    flexDirection: 'row',
    paddingHorizontal: '6%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '3%',
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
    height: screenHeight / 5,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    marginRight: 7,
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
