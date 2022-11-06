import { START_PAGE, CURSOR_OFFSET } from '../constants'
import { Order } from '../generated/graphql'
import { CustomQueryResolvers } from '../types/resolvers'
import { addFiltersToQuery } from '../utils/resolvers'

const Query: CustomQueryResolvers = {
  /**
   * @returns a paginated list of users in a given order
   */
  users: async (_root, args, context) => {
    const page = args.page ?? START_PAGE
    const orderBy = args.orderBy || Order.Desc

    // Ensure that the queried users have connected ratings
    const results = await context.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        password: true,
        ratings: {
          select: {
            userId: true,
            characterId: true,
            value: true
          }
        }
      },
      orderBy: {
        ratings: {
          _count: orderBy
        }
      },
      take: CURSOR_OFFSET,
      skip: CURSOR_OFFSET * (page - 1)
    })

    const count = await context.prisma.user.count()
    const pages = Math.ceil(count / CURSOR_OFFSET)

    return {
      results,
      info: {
        count,
        pages
      }
    }
  },

  /**
   * @returns a single user by their username
   */
  user: (_root, args, context) => {
    const { username } = args

    return context.prisma.user.findFirst({
      where: {
        username: {
          equals: username
        }
      }
    })
  },

  /**
   * @returns a paginated list of characters with optional filters
   */
  characters: async (_root, args, context) => {
    const page = args.page ?? START_PAGE
    const filter = args.filter

    const options = addFiltersToQuery(filter)

    const results = await context.prisma.character.findMany({
      ...options,
      take: CURSOR_OFFSET,
      skip: CURSOR_OFFSET * (page - 1)
    })

    const count = await context.prisma.character.count({
      where: {
        ...options.where
      }
    })
    const pages = Math.ceil(count / CURSOR_OFFSET)

    return {
      results,
      info: {
        count,
        pages
      }
    }
  },

  /**
   * @returns a single character by their id
   */
  character: (_root, args, context) => {
    const id = parseInt(args.id)

    return context.prisma.character.findUnique({
      where: {
        id
      }
    })
  },

  /**
   * @returns a single rating by its compund ID, consisting of a userId and characterId
   */
  rating: async (_root, args, context) => {
    const characterId = parseInt(args.characterId)
    const userId = args.userId

    return context.prisma.rating.findUnique({
      where: {
        userId_characterId: {
          characterId,
          userId
        }
      }
    })
  },

  /**
   * @returns rating stats for a given character
   */
  ratingStatsByCharacterId: async (_root, args, context) => {
    const characterId = parseInt(args.characterId)

    const average = await context.prisma.rating
      .aggregate({
        where: {
          characterId
        },
        _avg: {
          value: true
        }
      })
      .then((res) => res._avg?.value)

    const count = await context.prisma.rating.count({
      where: {
        characterId
      }
    })

    return {
      average: average ?? 0,
      count
    }
  },

  /**
   * @returns boolean indicating whether a user has rated a given character
   */
  hasRatedCharacter: async (_root, args, context) => {
    const characterId = parseInt(args.characterId)
    const userId = args.userId

    const rating = await context.prisma.rating.findUnique({
      where: {
        userId_characterId: {
          characterId,
          userId
        }
      }
    })

    return rating !== null
  }
}

export default Query
