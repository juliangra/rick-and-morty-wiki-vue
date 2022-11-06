import type { RatingSchema } from '@/schemas/rating'
import type * as y from 'yup'

export type Rating = y.InferType<typeof RatingSchema>
