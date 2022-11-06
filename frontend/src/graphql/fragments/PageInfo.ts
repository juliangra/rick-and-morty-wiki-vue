import { graphql } from '../generated/gql'

export const DefaultPageInfoFragment = graphql(`
  fragment DefaultPageInfo on PageInfo {
    count
    pages
  }
`)
