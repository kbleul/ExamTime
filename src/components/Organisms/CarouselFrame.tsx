import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootState} from '../../reduxToolkit/Store';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import profileImg from '../../assets/Images/Profile/1.png';
import frameBlueImg from '../../assets/Images/frame_blue.png';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {
  styles,
  frameFourstyles,
  frameOnestyles,
  frameThreestyles,
  frameTwostyles,
} from '../../styles/Theme/FramesStyle';

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
            <FrameTwo
              title="Overall progress"
              img={frameBlueImg}
              text="Your overall progress is composed of the subjects you have studied
              and all the exams you have taken."
              progrss="50%"
            />
          )}
          {index === 2 && (
            <FrameThree
              title="Become a member"
              text="Elevate learning. Join our community, expand your knowledge."
              btnText="Subscribe"
            />
          )}
          {index === 3 && <FrameFour text="How to use the app" />}
        </View>
      )}

      {!user && (
        <View>
          {index === 0 && <FrameOne name="" img={profileImg} text="" />}
          {index === 1 && (
            <FrameTwo name="" img={profileImg} text="" progrss="50%" />
          )}
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
            size={32}
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
  title: string;
  img: any;
  text: string;
  progrss: string;
}> = ({title, img, text, progrss}) => {
  return (
    <ImageBackground
      style={[styles.container, frameTwostyles.container]}
      source={img} // Replace with the correct path to your image
    >
      <View style={frameTwostyles.leftBoxContainer}>
        <View style={{}}>
          <Text style={frameTwostyles.firstText}>{title}</Text>
          <Text style={frameTwostyles.secondText}>{text}</Text>
        </View>
      </View>

      <View style={frameTwostyles.rightBoxContainer}>
        <Text style={frameTwostyles.progressText}>{progrss}</Text>
      </View>
    </ImageBackground>
  );
};

export const FrameThree: React.FC<{
  title: string;
  text: any;
  btnText: string;
  btnTextTwo?: string;
}> = ({title, text, btnText, btnTextTwo}) => {
  const navigator = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <View style={frameThreestyles.adsContainer}>
      <Text style={frameThreestyles.adsTile1}>{title}</Text>
      <Text style={frameThreestyles.adsText}>{text}</Text>
      <View
        style={
          user
            ? [
                frameThreestyles.adsBtnContainer,
                frameThreestyles.adsBtnContainerCentered,
              ]
            : frameThreestyles.adsBtnContainer
        }>
        <TouchableOpacity
          style={frameThreestyles.adsBtns}
          touchSoundDisabled
          onPress={() => navigator.navigate('Signup')}>
          <Text style={frameThreestyles.adsBtnsText}>{btnText}</Text>
        </TouchableOpacity>
        {!user && (
          <TouchableOpacity
            style={[
              frameThreestyles.adsBtns,
              frameThreestyles.adsBtns_secondary,
            ]}
            touchSoundDisabled
            onPress={() => navigator.navigate('Login')}>
            <Text style={frameThreestyles.adsBtnsText}>{btnTextTwo}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export const FrameFour: React.FC<{
  text: string;
}> = ({text}) => {
  return (
    <ImageBackground
      style={frameFourstyles.container}
      source={require('../../assets/Images/frame4.png')} // Replace with the correct path to your image
    >
      <View style={frameFourstyles.textContainer}>
        <Text style={frameFourstyles.text}>{text}</Text>
      </View>

      <TouchableOpacity
        touchSoundDisabled
        style={frameFourstyles.iconCOntainer}>
        <AntDesign name="youtube" color="#FF3131" size={60} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default CarouselFrame;
