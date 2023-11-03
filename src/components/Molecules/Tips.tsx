import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const Tips: React.FC<{
  title?: string;
  note: string;
  readonly: boolean;
}> = ({title, note, readonly}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/Images//Practice/tip.png')}
          resizeMode="cover"
        />
      </View>
      {readonly ? (
        <View style={styles.textContainer}>
          {title && <Text style={styles.tipTitle}>{title}</Text>}
          <Text style={styles.tipText}>{note}</Text>
        </View>
      ) : (
        <TouchableOpacity touchSoundDisabled style={styles.textContainer}>
          <Text style={styles.tipTitle}>{title}</Text>
          <Text style={styles.tipText}>{note}</Text>
          <Text style={[styles.readmore, styles.readmore]}>Read more</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginTop: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#5EB4CF',
  },
  imgContainer: {
    width: '14%',
    borderRadius: 300,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    minWidth: 25,
    height: 37,
  },
  textContainer: {
    width: '86%',
    paddingHorizontal: '2%',
  },
  tipTitle: {
    fontFamily: 'PoppinsSemiBold',
    color: 'black',
    fontSize: 13,
  },
  tipText: {
    fontFamily: 'PoppinsRegular',
    color: 'black',
    fontSize: 13,
  },
  readmore: {
    color: '#1E90FF',
  },
});

export default Tips;
