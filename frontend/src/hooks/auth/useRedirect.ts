import router from '@/router'

const useRedirect = async (destination: string, options = { reload: false }) => {
  // TypeScript only accepts a number as an argument (here a NaN) and it works 🤔
  if (options.reload) return router.go(Number(destination))

  await router.push(destination)
}

export default useRedirect
