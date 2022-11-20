import type { Character } from '@/graphql/generated/graphql'
import router from '@/router'
import { watch } from 'vue'

/**
 * Redirects to /404 if the character is invalid.
 *
 * @param character is the character to validate.
 */
const useRedirectIfInvalidCharacter = (character: Character) => {
  watch(character, (character) => {
    if (!character) {
      return router.push('/404')
    }
  })
}

export default useRedirectIfInvalidCharacter
