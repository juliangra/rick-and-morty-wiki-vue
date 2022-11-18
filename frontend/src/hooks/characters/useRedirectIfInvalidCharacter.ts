import type { Character } from '@/graphql/generated/graphql'
import router from '@/router'
import { watch } from 'vue'

const useRedirectIfInvalidCharacter = (character: Character) => {
  watch(character, (character) => {
    if (!character) {
      return router.push('/404')
    }
  })
}

export default useRedirectIfInvalidCharacter
