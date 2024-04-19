import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../reduxToolkit/Store';
import PaymentsModal from '../Organisms/PaymentsModal';
import Toast from 'react-native-toast-message';

interface SubCardProps {
  item: any;
  x: any;
  index: number;
  size: number;
  spacer: number;
  userSubscribedStatus: string | null;
}

const SubCard: React.FC<SubCardProps> = ({
  item,
  x,
  index,
  size,
  spacer,
  userSubscribedStatus,
}) => {
  const navigator: any = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const activeColor = '#FAFAFA'; // Color when card is active
  const inactiveColor = 'white';
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

  const handlePayment = async (packageItem: any) => {
    if (token) {
      setSelectedPackage(packageItem);
      setPaymentModalOpen(true);
    }
  };

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
            <Text style={styles.PriceName}>{item.price}</Text>
            <Text style={styles.PriceDate}>{item.duration}</Text>
          </View>
        </View>

        <View style={styles.PackgeListsConatiner}>
          {item.packages.map((packageItem: any, index: number) => {
            const {available, packagesname} = packageItem;
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <View
                  style={
                    available
                      ? [styles.cIcon, styles.cIconActive]
                      : styles.cIcon
                  }>
                  <AntDesign name="check" size={15} color={'white'} />
                </View>
                <Text style={styles.listofPackagesText}>{packagesname}</Text>
              </View>
            );
          })}
        </View>
        <View style={[styles.Button]}>
          <TouchableOpacity
            style={[styles.listofPackagesBottom]}
            onPress={() =>
              !user ? navigator.navigate('Login') : handlePayment(item)
            }
            disabled={userSubscribedStatus === item.id}>
            <Text style={styles.listofPackagesBottomtext}>
              {userSubscribedStatus === item.id ? 'Current Plan' : 'Buy Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {paymentModalOpen && selectedPackage && (
        <PaymentsModal
          paymentModalOpen={paymentModalOpen}
          setPaymentModalOpen={setPaymentModalOpen}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
        />
      )}

      <Toast />
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.65,
    height: screenHeight * 0.65,
    paddingRight: 4,
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
    marginVertical: screenWidth * 0.03,
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
    fontSize: screenWidth * 0.06,
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
    textTransform: 'uppercase',
  },

  cIcon: {
    width: scale(15),
    height: scale(15),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B9B8C5',
  },
  cIconActive: {
    backgroundColor: 'green',
  },
});
export default SubCard;
