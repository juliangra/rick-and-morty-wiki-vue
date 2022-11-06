import { graphql } from '@/graphql/generated/gql'

export const GHetCharacterByIdQuery = graphql(`
  query GetCharacterById($characterId: ID!) {
    character(id: $characterId) {
      ...DefaultCharacter
    }
  }
`)
