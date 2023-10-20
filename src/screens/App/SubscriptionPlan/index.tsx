import React, { useState, useRef } from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import BackWithItem from '../../../components/Organisms/BackWithItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reduxToolkit/Store';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
const { width, height } = Dimensions.get('window');
// import { LinearGradient } from 'expo-linear-gradient';

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.5 : width * 0.5;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;


const Backdrop = ({ movies, scrollX }) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
      <FlatList
        data={movies.reverse()}
        keyExtractor={(item) => item.key + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.backdrop) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            // extrapolate:'clamp'
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: item.backdrop }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute',
                }}
              />
            </Animated.View>
          );
        }}
      />
      {/* <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'white']}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: 0,
        }}
      /> */}
    </View>
  );
};

const Index: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [movies, setMovies] = React.useState([
    {
      key: '1',
      poster: 'https://example.com/poster1.jpg',
      title: 'Card 1',
      description: 'Description of Card1',
    },
    {
      key: '2',
      poster: 'https://example.com/poster2.jpg',
      title: 'Card2',
      description: 'Description of Card2 2',
    },
    {
      key: '3',
      poster: 'https://example.com/poster2.jpg',
      title: 'Card3',
      description: 'Description of Card 3',
    },

    // Add more movie objects as needed
  ]);

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    // <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View style={styles.backicon}>
        <BackWithItem type="SubscriptionPlan" isTrial={user ? false : true} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Upgrade to a subscription plan to access a world of benefits and take your experience to the next level.
        </Text>
      </View>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          // if (!item.poster) {
          //   return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          // }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [-50, 0, -50],
            extrapolate: 'clamp',
          });

          return (
            <View style={{ width: ITEM_SIZE }}>
              <Animated.View
                style={{
                  marginHorizontal: -SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  transform: [{ translateY }],
                  backgroundColor: index === 0 ? "red" : index === 1 ? "yellow" : "purple",
                  borderRadius: 34,
                }}
              >
                <Image
                  source={{ uri: item.poster }}
                  style={styles.posterImage}
                />
                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 12 }} numberOfLines={3}>
                  {item.description}
                </Text>
              </Animated.View>
          
            </View>
          );
        }}
      />
          <View style={styles.textContainer}>
                    <Text style={styles.text}>Your payments will be  encrypted and processed securely. We prioritize your privacy and handle your personal information carefully.
                    </Text>
                </View>
                {/* <MainBottomNav /> */}
                </ScrollView>
    // </View>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 10,
    fontSize: 15,
    textAlign:"center",
    color: '#222E50',
    fontFamily: 'Montserrat-Regular',
},
textContainer: {
    // height: '25%',
    // marginTop:20,
    padding: 5,
    width: '100%',
    overflow: "hidden"
},
scrollContainer: {
  // backgroundColor: 'red',
  flexGrow: 1,
  marginTop: 40,
  // flex:1,
},
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    // marginTop: 40,
     height: 100,
     backgroundColor:"blue"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  backicon: {
    marginTop: 0,
  },
});

export default Index;