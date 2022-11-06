import { graphql } from '@/graphql/generated/gql'

export const AuthenticateUserMutation = graphql(`
  mutation AuthenticateUser($identifier: String!, $password: String!) {
    authenticateUser(identifier: $identifier, password: $password) {
      token
      error
    }
  }
`)
