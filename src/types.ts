import { GraphQLResolveInfo } from 'graphql';
import { DataSourceContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type MGLanguage = {
  __typename?: 'MGLanguage';
  code: Scalars['String']['output'];
  displayCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type MGSet = {
  __typename?: 'MGSet';
  cardCount: Scalars['Int']['output'];
  code: Scalars['String']['output'];
  isFoilOnly: Scalars['Boolean']['output'];
  isOnlineOnly: Scalars['Boolean']['output'];
  keyruneClass: Scalars['String']['output'];
  keyruneUnicode: Scalars['String']['output'];
  languages: Array<MGLanguage>;
  logoCode: Scalars['String']['output'];
  mtgoCode?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  releaseDate: Scalars['String']['output'];
  setBlock?: Maybe<MGSetBlock>;
  setParent?: Maybe<MGSet>;
  setType: MGSetType;
  tcgplayerId: Scalars['Int']['output'];
  yearSection: Scalars['String']['output'];
};

export type MGSetBlock = {
  __typename?: 'MGSetBlock';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type MGSetType = {
  __typename?: 'MGSetType';
  name: Scalars['String']['output'];
};

export type MGSets = {
  __typename?: 'MGSets';
  count: Scalars['Int']['output'];
  sets: Array<MGSet>;
};

export type Query = {
  __typename?: 'Query';
  setByCode?: Maybe<MGSet>;
  sets?: Maybe<MGSets>;
  setsByType?: Maybe<MGSets>;
};


export type QuerysetByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QuerysetsByTypeArgs = {
  type: Scalars['String']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MGLanguage: ResolverTypeWrapper<MGLanguage>;
  MGSet: ResolverTypeWrapper<MGSet>;
  MGSetBlock: ResolverTypeWrapper<MGSetBlock>;
  MGSetType: ResolverTypeWrapper<MGSetType>;
  MGSets: ResolverTypeWrapper<MGSets>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  MGLanguage: MGLanguage;
  MGSet: MGSet;
  MGSetBlock: MGSetBlock;
  MGSetType: MGSetType;
  MGSets: MGSets;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
};

export type MGLanguageResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGLanguage'] = ResolversParentTypes['MGLanguage']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  displayCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MGSetResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGSet'] = ResolversParentTypes['MGSet']> = {
  cardCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isFoilOnly?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isOnlineOnly?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  keyruneClass?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  keyruneUnicode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  languages?: Resolver<Array<ResolversTypes['MGLanguage']>, ParentType, ContextType>;
  logoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mtgoCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  releaseDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  setBlock?: Resolver<Maybe<ResolversTypes['MGSetBlock']>, ParentType, ContextType>;
  setParent?: Resolver<Maybe<ResolversTypes['MGSet']>, ParentType, ContextType>;
  setType?: Resolver<ResolversTypes['MGSetType'], ParentType, ContextType>;
  tcgplayerId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  yearSection?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MGSetBlockResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGSetBlock'] = ResolversParentTypes['MGSetBlock']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MGSetTypeResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGSetType'] = ResolversParentTypes['MGSetType']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MGSetsResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGSets'] = ResolversParentTypes['MGSets']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sets?: Resolver<Array<ResolversTypes['MGSet']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  setByCode?: Resolver<Maybe<ResolversTypes['MGSet']>, ParentType, ContextType, RequireFields<QuerysetByCodeArgs, 'code'>>;
  sets?: Resolver<Maybe<ResolversTypes['MGSets']>, ParentType, ContextType>;
  setsByType?: Resolver<Maybe<ResolversTypes['MGSets']>, ParentType, ContextType, RequireFields<QuerysetsByTypeArgs, 'type'>>;
};

export type Resolvers<ContextType = DataSourceContext> = {
  MGLanguage?: MGLanguageResolvers<ContextType>;
  MGSet?: MGSetResolvers<ContextType>;
  MGSetBlock?: MGSetBlockResolvers<ContextType>;
  MGSetType?: MGSetTypeResolvers<ContextType>;
  MGSets?: MGSetsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

