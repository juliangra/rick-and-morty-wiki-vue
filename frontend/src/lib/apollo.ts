import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8080/graphql'
  }),
  cache: new InMemoryCache()
})

export default client
