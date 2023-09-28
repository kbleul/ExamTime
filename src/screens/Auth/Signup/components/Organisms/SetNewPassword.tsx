import React from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {formStyles, formSubHeaderStyles} from '../../Styles';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormData = {
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const SetNewPassword = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const url =
        'https://dev.think-hubet.com/user/createpassword/202657be-771a-4738-9b55-94dec51dabac'; // Replace with your API endpoint

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: data.password,
          forForgotPassword: false,
        }),
      });

      if (!response.ok) {
        console.log('not ok');
      }

      const responseData = await response.json();
      console.log('PAssword set successfully:', responseData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <View>
      <Text style={formSubHeaderStyles.heading}>Setup new Password</Text>
      <Text style={formSubHeaderStyles.subHeading}>
        must be at least 8 character!
      </Text>

      <View style={formStyles.container}>
        <View style={formStyles.inputContainer}>
          <Text style={formStyles.label}>Password</Text>
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <TextInput style={formStyles.input} onChangeText={onChange} />
            )}
            name="password"
          />
          {errors.password ? (
            <Text style={formStyles.error}>* {errors.password.message}</Text>
          ) : (
            <Text style={formStyles.error}>{''}</Text>
          )}
        </View>

        <View style={formStyles.inputContainer}>
          <Text style={formStyles.label}>Confirm Password</Text>
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <TextInput style={formStyles.input} onChangeText={onChange} />
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword ? (
            <Text style={formStyles.error}>
              * {errors.confirmPassword.message}
            </Text>
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
    </View>
  );
};

export default SetNewPassword;
