import { graphql } from '../generated/gql'

export const DefaultUserFragment = graphql(`
  fragment DefaultUser on User {
    id
    email
    username
    createdAt
    ratings {
      userId
      characterId
      value
    }
  }
`)
