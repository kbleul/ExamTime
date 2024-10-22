import {Platform, StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../../utils/Data/data';

export const style = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: screenHeight * 0.035,
    width: '100%',
    backgroundColor: '#fff',
    flex: screenHeight,
  },
  ScrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: Platform.OS ? screenHeight * 0.035 : screenHeight * 0.01,
  },
});

export const menuStyle = StyleSheet.create({
  container: {
    height: 60,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: screenWidth * 0.02,
    marginLeft: screenWidth * 0.02,
  },
  button: {
    paddingVertical: 2,
    paddingHorizontal: screenWidth * 0.09,
  },
  buttonSelected: {
    borderBottomWidth: 3,
    borderColor: '#399BE2',
  },
  buttonText: {
    fontSize: screenWidth * 0.04,
    color: '#000',
    fontFamily: 'PoppinsMedium',
    textTransform: 'capitalize',
  },
});

export const unitCardStyles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#c2c0c0',
    backgroundColor: '#fff',
    height: 'auto',
  },
  topcontainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  topcontainerSecondary: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  menuContainer: {
    width: '20%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  indexText: {
    paddingVertical: 15,
    width: '90%',
    marginRight: '10%',
    borderWidth: 1,
    textAlign: 'center',
    backgroundColor: '#5D4A99',
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.05,
    color: '#fff',
  },
  textContainer: {
    width: '70%',
    position: 'relative',
  },
  textContainerSecondary: {
    paddingHorizontal: 8,
  },
  textTitleSubject: {
    color: '#1e90ff',
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.042,
    textTransform: 'capitalize',
    height: screenWidth * 0.06,
    overflow: 'hidden',
  },
  textTitleSubjectSecondary: {
    color: '#5D4A99',
  },
  textTitle: {
    color: '#1e90ff',
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.036,
    textTransform: 'capitalize',
    height: screenWidth * 0.06,
    overflow: 'hidden',
  },
  textTitleSecondary: {
    marginTop: 10,
    color: '#5D4A99',
    fontSize: screenWidth * 0.042,
  },
  textSubTitle: {
    color: '#000',
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.04,
    position: 'absolute',
    bottom: -10,
    height: screenWidth * 0.07,
    overflow: 'hidden',
  },
  textSubTitleSecondary: {
    bottom: 0,
    paddingHorizontal: 8,
  },
  downBtn: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  downBtnSecondary: {
    paddingBottom: 10,
  },
});

export const accordiontyles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#E1E1E1',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  objectiveText: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 8,
    marginBottom: 5,
    fontFamily: 'PoppinsMedium',
    textTransform: 'capitalize',
    fontSize: screenWidth * 0.036,
    color: '#000',
    lineHeight: 24,
  },
  videoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    width: '78%',
    marginBottom: 15,
  },
  videoText: {
    color: '#A4A4AE',
    fontSize: screenWidth * 0.04,
    fontFamily: 'PoppinsSemiBold',
  },
  videoIcon: {
    backgroundColor: '#9A85FC',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  assessmentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assessmentIcon: {
    marginHorizontal: 5,
    marginVertical: 7,
    backgroundColor: '#EEF1F6',
    borderRadius: 8,
    overflow: 'hidden',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
  },
  assessmentIconBg: {
    backgroundColor: '#399BE2',
    height: 45,
  },
  assessmentTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.04,
    marginLeft: screenWidth * 0.03,
    color: '#000',
    width: '72%',
  },
  square: {
    color: '#000',
    alignSelf: 'flex-start',
    position: 'absolute',
    right: 4,
    top: 4,
  },
});
