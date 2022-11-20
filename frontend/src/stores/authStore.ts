import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useJwt } from '@vueuse/integrations/useJwt'
import useRedirect from '@/hooks/useRedirect'
import useNotification from '@/hooks/useNotification'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'

/**
 * Validates a JWT token.
 *
 * @param token is the JWT token to validate.
 * @returns a boolean indicating if the token is valid.
 */
export const validateToken = (token: Ref<string>) => {
  const { header, payload: decoded } = useJwt(token.value)

  return header.value !== null && token.value !== null && !!decoded.value
}

/**
 * Authentication store that tracks the state of authentication and
 * reacts to changes to the JWT token in local storage.
 */
export const useAuthStore = defineStore('authStore', () => {
  const token = useStorage<string>('token', null)

  const signIn = async (jwt: string) => {
    token.value = jwt

    await useRedirect('/')

    useNotification({
      type: 'success',
      title: 'Success',
      message: 'Successfully signed in'
    })
  }

  const signOut = async () => {
    token.value = null

    await useRedirect('/')

    useNotification({
      type: 'success',
      title: 'Success',
      message: 'Successfully signed out'
    })
  }

  // When token changes in local storage, the authentication state is revalidated
  watch(token, () => {
    isAuthenticated.value = validateToken(token)
  })

  const { payload: decoded } = useJwt(token.value)
  const isAuthenticated = ref(validateToken(token))

  return { token, isAuthenticated, signIn, signOut, decoded }
})
