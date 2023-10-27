import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
  ScrollView,
  FlatList,
} from 'react-native';
import BackWithItem from '../../../components/Organisms/BackWithItem';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';
const {width, height} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.5 : width * 0.5;

const Index: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [data, setPackge] = React.useState([
    {
      key: '1',
      planname: 'Basic Plan',
      price: 200,
      current: true,
      color: '#F5A52D',
      packages: [
        {
          available: true,
          packagesname: 'Activated',
        },
        {
          available: true,
          packagesname: 'Full Access',
        },
        {
          available: true,
          packagesname: '3 month',
        },
        {
          available: false,
          packagesname: 'Dimond Badge',
        },
      ],
    },
    {
      key: '2',
      planname: 'Intermediate Plan',
      price: 200,
      current: false,
      color: '#4F8FCB',
      packages: [
        {
          available: true,
          packagesname: 'Activated',
        },
        {
          available: true,
          packagesname: 'Full Access',
        },
        {
          available: true,
          packagesname: '3 month',
        },
        {
          available: false,
          packagesname: 'Dimond Badge',
        },
      ],
    },
    {
      key: '3',
      planname: 'Pro Plan',
      price: 200,
      current: false,
      color: '#8075CB',
      packages: [
        {
          available: true,
          packagesname: 'Activated',
        },
        {
          available: true,
          packagesname: 'Full Access',
        },
        {
          available: true,
          packagesname: '3 month',
        },
        {
          available: false,
          packagesname: 'Dimond Badge',
        },
      ],
    },
  ]);

  //list of packges
  const renderPackageItem = ({item}) => {
    const {available, packagesname} = item;

    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {available ? (
          <AntDesign
            name="check"
            size={20}
            color="green"
            style={{marginRight: 5}}
          />
        ) : (
          <AntDesign
            name="close"
            size={20}
            color="red"
            style={{marginRight: 5}}
          />
        )}
        <Text style={styles.listofPackagesText}>{packagesname}</Text>
      </View>
    );
  };
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const handleScroll = (event: {nativeEvent: {contentOffset: {x: any}}}) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(offsetX / ITEM_SIZE);
    setActiveCardIndex(newIndex);
  };
  // Dots Component
  const Dots = ({data, activeIndex}) => {
    return (
      <View style={styles.dotsContainer}>
        {data.map((item: {key: React.Key | null | undefined}, index: any) => (
          <View
            key={item.key}
            key={index + '--dot'}
            style={[
              styles.dot,
              index === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.backicon}>
          <BackWithItem type="SubscriptionPlan" isTrial={user ? false : true} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Upgrade to a subscription plan to access a world of benefits and
            take your experience to the next level.
          </Text>
        </View>

        <View style={styles.HorizontalList}>
          <Animated.FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={item => item.key}
            horizontal
            bounces={false}
            decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
            renderToHardwareTextureAndroid
            contentContainerStyle={{alignItems: 'center'}}
            snapToInterval={ITEM_SIZE}
            snapToAlignment="start"
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false, listener: handleScroll},
            )}
            scrollEventThrottle={16}
            renderItem={({item, index}) => {
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
              const shakeValue = scrollX.interpolate({
                inputRange: [
                  (index - 2) * ITEM_SIZE,
                  (index - 1) * ITEM_SIZE,
                  index * ITEM_SIZE,
                  (index + 1) * ITEM_SIZE,
                  (index + 2) * ITEM_SIZE,
                ],
                outputRange: ['0deg', '-4deg', '0deg', '4deg', '0deg'], // Rotate left and right
                extrapolate: 'clamp',
              });
              const zIndex = index === activeCardIndex ? 100 : 0;
              console.log('zindez', zIndex); // Add zIndex to bring the active card to the top
              return (
                <View
                  style={{
                    width: ITEM_SIZE,
                    height: 250,
                    /* backgroundColor: 'blue', */ margin: 5,
                  }}>
                  <Animated.View
                    style={{
                      // position: 'absolute',
                      height: '100%',
                      marginHorizontal: SPACING - 15,
                      alignItems: 'center',
                      transform: [{translateY}],
                      zIndex: zIndex,
                      borderRadius: 34,
                      borderColor: item.color,
                      borderWidth: 1,
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={[
                        styles.topCardContainer,
                        {backgroundColor: item.color},
                      ]}>
                      <Text style={styles.topCardContainerText}>
                        {item.planname}
                      </Text>
                      <View style={[styles.circleContainer]}>
                        <View
                          style={[
                            styles.circle,
                            {backgroundColor: item.color},
                          ]}>
                          <Text style={styles.circleText}>
                            {item.price}Birr
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{flex: 1}}>
                      <View style={styles.listofPackages}>
                        <FlatList
                          data={item.packages}
                          renderItem={renderPackageItem}
                          keyExtractor={item => item.key}
                        />
                      </View>
                    </View>
                    <View
                      style={[
                        styles.listofPackagesBottom,
                        {backgroundColor: item.color},
                      ]}>
                      <Text style={styles.listofPackagesBottomtext}>
                        {item.current ? 'Current Plan' : 'Upgrade Now'}
                      </Text>
                    </View>
                  </Animated.View>
                </View>
              );
            }}
          />

          <Dots data={data} activeIndex={activeCardIndex} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textBottom}>
            Security and Privacy Information
          </Text>
          <Text style={styles.text}>
            Your payments will be encrypted and processed securely. We
            prioritize your privacy and handle your personal information
            carefully.
          </Text>
        </View>
        {/* <MainBottomNav /> */}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: '#0066B2',
    height: 10,
    width: 30,
  },
  backicon: {
    marginTop: 0,
  },
  circle: {
    alignItems: 'center',
    backgroundColor: '#F5A52D',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 50,
    height: 70,
    justifyContent: 'center',
    width: 70,
  },
  circleContainer: {
    alignItems: 'center',
    bottom: -30,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  circleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  dot: {
    borderRadius: 5,
    height: 10,
    marginHorizontal: 5,
    width: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  HorizontalList: {
    alignItems: 'center',
    height: 400,
    justifyContent: 'center',
    margin: 5,
  },
  inactiveDot: {
    backgroundColor: 'grey',
  },
  listofPackages: {
    color: '#222E50',
    fontFamily: 'Montserrat-Regular',
    marginTop: 20,
    padding: 10,
  },
  listofPackagesBottom: {
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 34,
    height: 50,
    justifyContent: 'center',
    padding: 10,
    width: '100%',
  },
  listofPackagesBottomtext: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  listofPackagesText: {
    color: '#222E50',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 24,
    textAlign: 'center',
  },
  posterImage: {
    borderRadius: 24,
    height: ITEM_SIZE * 1.2,
    margin: 0,
    marginBottom: 10,
    resizeMode: 'cover',
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    marginTop: 40,
  },
  text: {
    color: '#222E50',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    padding: 10,
    textAlign: 'left',
  },
  textBottom: {
    color: '#1E90FF',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'left',
  },
  textContainer: {
    overflow: 'hidden',
    padding: 5,
    width: '100%',
  },
  topCardContainer: {
    alignItems: 'center',
    backgroundColor: '#F5A52D',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    height: '30%',
    justifyContent: 'center',
    paddingBottom: 35,
    position: 'relative',
    width: '100%',
  },
  topCardContainerText: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
});

export default Index;
