import router from '@/router'

const useRedirect = async (destination: string, options = { reload: false }) => {
  // router.go() only accept a number as argument. Casting `destination` to a number works.
  if (options.reload) return router.go(Number(destination))

  await router.push(destination)
}

export default useRedirect
