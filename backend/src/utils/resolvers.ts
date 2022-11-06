import { Prisma } from '@prisma/client'
import { FilterCharacterInput, InputMaybe } from '../generated/graphql'
import { FilterQueryKey, OperationQueryKey } from '../types/resolvers'

/**
 * Adds a strictly-typed filter to a Prisma query for finding many characters.
 *
 * @param options is the query options to add the filter to.
 * @param key is the key of the filter to add.
 * @param filter is the filter to add.
 *
 * @example
 *
 * The parameters (options, 'gender', 'equals', 'Female') will add the a filter where `gender = 'female'` to the query.
 */
export const addSingleFilterToQuery = (
  options: Prisma.CharacterFindManyArgs,
  key: FilterQueryKey,
  operation: keyof Prisma.StringFilter,
  filter?: InputMaybe<string>
) => {
  if (filter) {
    options.where = {
      ...options.where,
      [key]: {
        [operation]: filter
      }
    }
  }
}

/**
 * Adds all defined filters to a Prisma query for finding many characters.
 *
 * @param filter is the filter to add.
 * @returns the query options with the filters added.
 */
export const addFiltersToQuery = (filter?: InputMaybe<FilterCharacterInput>) => {
  if (!filter) return {}

  const options: Prisma.CharacterFindManyArgs = {}

  const availableFilters = Object.keys(filter) as FilterQueryKey[]

  availableFilters.forEach((key) => {
    // If we're parsing the `name` filter, we check for contained values.
    // Else, we check for equality.
    const operation: OperationQueryKey = key === 'name' ? 'contains' : 'equals'

    addSingleFilterToQuery(options, key, operation, filter[key])
  })

  return options
}
