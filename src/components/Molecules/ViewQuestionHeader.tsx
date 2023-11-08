import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {screenWidth} from '../../utils/Data/data';

const ViewQuestionHeader: React.FC<{
  title: string;
  setShowFullPage?: React.Dispatch<React.SetStateAction<boolean>>;
  showFullPage?: boolean;
}> = ({title, setShowFullPage, showFullPage}) => {
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity touchSoundDisabled onPress={() => navigator.goBack()}>
        <Ionicons name="chevron-back" color="black" size={30} />
      </TouchableOpacity> */}
      <Text style={styles.titleText}>{title}</Text>

      {/* <TouchableOpacity touchSoundDisabled>
            <FontAwesome5
              name="undo-alt"
              size={25}
              color="#1E90FF"
              style={styles.icon}
            />
          </TouchableOpacity> */}

      {setShowFullPage ? (
        <TouchableOpacity
          touchSoundDisabled
          onPress={() => setShowFullPage && setShowFullPage(prev => !prev)}
          style={
            showFullPage
              ? [styles.pageToggle, styles.pageToggleActive]
              : styles.pageToggle
          }>
          <FontAwesome
            name="file-text-o"
            size={showFullPage ? 20 : 18}
            color={showFullPage ? '#1E90FF' : '#fff'}
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          touchSoundDisabled
          onPress={() => setShowFullPage && setShowFullPage(prev => !prev)}
          style={styles.lockStyle}>
          <FontAwesome name="file-text-o" size={16} color={'#fff'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 15,
    marginBottom: 5,
  },
  titleText: {
    width: '90%',
    color: 'black',
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.04,
    textAlign: 'left',
    paddingTop: 5,
    paddingLeft: 10,
  },
  titleTextSecondary: {
    width: '90%',
  },
  doneContainer: {
    borderRadius: 5,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 0.5,
  },
  doneText: {
    fontSize: 9,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
  },
  iconContainer: {
    width: '10%',
  },
  icon: {
    paddingTop: 2,
  },
  pageToggle: {
    width: 35,
    height: 35,
    backgroundColor: '#2968F5',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
    borderColor: '#1E90FF',
  },
  pageToggleActive: {
    borderRadius: 80,
    backgroundColor: '#fff',
    borderWidth: 2,
  },
  lockStyle: {
    backgroundColor: '#2968F5',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewQuestionHeader;
