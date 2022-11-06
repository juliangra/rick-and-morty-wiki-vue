import type { RegisterFormSchema, LoginFormSchema, FilterFormSchema } from '@/schemas/forms'
import type * as y from 'yup'

export type RegisterFormType = y.InferType<typeof RegisterFormSchema>
export type LoginFormType = y.InferType<typeof LoginFormSchema>
export type FilterFormType = y.InferType<typeof FilterFormSchema>

export type SelectOption = {
  label: string
  value: string
}
