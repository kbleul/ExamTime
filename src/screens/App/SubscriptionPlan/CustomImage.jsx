import { StyleSheet, Text, Image, View } from 'react-native';
import React, { useEffect, useState, useWindowDimensions } from 'react';
import Animated, {useAnimatedStyle, interpolate } from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { screenHeight, screenWidth } from '../../../utils/Data/data';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MenuItemsProfile from '../../../components/Molecules/MenuItemsProfile';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';

const CustomImage = ({ item, x, index, size, spacer  }) => {
  const [aspectRatio, setAspectRatio] = useState(1)
  const style = useAnimatedStyle(() => {
    const currentIndex = Math.round(x.value / size);

    const isActive = currentIndex === index-1;
    const scale = interpolate(
      x.value,
      [(index - 2) * size, (index - 1) * size, index * size],
      [0.8, 1, 0.8]
    );

    return {
      transform: [{ scale }],
      borderColor: isActive ? 'orange' : 'grey',
      borderWidth: isActive ? 5 : 1,
    };
  });

  const style1 = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 2) * size, (index - 1) * size, index * size],
      [0.8, 1, 0.8]
    );
    return {
      transform: [{ scale }],
      borderColor: 'orange',
      borderWidth: 5,
    };
  });

  if (!item.planname) {
    return <View style={{ width: spacer }} key={index} />;
  }
  
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const offsetX = x.value;
  //     const currentIndex = Math.round(offsetX / size);
  //     setIsActive(currentIndex === index);
  //   };

  //   x.addListener(handleScroll);

  //   return () => {
  //     x.removeListener(handleScroll);
  //   };
  // }, [index, size, x]);
  // const cardBorderStyle = isActive ? styles.activeCardBorder : styles.inactiveCardBorder;
  // const isActive = Math.round(x.value / size) === index;
  return (
    <View style={{ width: size }} key={index}>
      <Animated.View style={[ styles.card,style,  ]}>
       
          <View style={styles.popularContainer}>
            <Text style={styles.popularText}>{item.planname}</Text>
          </View>
          <View style={styles.CardHeaderText}>
            <Text style={styles.cardName} >{item.planname}</Text>

            <View style={styles.PriceContainer}>
              <Text style={styles.PriceName} >200 Birr</Text>
              <Text style={styles.PriceDate} >/6 Month</Text>
            </View>
          </View>
          <View style={styles.PackgeListsConatiner}>
            {item.packages.map((packageItem, index) => {
              const { available, packagesname } = packageItem;
              return (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {available ? (
                    <AntDesign
                      name="check"
                      size={20}
                      color="green"
                      style={{ marginRight: 5 }}
                    />
                  ) : (
                    <AntDesign
                      name="close"
                      size={20}
                      color="red"
                      style={{ marginRight: 5 }}
                    />
                  )}
                  <Text style={styles.listofPackagesText}>{packagesname}</Text>
                </View>

              );
            })}
                
         
        </View>
        <View
            style={[
              styles.Button,    
            ]}>
            <TouchableOpacity  style={[
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
  // cardContainer: {
  //   width: size,
  //   marginRight: spacer,
  // },
  imageContainer: {

    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
    overflow: 'hidden',
    alignItems: 'center', // Adjust the alignment as needed
  },
  cardContent: {
    padding: 16, // Adjust padding as needed
    // Add other styles for your card content
  },
  card: {
  
    width: screenWidth*0.6,
    height: screenHeight*0.5,
    // borderWidth: 5,
    // borderRadius:10,
    // borderColor: 'orange',
  },
  PriceContainer: {
    flexDirection: "column",
    gap: -10,
  },
  PriceName: {
    color: 'black',
    fontFamily: 'PoppinsSemiBold',
    fontSize: 30,
    textAlign: 'center',
  },
  PriceDate: {
    color: 'black',
    fontFamily: 'PoppinsSemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  cardName: {
    color: 'black',
    fontFamily: 'PoppinsSemiBold',
    fontSize: 18,
    textAlign: 'left',
  },
  CardHeaderText: {
    // backgroundColor: "yellow",
    padding: screenWidth * 0.01,
    marginHorizontal: screenWidth * 0.04,
    marginVertical: screenWidth * 0.05
  },
  PackgeListsConatiner: {
    padding: screenWidth * 0.01,
    marginHorizontal: screenWidth * 0.04,
    // marginVertical: screenWidth * 0.05
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardContainer: {
    borderWidth: 2,
    // padding: 10,
    height: 300,
    width: '100%',
    borderColor: 'orange',
  },
  image: {
    width: '100%',
    height: undefined,
  },
  popularContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'orange',
    padding: 3,
    borderRadius: 3,
  },
  popularText: {
    color: 'white',
    fontSize: 12,
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
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  listofPackagesText: {
    color: '#222E50',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  listofPackagesBottom: {
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 25,
    height: 40,
    justifyContent: 'center',
    padding: 10,
    width: 200,
  },
  listofPackagesBottomtext: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  Button:{
    flex:1,
    width:"100%",
   justifyContent: 'center',
    alignItems: 'center',
  }
});
export default CustomImage;


