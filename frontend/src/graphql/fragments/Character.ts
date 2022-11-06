import { graphql } from '../generated/gql'

export const DefaultCharacterFragment = graphql(`
  fragment DefaultCharacter on Character {
    id
    name
    status
    species
    type
    gender
    location
    image
  }
`)
