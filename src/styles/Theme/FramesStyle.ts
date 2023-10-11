import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';

export const styles = StyleSheet.create({
  container: {
    width: screenWidth - 20,
    height: screenHeight / 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export const frameOnestyles = StyleSheet.create({
  leftBoxContainer: {
    width: screenWidth * (6 / 10),
  },
  leftSubcontainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  helloIcon: {
    transform: [{rotate: '-80deg'}],
  },
  rightBoxContainer: {
    width: 100,
    height: 100,
    borderRadius: 30,
    marginRight: 20,
    borderWidth: 2,
  },
  helloText: {
    fontSize: 30,
    fontFamily: 'Montserrat=Bold',
    color: 'black',
    marginRight: 30,
  },
  subText: {
    color: 'black',
    fontSize: 16,
    lineHeight: 25,
    marginTop: 10,
  },
});

export const frameTwostyles = StyleSheet.create({
  container: {
    width: screenWidth - 23,
    height: screenHeight / 5,
    marginLeft: 24,
    borderRadius: 10,
  },
  leftBoxContainer: {
    width: '70%',
    paddingHorizontal: 4,
  },
  rightBoxContainer: {
    width: 95,
    height: 95,
    borderWidth: 8,
    borderColor: '#2a90f5',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstText: {
    fontSize: 18,
    fontFamily: 'Montserrat=Bold',
    marginBottom: 5,
    color: 'white',
  },
  secondText: {
    fontSize: 14,
    fontFamily: 'Montserrat=Regular',
    color: 'white',
  },
  progressText: {
    fontSize: 24,
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
    marginLeft: 20,
    marginRight: 15,
  },
  adsTile1: {
    color: 'black',
    fontFamily: 'Montserrate-Regular',
    paddingHorizontal: '6%',
    marginTop: '1%',
    marginBottom: '2%',
    fontSize: 18,
  },
  adsTile2: {
    color: 'white',
    fontFamily: 'Montserrate-SemiBold',
    paddingHorizontal: '6%',
    fontSize: 24,
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
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#6A5ACD',
  },
  adsBtns_secondary: {
    backgroundColor: '#0A6EC7',
  },
  adsBtnsText: {
    textAlign: 'center',
    fontSize: 18,
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
  },
  text: {
    color: '#7fbbf5',
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },
  iconCOntainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingTop: 20,
  },
});
