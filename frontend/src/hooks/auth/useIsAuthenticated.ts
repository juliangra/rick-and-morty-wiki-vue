import { useStorage } from '@vueuse/core'
import { useJwt } from '@vueuse/integrations/useJwt'

const useIsAuthenticated = () => {
  const token = useStorage('token', null)

  if (!token.value) return false

  const { payload } = useJwt(token.value)

  return payload
}

export default useIsAuthenticated
