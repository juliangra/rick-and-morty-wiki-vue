import { LOCAL_GRAPHQL_ENDPOINT, REMOTE_GRAPHQL_ENDPOINT } from '@/constants'

/**
 * Gets the GraphQL endpoint based on the current Node environment.
 *
 * @returns the GraphQL endpoint.
 */
const getAPIEndpoint = () => {
  const production = import.meta.env.PROD
  return production ? REMOTE_GRAPHQL_ENDPOINT : LOCAL_GRAPHQL_ENDPOINT
}

export default getAPIEndpoint
