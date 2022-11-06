import { LOCAL_GRAPHQL_ENDPOINT, REMOTE_GRAPHQL_ENDPOINT } from '@/constants'

/**
 * Gets the GraphQL endpoint based on the current Node environment.
 *
 * @returns the GraphQL endpoint.
 */
const getAPIEndpoint = () => {
  const dev = import.meta.env.NODE_ENV !== 'production'
  return dev ? LOCAL_GRAPHQL_ENDPOINT : REMOTE_GRAPHQL_ENDPOINT
}

export default getAPIEndpoint
