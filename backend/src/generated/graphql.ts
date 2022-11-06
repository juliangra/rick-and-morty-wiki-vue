import { GraphQLResolveInfo } from 'graphql'
import {
  User as UserModel,
  Character as CharacterModel,
  Rating as RatingModel
} from '.prisma/client'
import { Context } from '../context'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type AuthenticationResponse = {
  __typename?: 'AuthenticationResponse'
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
  __typename?: 'Character'
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
  __typename?: 'Characters'
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
  __typename?: 'Mutation'
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
  __typename?: 'PageInfo'
  count: Scalars['Int']
  pages: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
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
  __typename?: 'Rating'
  characterId: Scalars['ID']
  userId: Scalars['ID']
  value: Scalars['Int']
}

/** A wrapper for data to be used when displaying the rating stats of a character. */
export type RatingStats = {
  __typename?: 'RatingStats'
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
  __typename?: 'User'
  createdAt: Scalars['String']
  email: Scalars['String']
  id: Scalars['ID']
  /** A list of ratings that this user has made. */
  ratings?: Maybe<Array<Rating>>
  username: Scalars['String']
}

/** A wrapper to be used in paginated queries when fetching users. */
export type Users = {
  __typename?: 'Users'
  info: PageInfo
  results: Array<User>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthenticationResponse: ResolverTypeWrapper<AuthenticationResponse>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Character: ResolverTypeWrapper<CharacterModel>
  Characters: ResolverTypeWrapper<
    Omit<Characters, 'results'> & { results: Array<ResolversTypes['Character']> }
  >
  FilterCharacterInput: FilterCharacterInput
  Float: ResolverTypeWrapper<Scalars['Float']>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Mutation: ResolverTypeWrapper<{}>
  Order: Order
  PageInfo: ResolverTypeWrapper<PageInfo>
  Query: ResolverTypeWrapper<{}>
  Rating: ResolverTypeWrapper<RatingModel>
  RatingStats: ResolverTypeWrapper<RatingStats>
  RatingValue: RatingValue
  String: ResolverTypeWrapper<Scalars['String']>
  User: ResolverTypeWrapper<UserModel>
  Users: ResolverTypeWrapper<Omit<Users, 'results'> & { results: Array<ResolversTypes['User']> }>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthenticationResponse: AuthenticationResponse
  Boolean: Scalars['Boolean']
  Character: CharacterModel
  Characters: Omit<Characters, 'results'> & { results: Array<ResolversParentTypes['Character']> }
  FilterCharacterInput: FilterCharacterInput
  Float: Scalars['Float']
  ID: Scalars['ID']
  Int: Scalars['Int']
  Mutation: {}
  PageInfo: PageInfo
  Query: {}
  Rating: RatingModel
  RatingStats: RatingStats
  String: Scalars['String']
  User: UserModel
  Users: Omit<Users, 'results'> & { results: Array<ResolversParentTypes['User']> }
}

export type AuthenticationResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthenticationResponse'] = ResolversParentTypes['AuthenticationResponse']
> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CharacterResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']
> = {
  gender?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  species?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CharactersResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Characters'] = ResolversParentTypes['Characters']
> = {
  info?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  results?: Resolver<Array<ResolversTypes['Character']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  authenticateUser?: Resolver<
    ResolversTypes['AuthenticationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationAuthenticateUserArgs, 'identifier' | 'password'>
  >
  createUser?: Resolver<
    ResolversTypes['AuthenticationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'email' | 'password' | 'username'>
  >
  deleteRating?: Resolver<
    ResolversTypes['Rating'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteRatingArgs, 'characterId' | 'userId'>
  >
  rateCharacter?: Resolver<
    ResolversTypes['Rating'],
    ParentType,
    ContextType,
    RequireFields<MutationRateCharacterArgs, 'characterId' | 'userId' | 'value'>
  >
}

export type PageInfoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  character?: Resolver<
    Maybe<ResolversTypes['Character']>,
    ParentType,
    ContextType,
    RequireFields<QueryCharacterArgs, 'id'>
  >
  characters?: Resolver<
    ResolversTypes['Characters'],
    ParentType,
    ContextType,
    Partial<QueryCharactersArgs>
  >
  hasRatedCharacter?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<QueryHasRatedCharacterArgs, 'characterId' | 'userId'>
  >
  rating?: Resolver<
    Maybe<ResolversTypes['Rating']>,
    ParentType,
    ContextType,
    RequireFields<QueryRatingArgs, 'characterId' | 'userId'>
  >
  ratingStatsByCharacterId?: Resolver<
    ResolversTypes['RatingStats'],
    ParentType,
    ContextType,
    RequireFields<QueryRatingStatsByCharacterIdArgs, 'characterId'>
  >
  user?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'username'>
  >
  users?: Resolver<ResolversTypes['Users'], ParentType, ContextType, Partial<QueryUsersArgs>>
}

export type RatingResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Rating'] = ResolversParentTypes['Rating']
> = {
  characterId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type RatingStatsResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['RatingStats'] = ResolversParentTypes['RatingStats']
> = {
  average?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  ratings?: Resolver<Maybe<Array<ResolversTypes['Rating']>>, ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UsersResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Users'] = ResolversParentTypes['Users']
> = {
  info?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  results?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = Context> = {
  AuthenticationResponse?: AuthenticationResponseResolvers<ContextType>
  Character?: CharacterResolvers<ContextType>
  Characters?: CharactersResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  PageInfo?: PageInfoResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Rating?: RatingResolvers<ContextType>
  RatingStats?: RatingStatsResolvers<ContextType>
  User?: UserResolvers<ContextType>
  Users?: UsersResolvers<ContextType>
}
