import { RatingValue } from '@/graphql/generated/graphql'

export const getAverageRating = (rating: number) => {
  return Math.round(((rating || 0) * 100) / 5)
}

export const getReadableRating = (rating: number) => {
  return rating.toFixed(1)
}

/**
 * Maps a numeric rating value to a an enum from GraphQL.
 *
 * @param value is the numeric rating value.
 * @returns the enum value.
 */
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
