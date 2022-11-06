import { graphql } from '@/graphql/generated/gql'

export const GetCharactersQuery = graphql(`
  query GetCharacters($page: Int, $filter: FilterCharacterInput) {
    characters(page: $page, filter: $filter) {
      info {
        ...DefaultPageInfo
      }
      results {
        ...DefaultCharacter
      }
    }
  }
`)
