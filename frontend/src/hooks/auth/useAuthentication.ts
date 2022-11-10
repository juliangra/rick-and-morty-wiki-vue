import { useStorage } from '@vueuse/core'
import { useJwt } from '@vueuse/integrations/useJwt'
import useRedirect from '@/hooks/auth/useRedirect'

const useAuthentication = () => {
  const token = useStorage<string>('token', null)

  const signIn = async (jwt: string) => {
    token.value = jwt
    await useRedirect('/', { reload: true })
  }

  const signOut = async () => {
    token.value = null
    await useRedirect('/', { reload: true })
  }

  const { header, payload: decoded } = useJwt(token.value)
  const isAuthenticated = header.value !== null && token.value !== null && !!decoded.value

  return { token, isAuthenticated, signIn, signOut, decoded }
}

export default useAuthentication
