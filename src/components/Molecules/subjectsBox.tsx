import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const tempColors = {
  1 : '#F5A52D',
  2 : '#74FF51',
  3 : '#E2725B',
  4: '#1E90FF',
  5: '#1E90FF',
  6: '#F5A52D',
};

const SubjectsBox: React.FC<{name: string; index: number}> = ({
  name,
  index,
}) => {
  const navigator = useNavigation<any>();

  return (
    <TouchableOpacity
      style={style.container}
      onPress={() => navigator.navigate('View-Course')}>
      <ImageBackground
        style={style.imgBackground}
        source={require('../../assets/Images/courses/1.png')} // Replace with the correct path to your image
      >
        <ImageBackground
          style={style.imgBackground}
          source={require('../../assets/Images/home/1.png')} // Replace with the correct path to your image
        >
          <View>
            <Text style={[style.name, {color: tempColors[1]}]}>{name}</Text>
            <Text style={style.unit}>Unit </Text>
            <Text style={style.title}>Title</Text>
          </View>
        </ImageBackground>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: 16,
  },
  imgBackground: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#FFF',
    height: 128,
    resizeMode: 'contain ', // You can change the resizeMode to 'contain' or 'stretch' based on your needs
    justifyContent: 'flex-end',
    borderRadius: 10,
    overflow: 'hidden',
  },
  name: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    paddingHorizontal: 6,
  },
  unit: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    paddingHorizontal: 6,
  },
  title: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    paddingHorizontal: 6,
    paddingBottom: 4,
  },
});

export default SubjectsBox;
