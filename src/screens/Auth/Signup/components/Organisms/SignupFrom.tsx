import React, {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {formStyles} from '../../Styles';

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

const SignupForm = () => {
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
    if (validate_Gender_and_Region()) {
      try {
        console.log('object', gender, region);

        const url = 'https://dev.think-hubet.com/user/create'; // Replace with your API endpoint

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
        });

        if (!response.ok) {
          console.log('not ok');
        }

        const responseData = await response.json();
        console.log('Form submitted successfully:', responseData);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };
  const [regionsListItems, setRegionsListItems] = useState<
    regionItemsType[] | []
  >([]);

  const [gender, setGender] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [genderError, setGenderError] = useState<string | null>(null);
  const [regionError, setRegionError] = useState<string | null>(null);

  const [isFocusGender, setIsFocusGender] = useState(false);
  const [isFocusRegion, setIsFocusRegion] = useState(false);

  const fetchRegions = async () => {
    try {
      const url = 'https://dev.think-hubet.com/region/region'; // Replace with your API endpoint

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.log('not ok');
      }

      const responseData = await response.json();
      console.log('regions fetched successfully:', responseData);

      const tempRegionsList: regionItemsType[] = [];

      responseData.map((region: {region: string}) => {
        tempRegionsList.push({
          label: region.region.toUpperCase(),
          value: region.region.toUpperCase(),
        });
      });

      setRegionsListItems([...tempRegionsList]);
    } catch (error) {
      console.error('Error FETCHING regions:', error);
    }
  };

  useEffect(() => {
    fetchRegions();
  }, []);

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
                style={[formStyles.input, formStyles.inputPhone]}
                onChangeText={onChange}
                placeholder="*********"
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

        <Dropdown
          style={[formStyles.dropdown, isFocusRegion && {borderColor: 'blue'}]}
          placeholderStyle={formStyles.placeholderStyle}
          selectedTextStyle={formStyles.selectedTextStyle}
          inputSearchStyle={formStyles.inputSearchStyle}
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

      <TouchableOpacity
        style={formStyles.submitBtn}
        touchSoundDisabled
        onPress={handleSubmit(onSubmit)}>
        <Text style={formStyles.submitText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupForm;
