import { z } from 'zod'

export const RatingSchema = z.number().min(1).max(5).step(1)
