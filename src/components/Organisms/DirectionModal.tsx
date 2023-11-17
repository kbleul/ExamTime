import React from 'react';
import {Modal, StyleSheet, View, TouchableOpacity} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {screenWidth} from '../../utils/Data/data';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DirectionModal: React.FC<{
  direction: string | null;
  setDirection: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({direction, setDirection}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={direction === null ? false : true}
      onRequestClose={() => {
        setDirection(null);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.closeBtnContainer}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setDirection(null)}>
              <AntDesign name="close" size={screenWidth * 0.07} color="#000" />
            </TouchableOpacity>
          </View>
          <RenderHtml
            contentWidth={screenWidth - 80}
            source={{html: direction}}
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
  modalView: {
    flex: 1,
    paddingTop: 10,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
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
  },
  modalImageContaner: {
    width: '60%',
    height: 180,
    overflow: 'hidden',
    marginBottom: 10,
  },
  closeBtnContainer: {
    width: '100%',
    padding: 5,
  },
  closeBtn: {
    alignSelf: 'flex-end',
  },
});

export default DirectionModal;
