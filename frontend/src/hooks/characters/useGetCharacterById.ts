import { DefaultCharacterFragment } from '@/graphql/fragments/Character'
import { useFragment } from '@/graphql/generated'
import type { Character } from '@/graphql/generated/graphql'
import { GetCharacterByIdQuery } from '@/graphql/queries/characters/GetCharacterById'
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'
import useRedirectIfInvalidCharacter from './useRedirectIfInvalidCharacter'

/**
 * Wrapper hook for the GetCharacterById query.
 * @param characterId is the ID of the character to fetch.
 * @returns data, loading, and error from the query.
 */
const useGetCharacterById = (characterId: string) => {
  const { result, loading, error } = useQuery(GetCharacterByIdQuery, {
    characterId
  })

  const character = computed(
    () => useFragment(DefaultCharacterFragment, result.value?.character) as Character
  )

  useRedirectIfInvalidCharacter(character.value)

  return {
    character,
    loading,
    error
  }
}

export default useGetCharacterById
