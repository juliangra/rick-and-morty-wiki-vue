import { RatingValue } from '../generated/graphql'

/**
 * Maps a rating value to a number.
 * @param rating the rating value to map
 *
 * @returns the number corresponding to the rating value.
 */
export const ratingToNumber = (rating: RatingValue) => {
  switch (rating) {
    case RatingValue.One:
      return 1
    case RatingValue.Two:
      return 2
    case RatingValue.Three:
      return 3
    case RatingValue.Four:
      return 4
    case RatingValue.Five:
      return 5
  }
}

/**
 * Maps a number to a rating value.
 * @param rating the number to map
 *
 * @returns the rating value corresponding to the number.
 */
export const numberToRating = (rating: number) => {
  switch (rating) {
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
      return RatingValue.One
  }
}
