import { JWT_SECRET } from '../constants'
import isValidEmail from '../utils/auth/isValidEmail'
import isValidUsername from '../utils/auth/isValidUsername'
import { ratingToNumber } from '../utils/rating'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CustomMutationResolvers } from '../types/resolvers'

const Mutation: CustomMutationResolvers = {
  /**
   * Creates a new user.
   *
   * @returns a JWT token if successful, or an error message otherwise.
   */
  createUser: async (_root, args, context) => {
    const { email, username, password } = args

    const validEmail = await isValidEmail(email)
    if (!validEmail.ok) return { error: validEmail.error }

    const validUsername = await isValidUsername(username)
    if (!validUsername.ok) return { error: validUsername.error }

    if (password.length < 6) return { error: 'Password must be at least 6 characters long' }

    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = await context.prisma.user.create({
      data: {
        email: email,
        username: username,
        password: encryptedPassword
      }
    })

    if (!user.id) return { error: 'User could not be created. Please try again' }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET)
    return {
      token
    }
  },

  /**
   * Authenticates and logs in an existing user.
   *
   * @returns a JWT token if successful, or an error message otherwise.
   */
  authenticateUser: async (_root, args, context) => {
    const { identifier, password } = args

    if (!identifier) return { error: 'Please provide either a username or an email address!' }

    const user = await context.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: identifier
            }
          },
          {
            username: {
              equals: identifier
            }
          }
        ]
      }
    })

    if (!user?.id) return { error: 'No user found with given credentials!' }

    const { password: dbPassword, id, username } = user

    const validPassword = await bcrypt.compare(password, dbPassword)

    if (!validPassword) return { error: 'No user found with given credentials!' }

    const token = jwt.sign({ id, username }, JWT_SECRET)
    return { token }
  },

  /**
   * Rates a character.
   *
   * @returns the newly created rating.
   */
  rateCharacter: async (_root, args, context) => {
    const characterId = parseInt(args.characterId)
    const userId = args.userId
    const value = ratingToNumber(args.value)

    // Create or update ratings connected to user in database
    await context.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        ratings: {
          connectOrCreate: {
            create: {
              value,
              characterId
            },
            where: {
              userId_characterId: {
                userId,
                characterId
              }
            }
          }
        }
      }
    })

    // Create or update entry in link table of ratings
    return context.prisma.rating.upsert({
      where: {
        userId_characterId: {
          characterId,
          userId
        }
      },
      create: {
        value,
        characterId,
        userId
      },
      update: {
        value,
        characterId,
        userId
      }
    })
  },

  /**
   * Removes a user's rating of a given character.
   *
   * @returns the deleted rating.
   */
  deleteRating: async (_root, args, context) => {
    const characterId = parseInt(args.characterId)
    const userId = args.userId

    return context.prisma.rating.delete({
      where: {
        userId_characterId: {
          characterId,
          userId
        }
      }
    })
  }
}

export default Mutation
