import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ViewQuestionHeader: React.FC<{
  title: string;
  isSideNav?: boolean;
  onPress: () => void;
  setExitExamModalVisible?: (value: boolean) => void;
}> = ({title, isSideNav, onPress, setExitExamModalVisible}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity touchSoundDisabled onPress={onPress}>
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
          <TouchableOpacity touchSoundDisabled onPress={onPress}>
            <FontAwesome
              name="file-text-o"
              size={28}
              color="#1E90FF"
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.doneContainer}
            touchSoundDisabled
            onPress={() =>
              setExitExamModalVisible && setExitExamModalVisible(true)
            }>
            <Feather name="check" size={20} color="white" />
            <Text style={styles.doneText}>Done</Text>
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
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  titleText: {
    width: '65%',
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    textAlign: 'left',
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
  icon: {
    color: '#1E90FF',
    paddingTop: 2,
  },
});

export default ViewQuestionHeader;
