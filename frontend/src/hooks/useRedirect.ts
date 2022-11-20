import router from '@/router'

/**
 * Pushes a path to the router, or reloads the router with a new path.
 *
 * @param destination is the path to push to the router.
 * @param reload is a boolean that determines if the router should reload. Defaults to `false`.
 * @returns a promise that resolves when the router has finished pushing the path.
 */
const useRedirect = async (destination: string, reload = false) =>
  reload ? router.go(Number(destination)) : await router.push(destination)

export default useRedirect
