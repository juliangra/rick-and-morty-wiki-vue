import { Character } from '../generated/graphql'

type ApiCharacter = Omit<Character, 'location'> & {
  location: {
    name: string
    url: string
  }
}

export type ApiResponse = {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: ApiCharacter[]
}
