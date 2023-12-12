import * as yup from 'yup';

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()#.*\[\]+<>/',~`-])[A-Za-z\d@$!%*?&()#.*\[\]+<>/',~`-]{8,}$/,
      "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one of the following special characters: @$!%*?&()#.*[]+<>/',~`-",
    )
    .max(31, 'Password can not be more than 32 characters long'),
  newPassword: yup
    .string()
    .required('New password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()#.*\[\]+<>/',~`-])[A-Za-z\d@$!%*?&()#.*\[\]+<>/',~`-]{8,}$/,
      "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one of the following special characters: @$!%*?&()#.*[]+<>/',~`-",
    )
    .max(31, 'Password can not be more than 32 characters long'),
  confirmPassword: yup
    .string()
    .required('Confirm new password is required')
    .oneOf([yup.ref('newPassword')], 'New passwords must match'),
});
