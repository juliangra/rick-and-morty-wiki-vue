import { graphql } from '@/graphql/generated/gql'

export const GetCharacterByIdQuery = graphql(`
  query GetCharacterById($characterId: ID!) {
    character(id: $characterId) {
      ...DefaultCharacter
    }
  }
`)
