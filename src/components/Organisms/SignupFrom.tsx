import React, {useEffect, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {SignupDataType, seterProps} from '../../types';
import {
  useCreateUserMutation,
  useGetRegionsMutation,
} from '../../reduxToolkit/Services/auth';
import {fetchRegions, handleCreateUser} from '../../screens/Auth/Signup/Logic';
import {formStyles} from '../../screens/Auth/Signup/Styles';
import {AuthContext} from '../../Realm/model';
import {Grade, UserData} from '../../Realm';

const getGrades = (savedGrades: Results<Grade>): {grade: string}[] => {
  const uniqueArray = [];
  const uniqueNames: any = {};

  for (const gradeObj of savedGrades) {
    const name = gradeObj.grade;
    if (!uniqueNames[name]) {
      uniqueArray.push(gradeObj);
      uniqueNames[name] = true;
    }
  }
  return uniqueArray;
};
const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .matches(
      /^[A-Za-z\s]+$/,
      'First name should only contain letters and spaces',
    ),
  lastName: yup
    .string()
    .required('Last name is required')
    .matches(
      /^[A-Za-z\s]+$/,
      'Last name should only contain letters and spaces',
    ),
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

export const genderOptions = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
];

const SignupForm: React.FC<seterProps> = ({
  setCurrentStep,
  setUnregisteredUser,
}) => {
  const navigator = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignupDataType>({
    resolver: yupResolver(schema),
  });

  const [refetchRegions, setRefetchRegions] = useState(false);
  const [regionsListItems, setRegionsListItems] = useState<
    regionItemsType[] | []
  >([]);
  // const [isLoadingRegions, setIsLoadingRegions] = useState(true);

  const [gender, setGender] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [grade, setGrade] = useState<string | null>(null);

  const [genderError, setGenderError] = useState<string | null>(null);
  const [regionError, setRegionError] = useState<string | null>(null);

  const [isFocusGender, setIsFocusGender] = useState(false);
  const [isFocusRegion, setIsFocusRegion] = useState(false);

  const [createUser, {isLoading, isError, error}] = useCreateUserMutation();
  const [
    getRegions,
    {isLoading: isLoadingRegions, isError: isErrorRegion, error: errorRegion},
  ] = useGetRegionsMutation();

  const {useQuery} = AuthContext;

  const savedUserData = useQuery(UserData);

  const savedGrades = useQuery(Grade);

  useEffect(() => {
    fetchRegions(getRegions, setRegionsListItems, navigator);
  }, [getRegions, refetchRegions, fetchRegions, navigator]);

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
                placeholder="Enter Mobile Number"
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

      <View style={formStyles.inputContainerGrade}>
        <View style={formStyles.inputContainer}>
          <Text style={formStyles.label}>Grade </Text>

          <Dropdown
            style={[
              formStyles.dropdown,
              isFocusRegion && {borderColor: 'blue'},
            ]}
            placeholderStyle={formStyles.placeholderStyle}
            selectedTextStyle={formStyles.selectedTextStyle}
            inputSearchStyle={formStyles.inputSearchStyle}
            itemTextStyle={formStyles.itemListStyle}
            iconStyle={formStyles.iconStyle}
            data={[...getGrades(savedGrades)]}
            search
            maxHeight={300}
            labelField="grade"
            valueField="grade"
            placeholder={!isFocusRegion ? 'Select Grade' : '...'}
            searchPlaceholder="Search grades"
            value={grade}
            onFocus={() => setIsFocusRegion(true)}
            onBlur={() => setIsFocusRegion(false)}
            onChange={item => {
              setGrade(item.grade);
              setIsFocusRegion(false);
            }}
          />

          {!grade ? (
            <Text style={formStyles.error}>Grade is required *</Text>
          ) : (
            <Text style={formStyles.error}>{''}</Text>
          )}
        </View>

        {error && <Text style={formStyles.error}>{error?.data?.message}</Text>}
        {errorRegion && (
          <Text style={formStyles.error}>{errorRegion?.data?.message}</Text>
        )}
      </View>

      <View style={formStyles.flexedInput}>
        <View style={formStyles.inputContainerFlexed}>
          <Text style={formStyles.label}>Gender</Text>

          <Dropdown
            style={[
              formStyles.dropdown,
              isFocusGender && {borderColor: 'blue'},
            ]}
            placeholderStyle={formStyles.placeholderStyle}
            selectedTextStyle={formStyles.selectedTextStyle}
            inputSearchStyle={formStyles.inputSearchStyle}
            itemTextStyle={formStyles.itemListStyle}
            iconStyle={formStyles.iconStyle}
            data={genderOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocusGender ? 'Select gender' : '...'}
            search={false}
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

        <View style={formStyles.inputContainerFlexed}>
          <View style={formStyles.inputContainer}>
            <Text style={formStyles.label}>Region</Text>

            <Dropdown
              style={[
                formStyles.dropdown,
                isFocusRegion && {borderColor: 'blue'},
              ]}
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
            {isLoadingRegions && (
              <View style={formStyles.loadingContainer}>
                <ActivityIndicator size={14} />
                <Text style={formStyles.loadingText}>Loading regions ...</Text>
              </View>
            )}
            {regionError && !region ? (
              <Text style={formStyles.error}>Region is required *</Text>
            ) : (
              <Text style={formStyles.error}>{''}</Text>
            )}
          </View>

          {error && (
            <Text style={formStyles.error}>{error?.data?.message}</Text>
          )}
          {errorRegion && (
            <Text style={formStyles.error}>{errorRegion?.data?.message}</Text>
          )}
        </View>
      </View>

      <View style={formStyles.submitBtnContainer}>
        <TouchableOpacity
          style={formStyles.submitBtn}
          touchSoundDisabled
          onPress={handleSubmit(data =>
            handleCreateUser(
              data,
              createUser,
              navigator,
              gender,
              grade ?? '',
              setGenderError,
              region,
              setRegionError,
              setCurrentStep,
              setUnregisteredUser,
              savedUserData[0].guestUserToken ?? '',
            ),
          )}
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
