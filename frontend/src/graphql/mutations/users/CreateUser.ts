import { graphql } from '@/graphql/generated/gql'

export const CreateUserMutation = graphql(`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      error
    }
  }
`)
