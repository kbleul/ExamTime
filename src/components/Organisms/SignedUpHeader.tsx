import {Text} from '@gluestack-ui/themed';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {HeaderStyle} from '../../styles/Theme/HeaderBox';
import {useGlobalState} from '../../context/auth';

const SignedUpHeader: React.FC<{type: string}> = ({type}) => {
  const {user} = useGlobalState();

  return (
    <View style={[HeaderStyle.container, styles.container]}>
      <View style={HeaderStyle.subContainer}>
        <Text style={HeaderStyle.typeText}>{type}</Text>
      </View>
      <View style={[HeaderStyle.leftContainer, styles.leftContainer]}>
        <Text
          style={[HeaderStyle.leftContainer_text, styles.leftContainer_text]}>
          {user?.firstName} {user?.lastName}
        </Text>
        <FontAwesome5 name="user" color="#E2725B" size={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  leftContainer: {
    borderWidth: 1,
    borderBottomWidth: 1,
    marginTop: 0,
  },
  leftContainer_text: {
    marginRight: 10,
  },
});

export default SignedUpHeader;
