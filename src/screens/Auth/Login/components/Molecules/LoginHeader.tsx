import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const LoginHeader: React.FC<{navigate: () => void}> = ({navigate}) => {
  return (
    <View style={styles.topSectionContainer}>
      <View style={styles.topSectionSubContainer}>
        <TouchableOpacity
          touchSoundDisabled
          onPress={navigate}
          style={styles.backIconContainer}>
          <AntDesign name="left" size={22} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.imgcontainer}>
        <FontAwesome6 name="user-large" size={45} color="#858585" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topSectionContainer: {
    height: '20%',
  },
  backIconContainer: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  topSectionSubContainer: {
    height: '65%',
    minHeight: 100,
    borderBottomRightRadius: 22,
    borderBottomLeftRadius: 22,
    backgroundColor: '#1E90FF',
  },
  imgcontainer: {
    position: 'absolute',
    top: '25%',
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: '#fff',
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default LoginHeader;
