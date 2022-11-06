import { makeVar } from '@apollo/client'

/**
 * Reactive variable for storing whether the rating modal is open.
 */
export const ratingModalIsOpenVar = makeVar(false)

/**
 * Reactive variable for storing the current rating of a character.
 */
export const currentRatingVar = makeVar(0)
