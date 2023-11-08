import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const ViewQuestionHeader: React.FC<{
  title: string;
  isSideNav?: boolean;
  setShowSideNav: () => void;
  setShowFullPage: React.Dispatch<React.SetStateAction<boolean>>;
  showFullPage: boolean;
}> = ({title, isSideNav, setShowSideNav, setShowFullPage, showFullPage}) => {
  const navigator = useNavigation();
  //  onPress={() =>
  //             setExitExamModalVisible && setExitExamModalVisible(true)
  //           }
  return (
    <View style={styles.container}>
      <TouchableOpacity touchSoundDisabled onPress={() => navigator.goBack()}>
        <Ionicons name="chevron-back" color="black" size={30} />
      </TouchableOpacity>
      <Text
        style={
          isSideNav
            ? [styles.titleText, styles.titleTextSecondary]
            : styles.titleText
        }>
        {title}
      </Text>

      {!isSideNav && (
        <>
          <TouchableOpacity touchSoundDisabled>
            <FontAwesome5
              name="undo-alt"
              size={25}
              color="#1E90FF"
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            touchSoundDisabled
            onPress={() => setShowFullPage(prev => !prev)}>
            <FontAwesome
              name="file-text-o"
              size={25}
              color={showFullPage ? '#1E90FF' : '#d4d4d4'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </>
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
  },
  titleText: {
    width: '68%',
    color: 'black',
    fontFamily: 'PoppinsSemiBold',
    fontSize: 20,
    textAlign: 'left',
    paddingTop: 5,
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
});

export default ViewQuestionHeader;
