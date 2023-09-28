import {StyleSheet} from 'react-native';

export const formStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 5,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputContainerHidden: {
    display: 'none',
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#4D4D4D',
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#8dbaf0',
    height: 42,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  phoneContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#8dbaf0',
  },
  phoneSmallBox: {
    fontSize: 16,
    paddingHorizontal: 16,
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
    color: '#000',
  },
  inputPhone: {
    letterSpacing: 6,
    borderWidth: 0,
    borderLeftWidth: 1,
    borderRadius: 0,
    width: '100%',
  },
  dropdown: {
    height: 42,
    borderColor: '#8dbaf0',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 8,
    textTransform: 'uppercase',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  submitBtn: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 15,
  },
  submitText: {
    paddingHorizontal: 70,
    paddingVertical: 11,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
  },
  error: {
    color: '#f08273',
    paddingHorizontal: 8,
    textAlign: 'right',
  },
});

export const formSubHeaderStyles = StyleSheet.create({
  heading: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 24,
    color: 'black',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  subHeading: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});

export const OPTStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginLeft: '10%',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#1E90FF',
    width: '18%',
    fontFamily: 'Montserrat-Regular',
    fontSize: 24,
    textAlign: 'center',
  },
});
