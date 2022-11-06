import getAPIEndpoint from '@/utils/api'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

const client = new ApolloClient({
  link: createHttpLink({
    uri: getAPIEndpoint()
  }),
  cache: new InMemoryCache()
})

export default client
