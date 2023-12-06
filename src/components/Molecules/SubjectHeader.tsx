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

interface SubjectHeaderProps {
  section: {
    unit: string;
    lesson: string;
    progress: number;
  };
  index: number;
  isActive: boolean;
  onPress: (index: number) => void;
}

const SubjectHeader: React.FC<SubjectHeaderProps> = ({
  section,
  index,
  isActive,
  onPress,
}) => {
  const toggleSection = () => {
    onPress(index);
  };

  return (
    <TouchableOpacity
      style={isActive ? styles.Activelcontainer : styles.INActivelcontainer}
      onPress={toggleSection}
      activeOpacity={0.8}>
      <View style={styles.imgContainer}>
        <ImageBackground
          style={styles.imagebg}
          source={require('./../../assets/Images/book.png')}>
          <Text>{''}</Text>
        </ImageBackground>
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.subject}>{section.unit}</Text>
          <Text style={styles.units}>{section.lesson}</Text>
        </View>
        <Ionicons
          name={isActive ? 'caret-up' : 'caret-down'}
          size={20}
          color="#333333"
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
    backgroundColor: '#FAFCFA',
    padding: '1%',
    marginBottom: 5,
    borderColor: 'lightgrey',
    borderBottomWidth: 0,
  },
  INActivelcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#FAFCFA',
    // padding: screenWidth * 0.01,
    marginBottom: screenHeight * 0.004,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: screenWidth * 0.02,
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
    width: '80%',
    padding: screenWidth * 0.02,
    flexDirection: 'row',
    borderTopEndRadius: screenWidth * 0.02,
    borderBottomEndRadius: screenWidth * 0.02,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subject: {
    fontSize: screenHeight * 0.02,
    fontFamily: 'PoppinsMedium',
    textTransform: 'capitalize',
    color: '#1E90FF',
  },
  units: {
    fontSize: screenHeight * 0.018,
    fontFamily: 'PoppinsMedium',
    textTransform: 'capitalize',
    color: '#858585',
    paddingVertical: screenHeight * 0.004,
  },
});
export default SubjectHeader;
