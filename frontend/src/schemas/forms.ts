import * as y from 'yup'

export const LoginFormSchema = y.object({
  identifier: y
    .string()
    .min(2, 'Please enter your username or email address.')
    .required('Please enter your username or email address.'),
  password: y.string().required('Please enter your password.')
})

type SubmitFunctionType = y.ObjectSchema<Record<string, any>>

/**
 * Helper function that extends the input schema type.
 * @param _schema is the schema to extend.
 * @param callback is the callback function to run.
 * @returns the callback function with the extended schema type.
 */
export const getSubmitFn = <Schema extends SubmitFunctionType>(
  _schema: Schema,
  callback: (values: y.InferType<Schema>) => void
) => {
  return (key: Record<string, any>) => {
    return callback(key)
  }
}

export const RegisterFormSchema = y.object({
  email: y.string().email('Invalid e-mail.').required('Please enter your e-mail.'),
  username: y
    .string()
    .min(2, 'Username must be at least 2 characters.')
    .required('Please enter your username.'),
  password: y.string().min(6, 'Password must be at least 6 characters.').required(),
  repeatPassword: y
    .string()
    .min(6, 'Password must be at least 6 characters.')
    .oneOf([y.ref('password'), null], 'Passwords must match.')
    .required('Please repeat your password.')
})

export const FilterFormSchema = y.object({
  species: y.string().nullable(),
  gender: y.string().nullable(),
  status: y.string().nullable()
})
