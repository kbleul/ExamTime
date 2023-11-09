import {StyleSheet} from 'react-native';

export const formStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 5,
    color: '#F9FCFF',
  },
  inputContainer: {
    marginBottom: 0,
  },
  inputContainerHidden: {
    display: 'none',
  },
  label: {
    fontFamily: 'PoppinsSemiBold',
    color: '#1E90FF',
    fontSize: 15,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#9CC0EC',
    paddingHorizontal: 20,
    paddingVertical: 6,
    fontSize: 16,
    color: '#000',
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
    borderWidth: 0,
    borderLeftWidth: 1,
    borderRadius: 0,
    width: '100%',
    color: '#000',
  },
  flexedInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainerFlexed: {
    width: '48%',
  },
  dropdown: {
    height: 42,
    borderColor: '#8dbaf0',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 8,
    textTransform: 'uppercase',
    color: '#d4d4d4',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#d4d4d4',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#d4d4d4',
  },
  itemListStyle: {
    color: '#000',
  },
  submitBtnContainer: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 15,
  },
  submitBtn: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    width: 200,
    paddingVertical: 11,
  },
  submitBtnPassword: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    width: 200,
    paddingVertical: 11,
    alignSelf: 'flex-end',
  },
  submitText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  error: {
    color: '#f08273',
    paddingHorizontal: 8,
    textAlign: 'right',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#b3b3b3',
  },
});

export const formSubHeaderStyles = StyleSheet.create({
  heading: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 24,
    color: '#4d4d4d',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  subHeading: {
    fontFamily: 'PoppinsRegular',
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
    color: '#000',
  },
  inputError: {
    borderColor: 'red',
  },
  erroerText: {
    textAlign: 'right',
    fontFamily: 'Montserrat-Regular',
    color: 'red',
    marginTop: 10,
    paddingHorizontal: 40,
  },
});
