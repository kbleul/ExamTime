import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootState} from '../../reduxToolkit/Store';

import {useSelector} from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';

import frameBlueImg from '../../assets/Images/frame_blue.png';
import logoImg from '../../assets/Logo/logo_.png';

import {useNavigation} from '@react-navigation/native';
import {
  styles,
  frameOnestyles,
  frameTwostyles,
  frameThreestyles,
  frameFourstyles,
} from '../../styles/Theme/FramesStyle';
import {STATUSTYPES, screenWidth} from '../../utils/Data/data';
import CircleProgressIndicator from '../Molecules/CircleProgressIndicator';
import Config from 'react-native-config';
import {useNavContext} from '../../context/bottomNav';
import {getAggrgategaStudiesProgress} from '../../utils/Functions/Helper/historyCalculations';
import {AuthContext} from '../../Realm/model';
import {useUserStatus} from '../../context/userStatus';

const CarouselFrame: React.FC<{
  index: number;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({index, setShowAlert}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const {userStatus} = useUserStatus();

  return (
    <>
      {user && (
        <View>
          {index === 0 && <FrameOne />}
          {index === 1 && (
            <FrameTwo
              title="Overall progress"
              img={frameBlueImg}
              text="Your overall progress is composed of the subjects you have studied
              and all the exams you have taken."
              progrss={0}
            />
          )}
          {index === 2 &&
            (userStatus === STATUSTYPES.Subscribed ? (
              <View style={wrapperStyle.wrapper}>
                <FrameOne />
              </View>
            ) : (
              <FrameThree
                title="Become a member"
                text="Elevate learning. Join our community, expand your knowledge."
                btnText="Subscribe"
                issubscribe
              />
            ))}

          {index === 3 && <FrameFour text="How to use the app" />}
        </View>
      )}

      {!user && (
        <View>
          {index === 0 && <FrameOne />}
          {index === 1 && (
            <FrameTwo
              title="Overall progress"
              img={frameBlueImg}
              text="Your overall progress is composed of the subjects you have studied
            and all the exams you have taken."
              progrss={0}
            />
          )}
          {index === 2 && (
            <FrameThree
              title="Become a member"
              text="Elevate learning. Join our community, expand your knowledge."
              btnText="Login"
              btnTextTwo="Signup"
            />
          )}
          {index === 3 && <FrameFour text="How to use the app" />}
        </View>
      )}
    </>
  );
};

export const FrameOne = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <ImageBackground
      style={[styles.container, frameOnestyles.container]}
      source={require('../../assets/Images/home/c1.png')} // Replace with the correct path to your image
    >
      <View style={frameOnestyles.leftBoxContainer}>
        <Text style={frameOnestyles.text}>
          Today is a good day to learn something new! Learn anytime, anywhere.
          Welcome to your future.
        </Text>
      </View>

      <View style={frameOnestyles.rightBoxContainer}>
        <Image
          source={
            user && user.profilePicture
              ? {
                  uri: user.profilePicture.includes('https://')
                    ? user.profilePicture
                    : `${Config.API_URL}profile-pictures/` +
                      user.profilePicture,
                }
              : logoImg
          }
          style={frameOnestyles.rightBoxImage}
        />
      </View>
    </ImageBackground>
  );
};

export const FrameTwo: React.FC<{
  title: string;
  img: any;
  text: string;
  progrss: number;
}> = ({title, img, text}) => {
  const {useRealm} = AuthContext;
  const realm = useRealm();

  return (
    <View style={frameTwostyles.mainContainer}>
      <ImageBackground
        style={frameTwostyles.container}
        source={img} // Replace with the correct path to your image
        resizeMode="cover">
        <View style={frameTwostyles.leftBoxContainer}>
          <View style={{}}>
            <Text style={frameTwostyles.firstText}>{title}</Text>
            <Text style={frameTwostyles.secondText}>{text}</Text>
          </View>
        </View>
        <CircleProgressIndicator
          progress={getAggrgategaStudiesProgress(realm)}
        />
      </ImageBackground>
    </View>
  );
};

export const FrameThree: React.FC<{
  title: string;
  text: any;
  btnText: string;
  btnTextTwo?: string;
  issubscribe?: boolean;
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({title, text, btnText, btnTextTwo, issubscribe}) => {
  const navigator = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);
  const {setShowNavigation} = useNavContext();
  const {userStatus} = useUserStatus();

  return (
    <>
      <ImageBackground
        style={frameThreestyles.adsContainer}
        source={require('../../assets/Images/home/c3.png')} // Replace with the correct path to your image
      >
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
          {issubscribe && userStatus === STATUSTYPES.Subscribed ? (
            <></>
          ) : (
            <TouchableOpacity
              style={frameThreestyles.adsBtns}
              touchSoundDisabled
              onPress={() => {
                if (issubscribe) {
                  // setShowAlert && setShowAlert(true);
                  navigator.navigate('SubscriptionPlan');
                } else {
                  setShowNavigation(false);
                  navigator.navigate('Login');
                }
              }}>
              <Text style={frameThreestyles.adsBtnsText}>{btnText}</Text>
            </TouchableOpacity>
          )}
          {!user && (
            <TouchableOpacity
              style={[
                frameThreestyles.adsBtns,
                frameThreestyles.adsBtns_secondary,
              ]}
              touchSoundDisabled
              onPress={() => {
                setShowNavigation(false);
                navigator.navigate('Signup');
              }}>
              <Text style={frameThreestyles.adsBtnsText}>{btnTextTwo}</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </>
  );
};

export const FrameFour: React.FC<{
  text: string;
}> = ({text}) => {
  const navigator: any = useNavigation();

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
        style={frameFourstyles.iconCOntainer}
        onPress={() => navigator.navigate('User Guide')}>
        <AntDesign name="youtube" color="#FF3131" size={screenWidth * 0.18} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const wrapperStyle = StyleSheet.create({
  wrapper: {
    marginLeft: 16,
    marginRight: 5.1,
  },
});

export default CarouselFrame;
