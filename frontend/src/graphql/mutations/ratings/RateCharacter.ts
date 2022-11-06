import { graphql } from '@/graphql/generated/gql'

export const RateCharacterMutation = graphql(`
  mutation RateCharacter($userId: ID!, $characterId: ID!, $value: RatingValue!) {
    rateCharacter(userId: $userId, characterId: $characterId, value: $value) {
      ...DefaultRating
    }
  }
`)
