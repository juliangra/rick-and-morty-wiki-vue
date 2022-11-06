import { User } from '@prisma/client'
import { existsSync } from 'fs'
import { JSON_FILE_PATH } from '../constants'
import { context } from '../context'
import { RatingValue } from '../generated/graphql'
import { ratingToNumber } from './rating'

/**
 * Checks if autogenerated `characters.json` file exists.
 *
 * If it exists, this means that character data has been downloaded, the database has been populated and
 * the database has been seeded.
 *
 * @returns a boolean determining if the database has been seeded
 */
export const databaseIsSeeded = () => existsSync(JSON_FILE_PATH)

/**
 * @returns a random rating value as a number.
 */
export const getRandomRating = () => {
  const ratings = Object.values(RatingValue)
  const index = Math.floor(Math.random() * ratings.length)
  const rating = ratings[index]
  return ratingToNumber(rating)
}

/**
 * Creates or updates a user to be used in tests.
 *
 * @param user is the user to be created or updated.
 */
export const upsertTestUser = async (user: Omit<User, 'createdAt'>) => {
  const { id, password, email, username } = user

  const payload = {
    id,
    username,
    email,
    password
  }

  await context.prisma.user.upsert({
    where: {
      id
    },
    create: payload,
    update: payload
  })
}
