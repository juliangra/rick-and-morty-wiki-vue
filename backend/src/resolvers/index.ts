import { Resolvers } from '../generated/graphql'
import Query from './query'
import Mutation from './mutation'

const resolvers: Resolvers = {
  Query,
  Mutation
}

export default resolvers
