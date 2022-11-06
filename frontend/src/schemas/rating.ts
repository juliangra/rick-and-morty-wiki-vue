import * as y from 'yup'

export const RatingSchema = y.number().min(1).max(5)
