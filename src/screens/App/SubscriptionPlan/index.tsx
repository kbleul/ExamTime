import React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Platform,
  ScrollView,
  FlatList,
} from 'react-native';
import BackWithItem from '../../../components/Organisms/BackWithItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reduxToolkit/Store';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
const { width, height } = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.5 : width * 0.5;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Index: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [data, setMovies] = React.useState([
    {
      key: '1',
      planname: 'Intermediate Plan',
      price: 200,
      current: false,
      packages: [
        {
          available: true,
          packagesname: "Activated"
        },
        {
          available: true,
          packagesname: "Full Access"
        },
        {
          available: true,
          packagesname: "3 month"
        },
        {
          available: false,
          packagesname: "Dimond Badge"
        }
      ]
    },
    {
      key: '2',
      planname: 'Intermediate Plan',
      price: 200,
      current: false,
      packages: [
        {
          available: true,
          packagesname: "Activated"
        },
        {
          available: true,
          packagesname: "Full Access"
        },
        {
          available: true,
          packagesname: "3 month"
        },
        {
          available: false,
          packagesname: "Dimond Badge"
        }
      ]
    },
    {
      key: '3',
      planname: 'Intermediate Plan',
      price: 200,
      current: false,
      packages: [
        {
          available: true,
          packagesname: "Activated"
        },
        {
          available: true,
          packagesname: "Full Access"
        },
        {
          available: true,
          packagesname: "3 month"
        },
        {
          available: false,
          packagesname: "Dimond Badge"
        }
      ]
    },

    // Add more movie objects as needed
  ]);
  const renderPackageItem = ({ item }) => {
    const { available, packagesname } = item;

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {available ? (
          <AntDesign name="check" size={20} color="green" style={{ marginRight: 5 }} />
        ) : (
          <AntDesign name="close" size={20} color="red" style={{ marginRight: 5 }} />
        )}
        <Text style={styles.listofPackagesText} >{packagesname}</Text>
      </View>
    );
  };
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* <StatusBar hidden /> */}
        <View style={styles.backicon}>
          <BackWithItem type="SubscriptionPlan" isTrial={user ? false : true} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Upgrade to a subscription plan to access a world of benefits and take your experience to the next level.
          </Text>
        </View>

        <View style={styles.HorizontalList}>
          <Animated.FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
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
                <View style={{ width: ITEM_SIZE, height: 250, backgroundColor: 'blue', margin: 5 }}>
                  <Animated.View
                  
                    style={{
                      height: "100%",
                      marginHorizontal: SPACING - 15,
                      // padding: SPACING,
                      alignItems: 'center',
                      transform: [{ translateY }],
                      backgroundColor: index === 0 ? "red" : index === 1 ? "yellow" : "purple",
                      borderRadius: 34,
                      justifyContent: "space-between",
                    }}
                  >
                    
                    <View style={styles.topCardContainer}>
                      <Text>{item.planname}</Text>
                      <View style={styles.circleContainer}>

                        <View style={styles.circle}>
                          <Text style={styles.circleText}>Your Text</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ flex: 1 }}>
                    <View style={styles.listofPackages}>
                      <FlatList
                        data={item.packages}
                        renderItem={renderPackageItem}
                        keyExtractor={(item) => item.key}
                      />
                    </View>
                    </View>
                    <View style={styles.listofPackagesBottom}>
                      <Text>usdyfhu</Text>
                      <Text>usdyfhu</Text>
                    </View>
                    
                  </Animated.View>

                </View>
              );
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Your payments will be  encrypted and processed securely. We prioritize your privacy and handle your personal information carefully.
          </Text>
        </View>
        {/* <MainBottomNav /> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  text: {
    padding: 10,
    fontSize: 15,
    textAlign: "center",
    color: '#222E50',
    fontFamily: 'Montserrat-Regular',
  },
  textContainer: {
    padding: 5,
    width: '100%',
    overflow: "hidden"
  },
  scrollContainer: {

    flexGrow: 1,
    marginTop: 40,

  },
  HorizontalList: {
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    // flex: 1,
    margin: 5,
    // overflow:"hidden",
    backgroundColor: "pink"
  },
  listofPackages: {
    padding: 10,
    marginTop: 20,
    color: '#222E50',
    fontFamily: 'Montserrat-Regular',
  },
  listofPackagesText: {
    fontSize: 15,
    color: '#222E50',
    fontFamily: 'Montserrat-Regular',
  },
  listofPackagesBottom: {
    height: 30,
    padding: 10,
    width: "100%",
    borderRadius: 34,
    backgroundColor: "orange"
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCardContainer: {
    borderRadius: 34,
    height: "20%",
    width: "100%",
    backgroundColor: "orange",
    position: "relative",

  },
  // Updated style for the circle container
  circleContainer: {
    position: 'absolute',
    bottom: -30,
    left: 0,
    right: 0,
    // backgroundColor: 'green',
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    // paddingBottom: -19, // Adjust the spacing from the bottom
  },

  circle: {
    height: 70,
    width: 70,
    borderRadius: 50,
    backgroundColor: 'green',
    borderColor: "white",
    borderWidth: 5,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  circleText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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