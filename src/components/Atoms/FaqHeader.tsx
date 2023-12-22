import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import {scale} from 'react-native-size-matters';

interface SubjectHeaderProps {
  faqQuestion: {
    id: string;
    ques: string;
  };
  index: number;
  isActive: boolean;
  onPress: (index: number) => void;
}

const FaqHeader: React.FC<SubjectHeaderProps> = ({
  faqQuestion,
  index,
  isActive,
  onPress,
}) => {
  const toggleSection = () => {
    onPress(index);
  };

  return (
    <TouchableOpacity
      style={[styles.container, {borderBottomWidth: isActive ? 0 : 1}]}
      onPress={toggleSection}
      activeOpacity={0.8}>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.subject}>{faqQuestion.ques}</Text>
        </View>
      </View>
      <View
        style={[
          styles.iconContainer,
          {borderColor: isActive ? '#3C3D6E' : '#CECECF'},
        ]}>
        <Ionicons
          name={isActive ? 'chevron-down-outline' : 'chevron-up-outline'}
          size={20}
          color={isActive ? '#333333' : '#CECECF'}
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  Activelcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // backgroundColor: '#FAFCFA',
    padding: '1%',
    marginBottom: 5,
    borderColor: 'lightgrey',
    borderBottomWidth: 0,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: screenHeight * 0.004,
    borderColor: '#CACAD3',
    borderBottomWidth: 1,
    borderRadius: screenWidth * 0.02,
    paddingVertical: 10,
  },
  imgContainer: {
    width: '20%',
    padding: screenWidth * 0.02,
  },
  imagebg: {
    height: screenHeight * 0.089,
    objectFit: 'cover',
  },
  infoContainer: {
    paddingHorizontal: '2%',
    padding: screenWidth * 0.02,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subject: {
    fontSize: screenHeight * 0.022,
    fontFamily: 'PoppinsSemiBold',
    textTransform: 'capitalize',
    color: 'black',
  },
  units: {
    fontSize: screenHeight * 0.018,
    fontFamily: 'PoppinsMedium',
    textTransform: 'capitalize',
    color: '#858585',
    paddingVertical: screenHeight * 0.004,
  },
  iconContainer: {
    height: scale(22),
    width: scale(22),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1.5,
  },
});
export default FaqHeader;
