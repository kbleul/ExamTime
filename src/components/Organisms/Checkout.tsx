import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BackWithItem from './BackWithItem';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import {Dropdown} from 'react-native-element-dropdown';
import {formStyles} from '../../screens/Auth/Signup/Styles';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useMakeBankPaymentMutation} from '../../reduxToolkit/Services/auth';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {RootState} from '../../reduxToolkit/Store';
import {handleBankPayment} from '../../utils/Functions/Helper';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import PaymentSuccessfullModal from '../Molecules/PaymentSuccessfullModal';

type CheckoutDataType = {
  depositedByName: string;
  referenceNo: string;
};

export const genderOptions = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
];

const Checkout = ({route}: {route: any}) => {
  const navigator: any = useNavigation();

  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const {paymentOption, subscriptionPackage} = route.params;

  const allPackages = subscriptionPackage.allPackages.flatMap((item: any) => {
    return {
      label: item.subscriptionPlan,
      value: item.id,
      price: item.price,
    };
  });
  allPackages.forEach(item => {});

  const [isFocusGender, setIsFocusGender] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [refrenceNumber, setRefrenceNumber] = useState<string | null>(null);

  const [selectedPackage, setSelectedPackage] = useState<any>(
    allPackages.find(item => item.value === subscriptionPackage.id),
  );

  const [makeBankPayment, {isLoading, error}] = useMakeBankPaymentMutation();

  const schema = yup.object().shape({
    depositedByName: yup.string().required('Deposited by is required.'),
    referenceNo: yup.string().required('Refrence number is required.'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<CheckoutDataType>({
    resolver: yupResolver(schema),
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}>
      <View>
        <BackWithItem type="Pay" isTrial={false} />
      </View>

      <View style={styles.topContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Payment Method</Text>
          <Text style={styles.infoText}>{paymentOption.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Name</Text>
          <Text style={styles.infoText}>
            {user?.firstName + ' ' + user?.lastName}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Phone Number</Text>
          <Text style={styles.infoText}>{user?.phoneNumber}</Text>
        </View>
      </View>

      <View style={styles.packageContainer}>
        <Text style={styles.packageTitle}>Payment amount</Text>
        <View style={styles.packageSubContainer}>
          <Text style={styles.packageAmout}>
            {selectedPackage.price}
            <Text style={[styles.packageAmout, styles.packageAmoutSuffix]}>
              birr
            </Text>
          </Text>

          <View style={styles.packageSelector}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={formStyles.placeholderStyle}
              selectedTextStyle={formStyles.selectedTextStyle}
              inputSearchStyle={formStyles.inputSearchStyle}
              itemTextStyle={formStyles.itemListStyle}
              iconStyle={formStyles.iconStyle}
              data={allPackages}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocusGender ? 'Select package' : '...'}
              search={false}
              value={selectedPackage}
              onFocus={() => setIsFocusGender(true)}
              onBlur={() => setIsFocusGender(false)}
              onChange={item => {
                setSelectedPackage(item);
                setIsFocusGender(false);
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.formContainer}>
        <View style={formStyles.inputContainer}>
          <Text style={[formStyles.label, styles.label]}>Deposited by</Text>
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <TextInput
                style={[formStyles.input, styles.input]}
                onChangeText={onChange}
                placeholder=""
                placeholderTextColor={'#d4d4d4'}
              />
            )}
            name="depositedByName"
          />
          {errors.depositedByName ? (
            <Text style={formStyles.error}>
              {errors.depositedByName.message} *
            </Text>
          ) : (
            <Text style={formStyles.error}>{''}</Text>
          )}
        </View>

        <View style={formStyles.inputContainer}>
          <Text style={styles.label}>Reference Number</Text>
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <TextInput
                style={[formStyles.input, styles.input]}
                onChangeText={onChange}
                placeholder=""
                placeholderTextColor={'#d4d4d4'}
              />
            )}
            name="referenceNo"
          />
          {errors.referenceNo ? (
            <Text style={formStyles.error}>{errors.referenceNo.message} *</Text>
          ) : (
            <Text style={formStyles.error}>{''}</Text>
          )}
        </View>

        {error && error.data && error.data.message ? (
          <Text style={[formStyles.error, styles.error]}>
            * {error.data.message}
          </Text>
        ) : (
          <Text style={formStyles.error}>{''}</Text>
        )}

        <View
          style={[formStyles.submitBtnContainer, styles.submitBtnContainer]}>
          <TouchableOpacity
            style={[formStyles.submitBtn, styles.submitBtn]}
            touchSoundDisabled
            onPress={handleSubmit(data => {
              handleBankPayment(
                makeBankPayment,
                data.depositedByName,
                data.referenceNo,
                paymentOption.name,
                token,
                selectedPackage.value,
                navigator,
                Toast,
                setShowSuccessModal,
                setRefrenceNumber,
              );
            })}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color={'#FFF'} />
            ) : (
              <Text style={formStyles.submitText}>Checkout</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {showSuccessModal && refrenceNumber && (
        <PaymentSuccessfullModal
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
          refrenceNumber={refrenceNumber}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerContent: {
    paddingBottom: 100,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  topContainer: {
    paddingTop: screenHeight * 0.01,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#ECEDED',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 7,
  },
  infoTitle: {
    color: '#838383',
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.042,
    width: '50%',
  },
  infoText: {
    color: '#000',
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.042,
    width: '50%',
  },
  packageContainer: {
    marginTop: screenHeight * 0.04,
    paddingLeft: 20,
    paddingRight: 25,
  },
  packageTitle: {
    color: '#000',
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.045,
  },
  packageSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  packageAmout: {
    width: '50%',
    color: '#000',
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.09,
  },
  packageAmoutSuffix: {
    fontSize: screenWidth * 0.045,
  },
  packageSelector: {
    width: '50%',
  },
  dropdown: {
    height: 42,
    borderColor: '#000',
    borderWidth: 0.5,
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 8,
    textTransform: 'uppercase',
    color: '#d4d4d4',
  },
  formContainer: {
    marginTop: screenHeight * 0.04,
    paddingHorizontal: 20,
  },
  label: {
    color: '#838383',
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.04,
    marginBottom: 6,
  },
  input: {
    borderColor: '#7A7A7A',
  },
  checkContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: screenWidth * 0.02,
  },
  checkText: {
    color: '#1E90FF',
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.035,
    marginLeft: 10,
  },
  submitBtn: {
    width: '100%',
  },
  submitBtnContainer: {
    marginTop: screenHeight * 0.04,
  },
  error: {
    marginTop: screenHeight * 0.04,
    fontFamily: 'PoppinsSemiBold',
  },
});

export default Checkout;
