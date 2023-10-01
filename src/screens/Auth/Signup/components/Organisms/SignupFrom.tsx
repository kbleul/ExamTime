import React, {useEffect, useState, useCallback} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {formStyles} from '../../Styles';
import {seterProps} from '../../Types';
import {useNavigation} from '@react-navigation/native';

type FormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: 'Male' | 'Female';
};

type regionItemsType = {
  label: string;
  value: string;
};

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .test('phone-number-start', 'Phone number must start with 7 or 9', value =>
      /^[79]/.test(value),
    )
    .test(
      'phone-number-isNumber',
      'Invalid phone number digits',
      function (value) {
        const restOfDigits = value.substring(1);
        return /^\d+$/.test(restOfDigits);
      },
    )
    .test(
      'phone-number-length',
      'Phone number must be 9 digits long',
      value => value?.length === 9,
    ),
  email: yup.string().email('Invalid email address'),
});

const genderOptions = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
];

const SignupForm: React.FC<seterProps> = ({setCurrentStep, setUser}) => {
  const navigator = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const validate_Gender_and_Region = () => {
    if (!gender || !region) {
      !gender && setGenderError('Gender is required');
      !region && setRegionError('Region is required');

      return false;
    }
    return true;
  };

  const onSubmit = async (data: FormData) => {
    setSignupError(null);
    if (validate_Gender_and_Region()) {
      try {
        setIsLoading(true);
        const timeoutMs = 10000; // Set your desired timeout in milliseconds (e.g., 10 seconds)

        const controller = new AbortController();
        const signal = controller.signal;

        const timeout = setTimeout(() => {
          controller.abort(); // Abort the fetch request on timeout
        }, timeoutMs);

        const url = 'https://dev.think-hubet.com/user/create';
        const requestBody = {
          ...data,
          region: region?.toLowerCase(),
          gender: gender?.toUpperCase(),
          grade: 'grade_8',
        };

        requestBody.phoneNumber = '+251' + data.phoneNumber;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
          signal, // Pass the abort signal to the fetch request
        });
        console.log('dddd');

        clearTimeout(timeout); // Clear the timeout since the request completed

        if (!response.ok) {
          console.log('ddddz', response.status, requestBody);

          throw new Error('Faild to register user');
        }

        const responseData = await response.json();
        console.log('Form submitted successfully:', responseData);
        setCurrentStep(prev => ++prev);
        setUser(responseData.user);
        setIsLoading(false);
      } catch (error) {
        if (
          error instanceof Error &&
          (error.message === 'Failed to register user' ||
            error.message === 'Faild to register user')
        ) {
          setSignupError('Phone number is already registered');
        }
        console.log('Error:', error.message, 'Failed to register user');
        setIsLoading(false);
        if (
          error instanceof TypeError &&
          (error.message === 'Network request failed' ||
            error.message === 'AbortError')
        ) {
          navigator.navigate('network-error');
        }
      }
    }
  };

  const [refetchRegions, setRefetchRegions] = useState(false);
  const [regionsListItems, setRegionsListItems] = useState<
    regionItemsType[] | []
  >([]);
  const [isLoadingRegions, setIsLoadingRegions] = useState(true);
  const [signupError, setSignupError] = useState<string | null>(null);

  const [gender, setGender] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [genderError, setGenderError] = useState<string | null>(null);
  const [regionError, setRegionError] = useState<string | null>(null);

  const [isFocusGender, setIsFocusGender] = useState(false);
  const [isFocusRegion, setIsFocusRegion] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const fetchRegions = useCallback(async () => {
    try {
      const url = 'https://dev.think-hubet.com/region/region'; // Replace with your API endpoint
      const timeoutMs = 10000; // Set your desired timeout in milliseconds (e.g., 10 seconds)

      const controller = new AbortController();
      const signal = controller.signal;

      const timeout = setTimeout(() => {
        controller.abort(); // Abort the fetch request on timeout
      }, timeoutMs);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal, // Pass the abort signal to the fetch request
      });

      clearTimeout(timeout); // Clear the timeout since the request completed

      if (!response.ok) {
        console.log('HTTP Error:', response.status, response.statusText);
        throw new Error('HTTP Error'); // You can throw a custom error if needed
      }

      const responseData = await response.json();
      console.log('Regions fetched successfully:', responseData);

      const tempRegionsList: regionItemsType[] = [];

      responseData.map((region: {region: string}) => {
        tempRegionsList.push({
          label: region.region.toUpperCase(),
          value: region.region.toUpperCase(),
        });
      });

      setRegionsListItems([...tempRegionsList]);
      setIsLoadingRegions(false);
      setSignupError(null);
    } catch (error: any) {
      if (
        error instanceof TypeError &&
        (error.message === 'Network request failed' ||
          error.message === 'AbortError')
      ) {
        navigator.navigate('network-error');
        setRefetchRegions(prev => !prev);
        setSignupError(null);
      }

      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchRegions();
  }, [refetchRegions, fetchRegions]);

  return (
    <View style={formStyles.container}>
      <View style={formStyles.inputContainer}>
        <Text style={formStyles.label}>First Name</Text>
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <TextInput
              style={formStyles.input}
              onChangeText={onChange}
              placeholder="First name"
              placeholderTextColor={'#d4d4d4'}
            />
          )}
          name="firstName"
        />
        {errors.firstName ? (
          <Text style={formStyles.error}>{errors.firstName.message} *</Text>
        ) : (
          <Text style={formStyles.error}>{''}</Text>
        )}
      </View>

      <View style={formStyles.inputContainer}>
        <Text style={formStyles.label}>Last Name</Text>
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <TextInput
              style={formStyles.input}
              onChangeText={onChange}
              placeholder="Last name"
              placeholderTextColor={'#d4d4d4'}
            />
          )}
          name="lastName"
        />
        {errors.lastName ? (
          <Text style={formStyles.error}>{errors.lastName.message} *</Text>
        ) : (
          <Text style={formStyles.error}>{''}</Text>
        )}
      </View>

      <View style={formStyles.inputContainer}>
        <Text style={formStyles.label}>Phone Number</Text>
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <View style={formStyles.phoneContainer}>
              <Text style={formStyles.phoneSmallBox}>+251</Text>
              <TextInput
                keyboardType="numeric"
                style={[formStyles.input, formStyles.inputPhone]}
                onChangeText={onChange}
                placeholder="*********"
                placeholderTextColor={'#d4d4d4'}
              />
            </View>
          )}
          name="phoneNumber"
        />
        {errors.phoneNumber ? (
          <Text style={formStyles.error}>{errors.phoneNumber.message} *</Text>
        ) : (
          <Text style={formStyles.error}>{''}</Text>
        )}
      </View>

      <View style={formStyles.inputContainer}>
        <Text style={formStyles.label}>Email</Text>
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <TextInput
              style={formStyles.input}
              onChangeText={onChange}
              placeholder="example@gmail.com"
              placeholderTextColor={'#d4d4d4'}
            />
          )}
          name="email"
        />
        {errors.email ? (
          <Text style={formStyles.error}>{errors.email.message} *</Text>
        ) : (
          <Text style={formStyles.error}>{''}</Text>
        )}
      </View>

      <View style={formStyles.inputContainer}>
        <Text style={formStyles.label}>Gender</Text>

        <Dropdown
          style={[formStyles.dropdown, isFocusGender && {borderColor: 'blue'}]}
          placeholderStyle={formStyles.placeholderStyle}
          selectedTextStyle={formStyles.selectedTextStyle}
          inputSearchStyle={formStyles.inputSearchStyle}
          itemTextStyle={formStyles.itemListStyle}
          iconStyle={formStyles.iconStyle}
          data={genderOptions}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusGender ? 'Select gender' : '...'}
          searchPlaceholder="Search..."
          value={gender}
          onFocus={() => setIsFocusGender(true)}
          onBlur={() => setIsFocusGender(false)}
          onChange={item => {
            setGender(item.value);
            setIsFocusGender(false);
          }}
        />
        {genderError && !gender ? (
          <Text style={formStyles.error}>Gender is required *</Text>
        ) : (
          <Text style={formStyles.error}>{''}</Text>
        )}
      </View>

      <View style={formStyles.inputContainer}>
        <Text style={formStyles.label}>Region</Text>

        {isLoadingRegions && (
          <View style={formStyles.loadingContainer}>
            <ActivityIndicator size={14} />
            <Text style={formStyles.loadingText}>Loading regions ...</Text>
          </View>
        )}
        <Dropdown
          style={[formStyles.dropdown, isFocusRegion && {borderColor: 'blue'}]}
          placeholderStyle={formStyles.placeholderStyle}
          selectedTextStyle={formStyles.selectedTextStyle}
          inputSearchStyle={formStyles.inputSearchStyle}
          itemTextStyle={formStyles.itemListStyle}
          iconStyle={formStyles.iconStyle}
          data={regionsListItems}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusRegion ? 'Select region' : '...'}
          searchPlaceholder="Search..."
          value={region}
          onFocus={() => setIsFocusRegion(true)}
          onBlur={() => setIsFocusRegion(false)}
          onChange={item => {
            setRegion(item.value);
            setIsFocusRegion(false);
          }}
        />
        {regionError && !region ? (
          <Text style={formStyles.error}>Region is required *</Text>
        ) : (
          <Text style={formStyles.error}>{''}</Text>
        )}
      </View>

      {signupError && <Text style={formStyles.error}>{signupError}</Text>}
      <View style={formStyles.submitBtnContainer}>
        <TouchableOpacity
          style={formStyles.submitBtn}
          touchSoundDisabled
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color={'#FFF'} />
          ) : (
            <Text style={formStyles.submitText}>Next</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupForm;
