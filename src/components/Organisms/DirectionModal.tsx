import React, {useRef} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  PanResponder,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import AntDesign from 'react-native-vector-icons/AntDesign';

const tagsStylesQuestion = {
  p: {
    whiteSpace: 'normal',
    color: '#000',
    textAlign: 'left',
    width: screenWidth * 0.8,
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    lineHeight: 25,
  },
  img: {
    width: screenWidth * 0.8,
    marginTop: 5,
  },
};

const DirectionModal: React.FC<{
  direction: string | null;
  setDirection: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({direction, setDirection}) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 150) {
          // User has swiped down, close the modal
          setDirection(null);
        } else {
          // Animate the modal back to its initial position
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  console.log(direction);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={direction === null ? false : true}
      onRequestClose={() => {
        setDirection(null);
      }}>
      <TouchableWithoutFeedback onPress={() => setDirection(null)}>
        <View style={styles.centeredView}>
          <Animated.View
            style={[styles.modalView, {transform: [{translateY: pan.y}]}]}
            {...panResponder.panHandlers}>
            <View style={styles.closeBtnContainer}>
              <View style={styles.indicator} />
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setDirection(null)}>
                <AntDesign
                  name="close"
                  size={screenWidth * 0.05}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <RenderHtml
              contentWidth={screenWidth - 80}
              source={{html: direction}}
              tagsStyles={tagsStylesQuestion}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
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
    position: 'relative',
  },
  modalView: {
    minHeight: (screenHeight * 1.2) / 2,
    height: (screenHeight * 1.2) / 2,
    marginTop: (screenHeight * 0.8) / 2,
    paddingTop: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    overflow: 'hidden',
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
    width: '100%',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: screenWidth / 4,
    height: 5,
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: '#b3afa6',
  },
  closeBtn: {
    alignSelf: 'flex-end',
  },
});

export default DirectionModal;
