import React from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TipType} from '../../types';

const AllTipsModal = ({
  showTipsModal,
  setShowTipsModal,
  tips,
}: {
  showTipsModal: boolean;
  setShowTipsModal: React.Dispatch<React.SetStateAction<boolean>>;
  tips: TipType[];
}) => {
  const renderItem = ({item}: {item: TipType}) => {
    return (
      <View style={styles.container}>
        <Text style={styles.typeText}>{item.tipType}</Text>
        <Text style={styles.subtitle}>
          TIPS & TRICKS FOR {item.tipType} Exam and Study
        </Text>

        <Text style={styles.tip}>{item.tip}</Text>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showTipsModal}
      onRequestClose={() => {
        setShowTipsModal(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            touchSoundDisabled
            style={styles.icon}
            onPress={() => setShowTipsModal(false)}>
            <AntDesign name="close" size={25} color="#000" />
          </TouchableOpacity>
          <FlatList
            keyExtractor={(item, index) => item.id + 'tip' + index}
            data={[...tips]}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
  },
  scrollContainer: {
    overflow: 'hidden',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    paddingVertical: screenHeight * 0.04,
    position: 'relative',
  },
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  icon: {
    position: 'absolute',
    right: 18,
    top: 18,
    padding: 5,
  },
  typeText: {
    fontFamily: 'PoppinsBold',
    fontSize: screenWidth * 0.04,
    color: 'black',
    marginTop: 30,
  },
  subtitle: {
    fontFamily: 'PoppinsBold',
    fontSize: screenWidth * 0.035,
    color: 'black',
    marginTop: 5,
  },
  tip: {
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.035,
    color: 'black',
    textAlign: 'left',
  },
});

export default AllTipsModal;
