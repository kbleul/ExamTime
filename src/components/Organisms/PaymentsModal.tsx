import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import {PaymentMethods, screenHeight, screenWidth} from '../../utils/Data/data';
import AntDesign from 'react-native-vector-icons/AntDesign';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useNavigation} from '@react-navigation/native';

type methodType = {
  id: string;
  name: string;
  imgs: any[];
  youtubeLink: string;
  notes: string[];
};

const PaymentsModal: React.FC<{
  paymentModalOpen: boolean;
  setPaymentModalOpen: React.Dispatch<React.SetStateAction<any>>;
  selectedPackage: any;
}> = ({paymentModalOpen, setPaymentModalOpen, selectedPackage}) => {
  const navigator: any = useNavigation();

  const [paymentOption, setPaymentOption] = useState<methodType | null>(null);
  const [step, setStep] = useState(1);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={paymentModalOpen === null ? false : true}
      onRequestClose={() => {
        setPaymentModalOpen(null);
      }}>
      <View style={styles.centeredView}>
        <View
          style={
            step === 1
              ? styles.modalView
              : [styles.modalView, styles.modalViewBig]
          }>
          <View style={styles.closeBtnContainer}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setPaymentModalOpen(null)}>
              <AntDesign name="close" size={screenWidth * 0.05} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContentContainer}>
            <Text style={styles.title}>Payment Methods</Text>

            <View>
              {PaymentMethods.map(method => (
                <PaymentOptionCard
                  key={method.id}
                  method={method}
                  step={step}
                  paymentOption={paymentOption}
                  setPaymentOption={setPaymentOption}
                  setStep={setStep}
                />
              ))}
            </View>

            <TouchableOpacity
              style={
                !paymentOption
                  ? [styles.submitBtn, styles.submitBtnDisabled]
                  : [styles.submitBtn, step === 2 && styles.submitBtnNoMargin]
              }
              disabled={!paymentOption}
              onPress={() =>
                step === 2 &&
                navigator.navigate('Checkout', {
                  paymentOption,
                  subscriptionPackage: selectedPackage,
                })
              }>
              <Text style={styles.submitBtnText}>Proceed</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const PaymentOptionCard = ({
  method,
  step,
  paymentOption,
  setPaymentOption,
  setStep,
}: {
  method: methodType;
  step: number;
  paymentOption: methodType | null;
  setPaymentOption: React.Dispatch<React.SetStateAction<methodType | null>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <View
      style={
        step === 2 &&
        paymentOption &&
        paymentOption.id === method.id &&
        optionStyles.wrapper
      }>
      <TouchableOpacity
        style={optionStyles.container}
        onPress={() => {
          setPaymentOption(method);
          setStep(2);
        }}>
        <View style={optionStyles.subContainer}>
          <View
            style={
              paymentOption && paymentOption.id === method.id
                ? [optionStyles.circle, optionStyles.circleSelected]
                : optionStyles.circle
            }>
            {paymentOption && paymentOption.id === method.id && (
              <View style={optionStyles.smallCircle} />
            )}
          </View>
          <Text style={optionStyles.nameStyle}>{method.name}</Text>
        </View>

        <View style={optionStyles.imageContainer}>
          <Image
            style={optionStyles.image}
            source={method.imgs[0]}
            resizeMode="cover"
          />
          {method.imgs.length > 1 && (
            <Image
              style={optionStyles.imageSecondary}
              source={method.imgs[1]}
              resizeMode="cover"
            />
          )}
        </View>
      </TouchableOpacity>
      {step === 2 && paymentOption && paymentOption.id === method.id && (
        <PaymentInstructions method={method} />
      )}
    </View>
  );
};

const PaymentInstructions = ({method}: {method: methodType}) => {
  const youtubeVidId = method.youtubeLink.includes('?v=')
    ? method.youtubeLink.split('?v=')[1].split('&')[0]
    : null;

  return (
    <View>
      {youtubeVidId && (
        <View style={instructionsStyle.videoContainer}>
          <ActivityIndicator style={instructionsStyle.loading} />
          <YoutubePlayer height={180} play={false} videoId={youtubeVidId} />
        </View>
      )}

      {method.notes.map((note, index) => (
        <View
          key={index + '--notes-ins---'}
          style={instructionsStyle.notesContainerTop}>
          <View style={instructionsStyle.circle} />

          <View key={'note--' + index} style={instructionsStyle.notesContainer}>
            <Text
              style={
                index === method.notes.length - 1
                  ? [
                      instructionsStyle.noteText,
                      instructionsStyle.noteTextBorderless,
                    ]
                  : instructionsStyle.noteText
              }>
              {note}
            </Text>
          </View>
        </View>
      ))}
    </View>
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
  modalViewBig: {
    height: screenHeight,
    marginTop: 100,
  },
  closeBtnContainer: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.06,
  },

  scrollContainer: {
    paddingHorizontal: screenWidth * 0.09,
    width: '100%',
  },
  scrollContentContainer: {
    paddingBottom: 100,
    justifyContent: 'space-between',
  },
  closeBtn: {
    alignSelf: 'flex-end',
  },
  title: {
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
    fontSize: screenWidth * 0.045,
    fontFamily: 'PoppinsBold',
  },
  submitBtn: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 30,
    marginTop: 180,
  },
  submitBtnNoMargin: {
    marginTop: 30,
  },
  submitBtnDisabled: {
    backgroundColor: 'gray',
  },
  submitBtnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: screenWidth * 0.035,
    fontFamily: 'PoppinsSemiBold',
  },
});

const optionStyles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    borderColor: '#1E90FF',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 10,
  },
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 25,
  },
  circle: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleSelected: {
    borderColor: '#1E90FF',
  },
  smallCircle: {
    width: 12,
    height: 12,
    backgroundColor: '#1E90FF',
    borderRadius: 100,
  },
  nameStyle: {
    color: 'black',
    fontSize: screenWidth * 0.045,
    fontFamily: 'PoppinsRegular',
    paddingTop: 3,
  },
  imageContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 5,
  },
  image: {
    width: 40,
    height: 40,
  },
  imageSecondary: {
    width: 120,
    height: 50,
  },
});

const instructionsStyle = StyleSheet.create({
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
    marginBottom: 10,
  },
  loading: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
  notesContainerTop: {
    position: 'relative',
    marginTop: 5,
  },
  notesContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden',
    marginHorizontal: 4,
    borderLeftWidth: 1,
    borderLeftColor: '#1E90FF',
    borderStyle: 'dashed',
  },
  noteText: {
    color: '#000',
    fontSize: screenWidth * 0.034,
    fontFamily: 'PoppinsBold',
    width: '90%',
    paddingVertical: 1,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    marginLeft: 10,
  },
  noteTextBorderless: {
    borderBottomWidth: 0,
  },
  circle: {
    width: 10,
    height: 10,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: '#1E90FF',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 300,
  },
  dashed: {
    borderLeftWidth: 2,
    borderColor: '#1E90FF',
    borderStyle: 'dashed',
  },
});

export default PaymentsModal;
