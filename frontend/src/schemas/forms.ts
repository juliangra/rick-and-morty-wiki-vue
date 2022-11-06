import { z } from 'zod'

export const LoginFormSchema = z.object({
  identifier: z.string().min(2, { message: 'Please enter your username or email address.' }),
  password: z.string().min(1, { message: 'Please enter your password.' })
})

export const RegisterFormSchema = z
  .object({
    email: z.string().email({ message: 'Invalid e-mail.' }),
    username: z.string().min(2, { message: 'Username must be at least 2 characters.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
    repeatPassword: z.string().min(6, { message: 'Password must be at least 6 characters.' })
  })
  .refine(({ password, repeatPassword }) => password === repeatPassword, {
    path: ['repeatPassword'],
    message: 'Passwords do not match.'
  })

export const FilterFormSchema = z.object({
  species: z.string().nullable(),
  gender: z.string().nullable(),
  status: z.string().nullable()
})
