import {StyleSheet} from 'react-native';

export const HeaderStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    paddingVertical: 10,
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
    fontSize: 24,
    margin: 2,
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
  },
  typeText: {
    margin: 4,
    marginBottom: 6,
    fontSize: 18,
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
  },
  notificationBtn: {
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer_text: {
    color: '#E2725B',
    marginRight: 2,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
});
