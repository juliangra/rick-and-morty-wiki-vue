import { graphql } from '@/graphql/generated/gql'

export const HasRatedCharacterQuery = graphql(`
  query HasRatedCharacter($characterId: ID!, $userId: ID!) {
    hasRatedCharacter(characterId: $characterId, userId: $userId)
  }
`)
