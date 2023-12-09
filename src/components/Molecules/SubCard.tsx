import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {screenHeight, screenWidth} from '../../utils/Data/data';

interface SubCardProps {
  item: any;
  x: any;
  index: number;
  size: number;
  spacer: number;
}

const SubCard: React.FC<SubCardProps> = ({item, x, index, size, spacer}) => {
  const activeColor = 'white'; // Color when card is active
  const inactiveColor = '#f4f0ec';
  const activeColorBorder = '#ED7218'; // Color when card is active
  const inactiveColorBorder = 'grey';

  const style = useAnimatedStyle(() => {
    const currentIndex = Math.round(x.value / size);
    const isActive = currentIndex === index - 1;
    const scale = withSpring(isActive ? 1 : 0.8, {damping: 6, stiffness: 80});

    return {
      transform: [{scale}],
      borderColor: isActive
        ? withSpring(activeColorBorder)
        : withSpring(inactiveColorBorder),
      borderWidth: isActive ? 5 : 1,
      backgroundColor: isActive
        ? withSpring(activeColor)
        : withSpring(inactiveColor),
    };
  });
  if (!item.planname) {
    return <View style={{width: spacer}} key={index} />;
  }
  return (
    <View style={{width: size}} key={index}>
      <Animated.View style={[styles.card, style]}>
        <View style={styles.popularContainer}>
          <Text style={styles.popularText}>Popular</Text>
        </View>
        <View style={styles.CardHeaderText}>
          <Text style={styles.cardName}>{item.planname}</Text>
          <View style={styles.PriceContainer}>
            <Text style={styles.PriceName}>200 Birr</Text>
            <Text style={styles.PriceDate}>/6 Month</Text>
          </View>
        </View>
        <View style={styles.PackgeListsConatiner}>
          {item.packages.map((packageItem, index) => {
            const {available, packagesname} = packageItem;
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <AntDesign
                  name="checkcircle"
                  size={18}
                  color="#cccccc"
                  style={{marginRight: 5}}
                />
                <Text style={styles.listofPackagesText}>{packagesname}</Text>
              </View>
            );
          })}
        </View>
        <View style={[styles.Button]}>
          <TouchableOpacity style={[styles.listofPackagesBottom]}>
            <Text style={styles.listofPackagesBottomtext}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.65,
    height: screenHeight * 0.56,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ED7218',
    position: 'relative',
  },
  popularContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: -2,
    right: -2,
    backgroundColor: '#ED7218',
    paddingHorizontal: screenWidth * 0.015,
    borderBottomLeftRadius: 10,
  },
  popularText: {
    color: 'white',
    fontSize: screenWidth * 0.03,
    fontFamily: 'PoppinsSemiBold',
  },
  listofPackagesText: {
    color: '#656565',
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.032,
    textAlign: 'left',
    marginLeft: 4,
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
    overflow: 'hidden',
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
    marginVertical: screenWidth * 0.05,
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
});
export default SubCard;
