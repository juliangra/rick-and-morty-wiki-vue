import { Prisma } from '@prisma/client'
import { Context } from '../context'
import { MutationResolvers, QueryResolvers } from '../generated/graphql'

/**
 * A strict type wrapper for filtering characters based on the allowed keys.
 *
 * @example See `addFilterToQuery` in `backend/src/utils/resolvers.ts`.
 */
export type FilterQueryKey = keyof Pick<
  Prisma.CharacterWhereInput,
  'name' | 'status' | 'species' | 'type' | 'gender'
>

export type OperationQueryKey = keyof Prisma.StringFilter

/**
 * An alias for the `QueryResolvers` type.
 */
export type CustomQueryResolvers = QueryResolvers<Context, Record<string, unknown>> | undefined

/**
 * An alias for the `MutationResolvers` type.
 */
export type CustomMutationResolvers =
  | MutationResolvers<Context, Record<string, unknown>>
  | undefined
