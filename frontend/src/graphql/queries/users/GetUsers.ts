import { graphql } from '@/graphql/generated/gql'

export const GetUsersQuery = graphql(`
  query GetUsers($page: Int, $orderBy: Order) {
    users(page: $page, orderBy: $orderBy) {
      info {
        ...DefaultPageInfo
      }
      results {
        ...DefaultUser
      }
    }
  }
`)
