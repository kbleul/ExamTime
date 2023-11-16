import React from 'react';
import { View, TouchableOpacity, Text, ImageBackground, StyleSheet } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { screenWidth } from '../../utils/Data/data';

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
      activeOpacity={0.8}
    >
      <View style={styles.imgContainer}>
        <ImageBackground
          style={styles.imagebg}
          source={require('./book.png')}
        >
          <Text>{''}</Text>
        </ImageBackground>
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.subject}>{section.unit}</Text>
          <Text style={styles.units}>{section.lesson} units</Text>
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
    lcontainer: {
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#FAFCFA',
        padding: '1%',
        marginBottom: 5,
        width: screenWidth - 20,
        borderColor: "lightgrey",
        borderWidth: 1,
        borderRadius: 10,
    
      },
      Activelcontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#FAFCFA',
        padding: '1%',
        marginBottom: 5,
        borderColor: "lightgrey",
         borderBottomWidth: 0
      },
      INActivelcontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#FAFCFA',
        padding: '1%',
        marginBottom: 5,
        borderColor: "lightgrey",
        borderWidth: 1,
        borderRadius:10,
      },
      imgContainer: {
        width: '20%',
        padding: 8,
      },
      imagebg: {
        height: 60,
        objectFit: "cover",
      },
      infoContainer: {
        width: '80%',
        padding: 10,
        flexDirection: "row",
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,
        alignItems: "center",
        justifyContent: 'space-between',
      },
      subject: {
        fontSize: 18,
        fontFamily: 'PoppinsMedium',
        textTransform: 'capitalize',
        color: '#1E90FF',
      },
      units: {
        fontSize: 16,
        fontFamily: 'PoppinsMedium',
        textTransform: 'capitalize',
        color: '#858585',
        paddingVertical: 2,
      },
  });
export default SubjectHeader;