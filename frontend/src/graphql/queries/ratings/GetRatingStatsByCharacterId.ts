import { graphql } from '@/graphql/generated/gql'

export const GetRatingStatsByCharacterIdQuery = graphql(`
  query GetRatingStatsByCharacterId($characterId: ID!) {
    ratingStatsByCharacterId(characterId: $characterId) {
      average
      count
    }
  }
`)
