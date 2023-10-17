import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const ViewQuestionHeader: React.FC<{title: string; isSideNav?: boolean}> = ({
  title,
  isSideNav,
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="chevron-back" color="black" size={30} />
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
          <FontAwesome name="file-text-o" size={30} color="#1E90FF" />

          <View style={styles.doneContainer}>
            <Feather name="check" size={20} color="white" />
            <Text style={styles.doneText}>Done</Text>
          </View>
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
});

export default ViewQuestionHeader;
