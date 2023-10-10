import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {RootState} from '../../reduxToolkit/Store';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import profileImg from '../../assets/Images/Profile/1.png';
import hellosvg from '../../assets/Images/svg/hii.svg';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CarouselFrame: React.FC<{index: number}> = ({index}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      {user && (
        <View>
          {index === 0 && (
            <FrameOne
              name={user.firstName}
              img={profileImg}
              text="Today is a good day to learn something new!"
            />
          )}
          {index === 1 && (
            <FrameOne
              name={user.firstName}
              img={profileImg}
              text="Today is a good day to learn something new!"
            />
          )}
          {index === 2 && (
            <FrameOne
              name={user.firstName}
              img={profileImg}
              text="Today is a good day to learn something new!"
            />
          )}
          {index === 3 && (
            <FrameOne
              name={user.firstName}
              img={profileImg}
              text="Today is a good day to learn something new!"
            />
          )}
        </View>
      )}

      {!user && (
        <View>
          {index === 0 && <FrameOne name="" img={profileImg} text="" />}
          {index === 1 && <FrameTwo name="" img={profileImg} text="" />}
          {index === 2 && <FrameThree name="" img={profileImg} text="" />}
          {index === 3 && <FrameFour name="" img={profileImg} text="" />}
        </View>
      )}
    </>
  );
};

export const FrameOne: React.FC<{
  name: string;
  img: any;
  text: string;
}> = ({name, img, text}) => {
  return (
    <View style={styles.container}>
      <View style={frameOnestyles.leftBoxContainer}>
        <View style={frameOnestyles.leftSubcontainer}>
          <Text style={frameOnestyles.helloText}>Hi {name}</Text>
          <MaterialIcons
            name="waving-hand"
            color="#B37E53"
            size={35}
            style={frameOnestyles.helloIcon}
          />
        </View>
        <Text style={frameOnestyles.subText}>{text}</Text>
      </View>
      <Image source={img} style={frameOnestyles.rightBoxContainer} />
    </View>
  );
};

export const FrameTwo: React.FC<{
  name: string;
  img: any;
  text: string;
}> = ({name, img, text}) => {
  return (
    <View style={[styles.container, frameTwostyles.container]}>
      <View style={frameTwostyles.leftBoxContainer}>
        <View style={{}}>
          <Text style={frameTwostyles.firstText}>Overall progress</Text>
          <Text style={frameTwostyles.secondText}>
            Your overall progress is composed of the subjects you have studied
            and all the exams you have taken.
          </Text>
        </View>
        <Text style={frameTwostyles.subText}>{text}</Text>
      </View>

      <View style={frameTwostyles.rightBoxContainer}></View>
    </View>
  );
};

export const FrameThree: React.FC<{
  name: string;
  img: any;
  text: string;
}> = ({name, img, text}) => {
  return (
    <View style={styles.container}>
      <View style={frameOnestyles.leftBoxContainer}>
        <View style={frameOnestyles.leftSubcontainer}>
          <Text style={frameOnestyles.helloText}>Hi {name}</Text>
          <MaterialIcons
            name="waving-hand"
            color="#B37E53"
            size={35}
            style={frameOnestyles.helloIcon}
          />
        </View>
        <Text style={frameOnestyles.subText}>{text}</Text>
      </View>
      <Image source={img} style={frameOnestyles.rightBoxContainer} />
    </View>
  );
};

export const FrameFour: React.FC<{
  name: string;
  img: any;
  text: string;
}> = ({name, img, text}) => {
  return (
    <View style={styles.container}>
      <View style={frameOnestyles.leftBoxContainer}>
        <View style={frameOnestyles.leftSubcontainer}>
          <Text style={frameOnestyles.helloText}>
            Your overall progress is composed of the subjects you have studied
            and all the exams you have taken.
          </Text>
        </View>
        <Text style={frameOnestyles.subText}>{text}</Text>
      </View>
      <Image source={img} style={frameOnestyles.rightBoxContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight / 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

const frameOnestyles = StyleSheet.create({
  leftBoxContainer: {
    width: screenWidth * (6 / 10),
  },
  leftSubcontainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  helloIcon: {
    transform: [{rotate: '-80deg'}],
  },
  rightBoxContainer: {
    width: 100,
    height: 100,
    borderRadius: 30,
    marginRight: 20,
    borderWidth: 2,
  },
  helloText: {
    fontSize: 30,
    fontFamily: 'Montserrat=Bold',
    color: 'black',
    marginRight: 30,
  },
  subText: {
    fontSize: 16,
    lineHeight: 25,
    marginTop: 10,
  },
});

const frameTwostyles = StyleSheet.create({
  container: {
    backgroundColor: '#1E90FF',
  },
  leftBoxContainer: {
    width: screenWidth * (7 / 10),
  },
  rightBoxContainer: {
    width: 90,
    height: 90,
    borderWidth: 4,
    borderColor: '#3FA0FF',

    borderRadius: 100,
  },
  firstText: {
    fontSize: 18,
    fontFamily: 'Montserrat=Bold',
    marginBottom: 10,
    color: 'white',
  },
  secondText: {
    fontSize: 16,
    fontFamily: 'Montserrat=Regular',
    color: 'white',
  },
});

export default CarouselFrame;
