import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {logoutSuccess} from '../../reduxToolkit/Features/auth/authSlice';
import {useDispatch} from 'react-redux';
import {removeRealmUserData} from '../../utils/Functions/Helper';
import {AuthContext} from '../../Realm/model';
import {UserData} from '../../Realm';
import {STATUSTYPES, screenWidth} from '../../utils/Data/data';
import {useUserStatus} from '../../context/userStatus';
import {calculateDateDifference} from '../../screens/App/Onboarding/Logic';

const LogoutAlertBox: React.FC<{
  setShowLogoutDialog: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({setShowLogoutDialog}) => {
  const dispatch = useDispatch();
  const {useQuery, useRealm} = AuthContext;
  const realm = useRealm();

  const savedUserData = useQuery(UserData);

  const {setUserStatus} = useUserStatus();

  const navigator = useNavigation();
  const [removeDtata, setRemoveData] = useState(false);

  const handleLogout = () => {
    dispatch(logoutSuccess());
    removeRealmUserData(realm, savedUserData);
    setShowLogoutDialog(false);
    calculateDateDifference(savedUserData[0].initialDate) >
    savedUserData[0].allowedTrialDays
      ? setUserStatus(STATUSTYPES.NotAuthorized)
      : setUserStatus(STATUSTYPES.Trial);

    navigator.navigate('HomeSection');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Are you sure you want to logout ?</Text>

      <View style={styles.checkContainer}>
        <TouchableOpacity
          touchSoundDisabled
          onPress={() => setRemoveData(prev => !prev)}>
          {removeDtata ? (
            <Feather name="check-square" color="black" size={24} />
          ) : (
            <Feather name="square" color="black" size={24} />
          )}
        </TouchableOpacity>

        <Text style={styles.removeText}>Remove all saved data from device</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          touchSoundDisabled
          onPress={() => setShowLogoutDialog(false)}>
          <Text style={styles.buttonText}>Cancle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          touchSoundDisabled
          onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 125,
    zIndex: 100,
    backgroundColor: '#AED1F3',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
  mainText: {
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    marginVertical: 30,
    color: 'black',
    fontSize: screenWidth * 0.04,
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: screenWidth * 0.035,
    color: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: 'gray',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  buttonText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: screenWidth * 0.035,
    color: 'black',
  },
});

export default LogoutAlertBox;
