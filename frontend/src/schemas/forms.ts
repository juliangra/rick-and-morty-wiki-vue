import * as y from 'yup'

export const LoginFormSchema = y.object({
  identifier: y
    .string()
    .min(2, { message: 'Please enter your username or email address.' })
    .required({ message: 'Please enter your username or email address.' }),
  password: y.string().required({ message: 'Please enter your password.' })
})

export const RegisterFormSchema = y.object({
  email: y
    .string()
    .email({ message: 'Invalid e-mail.' })
    .required({ message: 'Please enter your e-mail.' }),
  username: y
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' })
    .required({ message: 'Please enter your username.' }),
  password: y.string().min(6, { message: 'Password must be at least 6 characters.' }).required(),
  repeatPassword: y
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' })
    .oneOf([y.ref('password'), null], { message: 'Passwords must match.' })
    .required({ message: 'Please repeat your password.' })
})

export const FilterFormSchema = y.object({
  species: y.string().nullable(),
  gender: y.string().nullable(),
  status: y.string().nullable()
})
