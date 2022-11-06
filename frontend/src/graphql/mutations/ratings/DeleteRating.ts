import { graphql } from '@/graphql/generated/gql'

export const DeleteRatingMutation = graphql(`
  mutation DeleteRating($characterId: ID!, $userId: ID!) {
    deleteRating(characterId: $characterId, userId: $userId) {
      ...DefaultRating
    }
  }
`)
