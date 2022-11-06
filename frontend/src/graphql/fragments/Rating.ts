import { graphql } from '../generated/gql'

export const DefaultRatingFragment = graphql(`
  fragment DefaultRating on Rating {
    userId
    characterId
    value
  }
`)
