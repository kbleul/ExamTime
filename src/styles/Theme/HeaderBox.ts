import {StyleSheet} from 'react-native';

export const HeaderStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 5,
  },
  subContainer: {},
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
  leftContainer: {
    margin: 2,
    marginTop: 5,
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
