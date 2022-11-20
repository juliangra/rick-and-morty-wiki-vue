import getAPIEndpoint from '@/utils/api'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

/**
 * Apollo client instance.
 */
const client = new ApolloClient({
  link: createHttpLink({
    uri: getAPIEndpoint()
  }),
  cache: new InMemoryCache()
})

export default client
