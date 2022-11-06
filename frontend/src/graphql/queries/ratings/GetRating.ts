import { graphql } from '@/graphql/generated/gql'

export const GetRatingQuery = graphql(`
  query GetRating($userId: ID!, $characterId: ID!) {
    rating(userId: $userId, characterId: $characterId) {
      ...DefaultRating
    }
  }
`)
