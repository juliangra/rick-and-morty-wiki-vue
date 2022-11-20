import type { RouteLocationNormalizedLoaded } from 'vue-router'

interface AuthToHome {
  (from: RouteLocationNormalizedLoaded, to: RouteLocationNormalizedLoaded): boolean
}

/**
 * Checks if the redirect is from 'login' or 'register' view to the 'home' view
 *
 * @param from is a router object with information about the 'from' location
 * @param to is a router object with information about the 'to' location
 */
export const authToHome: AuthToHome = (from, to) => {
  const fromLoginRegister = from.name == 'login' || from.name == 'register'
  const toHome = to.name == 'home'

  return fromLoginRegister && toHome
}
