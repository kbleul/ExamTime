import { StyleSheet, Text, Image, View } from 'react-native';
import React, { useEffect, useState, useWindowDimensions } from 'react';
import Animated, { useAnimatedStyle, withSpring, Extrapolate, interpolate } from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { screenHeight, screenWidth } from '../../utils/Data/data';
import { scale } from 'react-native-size-matters';

interface SubCardProps {
  item: any;
  x: any;
  index: number;
  size: number;
  spacer: number;
}

const SubCard: React.FC<SubCardProps> = ({ item, x, index, size, spacer }) => {
  const activeColor = '#FAFAFA'; // Color when card is active
  const inactiveColor = 'white';
  const activeColorBorder = '#ED7218'; // Color when card is active
  const inactiveColorBorder = 'grey';

  const style = useAnimatedStyle(() => {
    const currentIndex = Math.round(x.value / size);
    const isActive = currentIndex === index - 1;
    const scale = withSpring(isActive ? 1 : 0.8, { damping: 6, stiffness: 80 });
    // const scale = interpolate(
    //   x.value,
    //   [(index - 2) * size, (index - 1) * size, index * size],
    //  withSpring(isActive ? 1 : 0.8, { damping: 6, stiffness: 80 });
    //   Extrapolate.CLAMP
    // );

    return {
      transform: [{ scale }],
      borderColor: isActive
        ? withSpring(activeColorBorder)
        : withSpring(inactiveColorBorder),
      borderWidth: isActive ? 5 : 1,
      backgroundColor: isActive
        ? withSpring(activeColor)
        : withSpring(inactiveColor)
    };
  });
  if (!item.planname) {
    return <View style={{ width: spacer }} key={index} />;
  }
  return (
    <View style={{ width: size }} key={index}>
      <Animated.View style={[styles.card, style,]}>
        <View style={styles.popularContainer}>
          <Text style={styles.popularText}>Popular</Text>
        </View>
        <View style={styles.CardHeaderText}>
          <Text style={styles.cardName} >{item.planname}</Text>
          <View style={styles.PriceContainer}>
            <Text style={styles.PriceName} >200 Birr</Text>
            <Text style={styles.PriceDate} >/6 Month</Text>
          </View>
        </View>
        <View style={styles.cdivider}>
          <View style={styles.divider} />
        </View>

        <View style={styles.PackgeListsConatiner}>
          {item.packages.map((packageItem, index) => {
            const { available, packagesname } = packageItem;
            return (
              <View key={index} style={{ flexDirection: 'row', gap:5, alignItems: 'center' ,    justifyContent: 'flex-start'}}>
                <View style={styles.cIcon}>
                  <AntDesign
                    name="check"
                    size={15}
                    color="white"
                  />
                </View>
                <Text style={styles.listofPackagesText}>{packagesname}</Text>
              </View>

            );
          })}


        </View>
        <View
          style={[
            styles.Button
          ]}>
          <TouchableOpacity style={[
            styles.listofPackagesBottom,
          ]}>
            <Text style={styles.listofPackagesBottomtext}>
              {item.current ? 'Current Plan' : 'Upgrade Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

    </View>

  );
};
const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.6,
    height: screenHeight * 0.5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ED7218',
  },
  popularContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
    backgroundColor: '#ED7218',
    padding: screenWidth * 0.01,
    borderBottomLeftRadius: 5
  },
  popularText: {
    color: 'white',
    fontSize: screenWidth * 0.03,
    fontWeight: 'bold',
  },
  listofPackagesText: {
    color: 'black',
    fontFamily: 'PoppinsRegular',
    fontSize: 15,
    textAlign: 'left',
  },
  listofPackagesBottomtext: {
    color: 'white',
    fontFamily: 'PoppinsRegular',
    fontSize: 15,
  },
  listofPackagesBottom: {
    alignItems: 'center',
    backgroundColor: '#ED7218',
    borderRadius: screenWidth * 0.02,
    height: screenHeight * 0.07,
    justifyContent: 'center',
    padding: 6,
    width: screenWidth * 0.5,
  },
  packageItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    marginRight: 5,
  },
  closeIcon: {
    marginRight: 5,
  },
  Button: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardHeaderText: {
    padding: screenWidth * 0.01,
    marginHorizontal: screenWidth * 0.04,
    marginVertical: screenWidth * 0.04,
  },
  PackgeListsConatiner: {
    padding: screenWidth * 0.01,
    marginHorizontal: screenWidth * 0.04,
  },
  PriceContainer: {
    flexDirection: 'column',
    gap: -10,
  },
  PriceName: {
    color: 'black',
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.08,
    textAlign: 'center',
  },
  PriceDate: {
    color: 'black',
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.05,
    textAlign: 'center',
  },
  cardName: {
    color: 'black',
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.05,
    textAlign: 'left',
  },
  cdivider: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",

  },
  divider: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "80%",
    marginVertical: screenHeight * 0.011,
    marginHorizontal: screenWidth * 0.01,
    height: 2,
    backgroundColor: '#F3F3F4',
  },
  cIcon:{
    width:scale(15),
    height:scale(15),
    // padding:1,
    borderRadius:100,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#B9B8C5"
  }
});
export default SubCard;

