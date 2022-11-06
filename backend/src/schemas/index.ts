import { loadSchema } from '@graphql-tools/load'
import { makeExecutableSchema } from '@graphql-tools/schema'
import resolvers from '../resolvers'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

/**
 * An executable schema consisting of the type definitions and resolvers.
 *
 * The type definitions are loaded from the GraphQL schema file.
 *
 * The resolvers are loaded from the resolvers directory.
 */
const schema = makeExecutableSchema({
  resolvers,
  typeDefs: await loadSchema('src/graphql/schema.graphql', {
    loaders: [new GraphQLFileLoader()]
  })
})

export default schema
