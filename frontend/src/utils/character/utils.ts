import { RatingValue } from '@/graphql/generated/graphql'

export const getAverageRating = (rating: number) => {
  return Math.round(((rating || 0) * 100) / 5)
}

export const getReadableRating = (rating: number) => {
  return rating.toFixed(1)
}

export const getRatingValue = (value: number) => {
  switch (value) {
    case 1:
      return RatingValue.One
    case 2:
      return RatingValue.Two
    case 3:
      return RatingValue.Three
    case 4:
      return RatingValue.Four
    case 5:
      return RatingValue.Five
    default:
      return null
  }
}
