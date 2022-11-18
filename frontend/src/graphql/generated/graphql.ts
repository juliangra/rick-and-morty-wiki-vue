/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type AuthenticationResponse = {
  /**
   * An error message describing what part of the authentication failed.
   * It is undefined if the user is successfully authenticated.
   */
  error?: Maybe<Scalars['String']>
  /**
   * A token that can be used to authenticate the user in future requests.
   * It is undefined if the user is not authenticated.
   */
  token?: Maybe<Scalars['String']>
}

/**
 * A mapped character from the external Rick and Morty API,
 * including only the fields the application needs to use.
 */
export type Character = {
  gender: Scalars['String']
  id: Scalars['ID']
  image: Scalars['String']
  location: Scalars['String']
  name: Scalars['String']
  species: Scalars['String']
  status: Scalars['String']
  type: Scalars['String']
}

/** A wrapper to be used in paginated queries when fetching characters. */
export type Characters = {
  info: PageInfo
  results: Array<Character>
}

export type FilterCharacterInput = {
  gender?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  species?: InputMaybe<Scalars['String']>
  status?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
}

export type Mutation = {
  authenticateUser: AuthenticationResponse
  createUser: AuthenticationResponse
  deleteRating: Rating
  /** Create a rating for a given character by a given user. */
  rateCharacter: Rating
}

export type MutationAuthenticateUserArgs = {
  identifier: Scalars['String']
  password: Scalars['String']
}

export type MutationCreateUserArgs = {
  email: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
}

export type MutationDeleteRatingArgs = {
  characterId: Scalars['ID']
  userId: Scalars['ID']
}

export type MutationRateCharacterArgs = {
  characterId: Scalars['ID']
  userId: Scalars['ID']
  value: RatingValue
}

export enum Order {
  Asc = 'asc',
  Desc = 'desc'
}

/** Describes metadata regarding a page of results. */
export type PageInfo = {
  count: Scalars['Int']
  pages: Scalars['Int']
}

export type Query = {
  character?: Maybe<Character>
  characters: Characters
  /** Check if a user has rated a given character. */
  hasRatedCharacter: Scalars['Boolean']
  /** Fetch a given rating by the compund ID of userId and characterId. */
  rating?: Maybe<Rating>
  /** Fetch all rating stats for a given character. */
  ratingStatsByCharacterId: RatingStats
  user?: Maybe<User>
  users: Users
}

export type QueryCharacterArgs = {
  id: Scalars['ID']
}

export type QueryCharactersArgs = {
  filter?: InputMaybe<FilterCharacterInput>
  page?: InputMaybe<Scalars['Int']>
}

export type QueryHasRatedCharacterArgs = {
  characterId: Scalars['ID']
  userId: Scalars['ID']
}

export type QueryRatingArgs = {
  characterId: Scalars['ID']
  userId: Scalars['ID']
}

export type QueryRatingStatsByCharacterIdArgs = {
  characterId: Scalars['ID']
}

export type QueryUserArgs = {
  username: Scalars['String']
}

export type QueryUsersArgs = {
  orderBy?: InputMaybe<Order>
  page?: InputMaybe<Scalars['Int']>
}

/**
 * A rating of a character by a user.
 * It does not have its own ID, but rather a compund ID of userId and characterId, because it is a link table.
 */
export type Rating = {
  characterId: Scalars['ID']
  userId: Scalars['ID']
  value: Scalars['Int']
}

/** A wrapper for data to be used when displaying the rating stats of a character. */
export type RatingStats = {
  average: Scalars['Float']
  count: Scalars['Int']
}

/** A rating can be a value between 1 and 5. */
export enum RatingValue {
  Five = 'FIVE',
  Four = 'FOUR',
  One = 'ONE',
  Three = 'THREE',
  Two = 'TWO'
}

export type User = {
  createdAt: Scalars['String']
  email: Scalars['String']
  id: Scalars['ID']
  /** A list of ratings that this user has made. */
  ratings?: Maybe<Array<Rating>>
  username: Scalars['String']
}

/** A wrapper to be used in paginated queries when fetching users. */
export type Users = {
  info: PageInfo
  results: Array<User>
}

export type DefaultCharacterFragment = {
  id: string
  name: string
  status: string
  species: string
  type: string
  gender: string
  location: string
  image: string
} & { ' $fragmentName'?: 'DefaultCharacterFragment' }

export type DefaultPageInfoFragment = { count: number; pages: number } & {
  ' $fragmentName'?: 'DefaultPageInfoFragment'
}

export type DefaultRatingFragment = { userId: string; characterId: string; value: number } & {
  ' $fragmentName'?: 'DefaultRatingFragment'
}

export type DefaultUserFragment = {
  id: string
  email: string
  username: string
  createdAt: string
  ratings?: Array<{ userId: string; characterId: string; value: number }> | null
} & { ' $fragmentName'?: 'DefaultUserFragment' }

export type DeleteRatingMutationVariables = Exact<{
  characterId: Scalars['ID']
  userId: Scalars['ID']
}>

export type DeleteRatingMutation = {
  deleteRating: { ' $fragmentRefs'?: { DefaultRatingFragment: DefaultRatingFragment } }
}

export type RateCharacterMutationVariables = Exact<{
  userId: Scalars['ID']
  characterId: Scalars['ID']
  value: RatingValue
}>

export type RateCharacterMutation = {
  rateCharacter: { ' $fragmentRefs'?: { DefaultRatingFragment: DefaultRatingFragment } }
}

export type AuthenticateUserMutationVariables = Exact<{
  identifier: Scalars['String']
  password: Scalars['String']
}>

export type AuthenticateUserMutation = {
  authenticateUser: { token?: string | null; error?: string | null }
}

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
}>

export type CreateUserMutation = { createUser: { token?: string | null; error?: string | null } }

export type GetCharacterByIdQueryVariables = Exact<{
  characterId: Scalars['ID']
}>

export type GetCharacterByIdQuery = {
  character?: { ' $fragmentRefs'?: { DefaultCharacterFragment: DefaultCharacterFragment } } | null
}

export type GetCharactersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>
  filter?: InputMaybe<FilterCharacterInput>
}>

export type GetCharactersQuery = {
  characters: {
    info: { ' $fragmentRefs'?: { DefaultPageInfoFragment: DefaultPageInfoFragment } }
    results: Array<{ ' $fragmentRefs'?: { DefaultCharacterFragment: DefaultCharacterFragment } }>
  }
}

export type GetRatingQueryVariables = Exact<{
  userId: Scalars['ID']
  characterId: Scalars['ID']
}>

export type GetRatingQuery = {
  rating?: { ' $fragmentRefs'?: { DefaultRatingFragment: DefaultRatingFragment } } | null
}

export type GetRatingStatsByCharacterIdQueryVariables = Exact<{
  characterId: Scalars['ID']
}>

export type GetRatingStatsByCharacterIdQuery = {
  ratingStatsByCharacterId: { average: number; count: number }
}

export type HasRatedCharacterQueryVariables = Exact<{
  characterId: Scalars['ID']
  userId: Scalars['ID']
}>

export type HasRatedCharacterQuery = { hasRatedCharacter: boolean }

export type GetUsersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Order>
}>

export type GetUsersQuery = {
  users: {
    info: { ' $fragmentRefs'?: { DefaultPageInfoFragment: DefaultPageInfoFragment } }
    results: Array<{ ' $fragmentRefs'?: { DefaultUserFragment: DefaultUserFragment } }>
  }
}

export const DefaultCharacterFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DefaultCharacter' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Character' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'species' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'gender' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<DefaultCharacterFragment, unknown>
export const DefaultPageInfoFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DefaultPageInfo' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PageInfo' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'count' } },
          { kind: 'Field', name: { kind: 'Name', value: 'pages' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<DefaultPageInfoFragment, unknown>
export const DefaultRatingFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DefaultRating' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Rating' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'characterId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<DefaultRatingFragment, unknown>
export const DefaultUserFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DefaultUser' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ratings' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'characterId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<DefaultUserFragment, unknown>
export const DeleteRatingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteRating' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'characterId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteRating' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'characterId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'characterId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DefaultRating' } }
              ]
            }
          }
        ]
      }
    },
    ...DefaultRatingFragmentDoc.definitions
  ]
} as unknown as DocumentNode<DeleteRatingMutation, DeleteRatingMutationVariables>
export const RateCharacterDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RateCharacter' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'characterId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'value' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'RatingValue' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'rateCharacter' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'characterId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'characterId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'value' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'value' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DefaultRating' } }
              ]
            }
          }
        ]
      }
    },
    ...DefaultRatingFragmentDoc.definitions
  ]
} as unknown as DocumentNode<RateCharacterMutation, RateCharacterMutationVariables>
export const AuthenticateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AuthenticateUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'identifier' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'authenticateUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'identifier' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'identifier' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                { kind: 'Field', name: { kind: 'Name', value: 'error' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AuthenticateUserMutation, AuthenticateUserMutationVariables>
export const CreateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'username' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'username' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'username' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                { kind: 'Field', name: { kind: 'Name', value: 'error' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>
export const GetCharacterByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCharacterById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'characterId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'character' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'characterId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DefaultCharacter' } }
              ]
            }
          }
        ]
      }
    },
    ...DefaultCharacterFragmentDoc.definitions
  ]
} as unknown as DocumentNode<GetCharacterByIdQuery, GetCharacterByIdQueryVariables>
export const GetCharactersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCharacters' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FilterCharacterInput' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'characters' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'page' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'info' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DefaultPageInfo' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'results' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DefaultCharacter' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...DefaultPageInfoFragmentDoc.definitions,
    ...DefaultCharacterFragmentDoc.definitions
  ]
} as unknown as DocumentNode<GetCharactersQuery, GetCharactersQueryVariables>
export const GetRatingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRating' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'characterId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'rating' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'characterId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'characterId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DefaultRating' } }
              ]
            }
          }
        ]
      }
    },
    ...DefaultRatingFragmentDoc.definitions
  ]
} as unknown as DocumentNode<GetRatingQuery, GetRatingQueryVariables>
export const GetRatingStatsByCharacterIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRatingStatsByCharacterId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'characterId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ratingStatsByCharacterId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'characterId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'characterId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'average' } },
                { kind: 'Field', name: { kind: 'Name', value: 'count' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetRatingStatsByCharacterIdQuery,
  GetRatingStatsByCharacterIdQueryVariables
>
export const HasRatedCharacterDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'HasRatedCharacter' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'characterId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'hasRatedCharacter' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'characterId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'characterId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<HasRatedCharacterQuery, HasRatedCharacterQueryVariables>
export const GetUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUsers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'orderBy' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Order' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'page' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'orderBy' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'info' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DefaultPageInfo' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'results' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DefaultUser' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...DefaultPageInfoFragmentDoc.definitions,
    ...DefaultUserFragmentDoc.definitions
  ]
} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>
