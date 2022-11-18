/* eslint-disable */
import * as types from './graphql'
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

const documents = {
  '\n  fragment DefaultCharacter on Character {\n    id\n    name\n    status\n    species\n    type\n    gender\n    location\n    image\n  }\n':
    types.DefaultCharacterFragmentDoc,
  '\n  fragment DefaultPageInfo on PageInfo {\n    count\n    pages\n  }\n':
    types.DefaultPageInfoFragmentDoc,
  '\n  fragment DefaultRating on Rating {\n    userId\n    characterId\n    value\n  }\n':
    types.DefaultRatingFragmentDoc,
  '\n  fragment DefaultUser on User {\n    id\n    email\n    username\n    createdAt\n    ratings {\n      userId\n      characterId\n      value\n    }\n  }\n':
    types.DefaultUserFragmentDoc,
  '\n  mutation DeleteRating($characterId: ID!, $userId: ID!) {\n    deleteRating(characterId: $characterId, userId: $userId) {\n      ...DefaultRating\n    }\n  }\n':
    types.DeleteRatingDocument,
  '\n  mutation RateCharacter($userId: ID!, $characterId: ID!, $value: RatingValue!) {\n    rateCharacter(userId: $userId, characterId: $characterId, value: $value) {\n      ...DefaultRating\n    }\n  }\n':
    types.RateCharacterDocument,
  '\n  mutation AuthenticateUser($identifier: String!, $password: String!) {\n    authenticateUser(identifier: $identifier, password: $password) {\n      token\n      error\n    }\n  }\n':
    types.AuthenticateUserDocument,
  '\n  mutation CreateUser($username: String!, $email: String!, $password: String!) {\n    createUser(username: $username, email: $email, password: $password) {\n      token\n      error\n    }\n  }\n':
    types.CreateUserDocument,
  '\n  query GetCharacterById($characterId: ID!) {\n    character(id: $characterId) {\n      ...DefaultCharacter\n    }\n  }\n':
    types.GetCharacterByIdDocument,
  '\n  query GetCharacters($page: Int, $filter: FilterCharacterInput) {\n    characters(page: $page, filter: $filter) {\n      info {\n        ...DefaultPageInfo\n      }\n      results {\n        ...DefaultCharacter\n      }\n    }\n  }\n':
    types.GetCharactersDocument,
  '\n  query GetRating($userId: ID!, $characterId: ID!) {\n    rating(userId: $userId, characterId: $characterId) {\n      ...DefaultRating\n    }\n  }\n':
    types.GetRatingDocument,
  '\n  query GetRatingStatsByCharacterId($characterId: ID!) {\n    ratingStatsByCharacterId(characterId: $characterId) {\n      average\n      count\n    }\n  }\n':
    types.GetRatingStatsByCharacterIdDocument,
  '\n  query HasRatedCharacter($characterId: ID!, $userId: ID!) {\n    hasRatedCharacter(characterId: $characterId, userId: $userId)\n  }\n':
    types.HasRatedCharacterDocument,
  '\n  query GetUsers($page: Int, $orderBy: Order) {\n    users(page: $page, orderBy: $orderBy) {\n      info {\n        ...DefaultPageInfo\n      }\n      results {\n        ...DefaultUser\n      }\n    }\n  }\n':
    types.GetUsersDocument
}

export function graphql(
  source: '\n  fragment DefaultCharacter on Character {\n    id\n    name\n    status\n    species\n    type\n    gender\n    location\n    image\n  }\n'
): typeof documents['\n  fragment DefaultCharacter on Character {\n    id\n    name\n    status\n    species\n    type\n    gender\n    location\n    image\n  }\n']
export function graphql(
  source: '\n  fragment DefaultPageInfo on PageInfo {\n    count\n    pages\n  }\n'
): typeof documents['\n  fragment DefaultPageInfo on PageInfo {\n    count\n    pages\n  }\n']
export function graphql(
  source: '\n  fragment DefaultRating on Rating {\n    userId\n    characterId\n    value\n  }\n'
): typeof documents['\n  fragment DefaultRating on Rating {\n    userId\n    characterId\n    value\n  }\n']
export function graphql(
  source: '\n  fragment DefaultUser on User {\n    id\n    email\n    username\n    createdAt\n    ratings {\n      userId\n      characterId\n      value\n    }\n  }\n'
): typeof documents['\n  fragment DefaultUser on User {\n    id\n    email\n    username\n    createdAt\n    ratings {\n      userId\n      characterId\n      value\n    }\n  }\n']
export function graphql(
  source: '\n  mutation DeleteRating($characterId: ID!, $userId: ID!) {\n    deleteRating(characterId: $characterId, userId: $userId) {\n      ...DefaultRating\n    }\n  }\n'
): typeof documents['\n  mutation DeleteRating($characterId: ID!, $userId: ID!) {\n    deleteRating(characterId: $characterId, userId: $userId) {\n      ...DefaultRating\n    }\n  }\n']
export function graphql(
  source: '\n  mutation RateCharacter($userId: ID!, $characterId: ID!, $value: RatingValue!) {\n    rateCharacter(userId: $userId, characterId: $characterId, value: $value) {\n      ...DefaultRating\n    }\n  }\n'
): typeof documents['\n  mutation RateCharacter($userId: ID!, $characterId: ID!, $value: RatingValue!) {\n    rateCharacter(userId: $userId, characterId: $characterId, value: $value) {\n      ...DefaultRating\n    }\n  }\n']
export function graphql(
  source: '\n  mutation AuthenticateUser($identifier: String!, $password: String!) {\n    authenticateUser(identifier: $identifier, password: $password) {\n      token\n      error\n    }\n  }\n'
): typeof documents['\n  mutation AuthenticateUser($identifier: String!, $password: String!) {\n    authenticateUser(identifier: $identifier, password: $password) {\n      token\n      error\n    }\n  }\n']
export function graphql(
  source: '\n  mutation CreateUser($username: String!, $email: String!, $password: String!) {\n    createUser(username: $username, email: $email, password: $password) {\n      token\n      error\n    }\n  }\n'
): typeof documents['\n  mutation CreateUser($username: String!, $email: String!, $password: String!) {\n    createUser(username: $username, email: $email, password: $password) {\n      token\n      error\n    }\n  }\n']
export function graphql(
  source: '\n  query GetCharacterById($characterId: ID!) {\n    character(id: $characterId) {\n      ...DefaultCharacter\n    }\n  }\n'
): typeof documents['\n  query GetCharacterById($characterId: ID!) {\n    character(id: $characterId) {\n      ...DefaultCharacter\n    }\n  }\n']
export function graphql(
  source: '\n  query GetCharacters($page: Int, $filter: FilterCharacterInput) {\n    characters(page: $page, filter: $filter) {\n      info {\n        ...DefaultPageInfo\n      }\n      results {\n        ...DefaultCharacter\n      }\n    }\n  }\n'
): typeof documents['\n  query GetCharacters($page: Int, $filter: FilterCharacterInput) {\n    characters(page: $page, filter: $filter) {\n      info {\n        ...DefaultPageInfo\n      }\n      results {\n        ...DefaultCharacter\n      }\n    }\n  }\n']
export function graphql(
  source: '\n  query GetRating($userId: ID!, $characterId: ID!) {\n    rating(userId: $userId, characterId: $characterId) {\n      ...DefaultRating\n    }\n  }\n'
): typeof documents['\n  query GetRating($userId: ID!, $characterId: ID!) {\n    rating(userId: $userId, characterId: $characterId) {\n      ...DefaultRating\n    }\n  }\n']
export function graphql(
  source: '\n  query GetRatingStatsByCharacterId($characterId: ID!) {\n    ratingStatsByCharacterId(characterId: $characterId) {\n      average\n      count\n    }\n  }\n'
): typeof documents['\n  query GetRatingStatsByCharacterId($characterId: ID!) {\n    ratingStatsByCharacterId(characterId: $characterId) {\n      average\n      count\n    }\n  }\n']
export function graphql(
  source: '\n  query HasRatedCharacter($characterId: ID!, $userId: ID!) {\n    hasRatedCharacter(characterId: $characterId, userId: $userId)\n  }\n'
): typeof documents['\n  query HasRatedCharacter($characterId: ID!, $userId: ID!) {\n    hasRatedCharacter(characterId: $characterId, userId: $userId)\n  }\n']
export function graphql(
  source: '\n  query GetUsers($page: Int, $orderBy: Order) {\n    users(page: $page, orderBy: $orderBy) {\n      info {\n        ...DefaultPageInfo\n      }\n      results {\n        ...DefaultUser\n      }\n    }\n  }\n'
): typeof documents['\n  query GetUsers($page: Int, $orderBy: Order) {\n    users(page: $page, orderBy: $orderBy) {\n      info {\n        ...DefaultPageInfo\n      }\n      results {\n        ...DefaultUser\n      }\n    }\n  }\n']

export function graphql(source: string): unknown
export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
