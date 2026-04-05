import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

/** Types */
export type MGArtist = {
  __typename?: 'MGArtist';
  firstName?: Maybe<Scalars['String']['output']>;
  info?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type MGCard = {
  __typename?: 'MGCard';
  arenaId?: Maybe<Scalars['String']['output']>;
  artCropURL?: Maybe<Scalars['String']['output']>;
  artists: Array<MGArtist>;
  cmc: Scalars['Int']['output'];
  collectorNumber: Scalars['String']['output'];
  colorIdentities: Array<MGColor>;
  colorIndicators: Array<MGColor>;
  colors: Array<MGColor>;
  componentParts: Array<MGCardComponent>;
  faceOrder: Scalars['Int']['output'];
  faces: Array<MGCard>;
  flavorText?: Maybe<Scalars['String']['output']>;
  formatLegalities: Array<MGCardFormatLegality>;
  frame?: Maybe<MGFrame>;
  frameEffects: Array<MGFrameEffect>;
  handModifier?: Maybe<Scalars['String']['output']>;
  isBooster: Scalars['Boolean']['output'];
  isDigital: Scalars['Boolean']['output'];
  isFoil: Scalars['Boolean']['output'];
  isFullArt: Scalars['Boolean']['output'];
  isHighresImage: Scalars['Boolean']['output'];
  isNonfoil: Scalars['Boolean']['output'];
  isOversized: Scalars['Boolean']['output'];
  isPromo: Scalars['Boolean']['output'];
  isReprint: Scalars['Boolean']['output'];
  isReserved: Scalars['Boolean']['output'];
  isStorySpotlight: Scalars['Boolean']['output'];
  isTextless: Scalars['Boolean']['output'];
  languages?: Maybe<MGLanguage>;
  layout?: Maybe<MGLayout>;
  lifeModifier?: Maybe<Scalars['String']['output']>;
  loyalty?: Maybe<Scalars['String']['output']>;
  manaCost?: Maybe<Scalars['String']['output']>;
  mtgoFoilId?: Maybe<Scalars['String']['output']>;
  mtgoId?: Maybe<Scalars['String']['output']>;
  multiverseIds?: Maybe<Array<Scalars['Int']['output']>>;
  name: Scalars['String']['output'];
  nameSection: Scalars['String']['output'];
  newId?: Maybe<Scalars['String']['output']>;
  normalURL?: Maybe<Scalars['String']['output']>;
  numberOrder: Scalars['Int']['output'];
  oracleText?: Maybe<Scalars['String']['output']>;
  otherLanguages: Array<MGCard>;
  otherPrintings: Array<MGCard>;
  pngURL?: Maybe<Scalars['String']['output']>;
  power?: Maybe<Scalars['String']['output']>;
  prices: Array<MGCardPrice>;
  printedName?: Maybe<Scalars['String']['output']>;
  printedText?: Maybe<Scalars['String']['output']>;
  printedTypeLine?: Maybe<Scalars['String']['output']>;
  rarity?: Maybe<MGRarity>;
  releasedAt: Scalars['DateTime']['output'];
  set?: Maybe<MGSet>;
  subtypes: Array<MGCardType>;
  supertypes: Array<MGCardType>;
  tcgplayerId?: Maybe<Scalars['Int']['output']>;
  toughness?: Maybe<Scalars['String']['output']>;
  typeLine: Scalars['String']['output'];
  variations: Array<MGCard>;
  watermark?: Maybe<MGWatermark>;
};

export type MGCardComponent = {
  __typename?: 'MGCardComponent';
  card: MGCard;
  component: MGComponent;
};

export type MGCardFormatLegality = {
  __typename?: 'MGCardFormatLegality';
  format: MGFormat;
  legality: MGLegality;
};

export type MGCardPrice = {
  __typename?: 'MGCardPrice';
  dateUpdated?: Maybe<Scalars['DateTime']['output']>;
  directLow?: Maybe<Scalars['Float']['output']>;
  high?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  isFoil?: Maybe<Scalars['Boolean']['output']>;
  low?: Maybe<Scalars['Float']['output']>;
  market?: Maybe<Scalars['Float']['output']>;
  median?: Maybe<Scalars['Float']['output']>;
};

export type MGCardType = {
  __typename?: 'MGCardType';
  name: Scalars['String']['output'];
  parent?: Maybe<MGCardType>;
};

export type MGColor = {
  __typename?: 'MGColor';
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type MGComponent = {
  __typename?: 'MGComponent';
  name: Scalars['String']['output'];
};

export type MGFormat = {
  __typename?: 'MGFormat';
  name: Scalars['String']['output'];
};

export type MGFrame = {
  __typename?: 'MGFrame';
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type MGFrameEffect = {
  __typename?: 'MGFrameEffect';
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type MGLanguage = {
  __typename?: 'MGLanguage';
  code: Scalars['String']['output'];
  displayCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type MGLayout = {
  __typename?: 'MGLayout';
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type MGLegality = {
  __typename?: 'MGLegality';
  name: Scalars['String']['output'];
};

export type MGRarity = {
  __typename?: 'MGRarity';
  name: Scalars['String']['output'];
};

export type MGRule = {
  __typename?: 'MGRule';
  definition: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  order: Scalars['Float']['output'];
  parent?: Maybe<MGRule>;
  term: Scalars['String']['output'];
};

export type MGRuling = {
  __typename?: 'MGRuling';
  datePublished: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  text: Scalars['String']['output'];
};

export type MGSet = {
  __typename?: 'MGSet';
  cardCount: Scalars['Int']['output'];
  cards: Array<MGCard>;
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

export type MGWatermark = {
  __typename?: 'MGWatermark';
  name: Scalars['String']['output'];
};

/** Queries */
export type Query = {
  __typename?: 'Query';
  cardByID?: Maybe<MGCard>;
  setByCode?: Maybe<MGSet>;
  sets?: Maybe<MGSets>;
  setsByType?: Maybe<MGSets>;
};


/** Queries */
export type QuerycardByIDArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


/** Queries */
export type QuerysetByCodeArgs = {
  input?: InputMaybe<SetByCodeInput>;
};


/** Queries */
export type QuerysetsByTypeArgs = {
  type: Scalars['String']['input'];
};

/** Inputs */
export type SetByCodeInput = {
  code: Scalars['String']['input'];
  language: Scalars['String']['input'];
  orderBy?: InputMaybe<Scalars['String']['input']>;
  sortedBy?: InputMaybe<Scalars['String']['input']>;
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
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MGArtist: ResolverTypeWrapper<MGArtist>;
  MGCard: ResolverTypeWrapper<MGCard>;
  MGCardComponent: ResolverTypeWrapper<MGCardComponent>;
  MGCardFormatLegality: ResolverTypeWrapper<MGCardFormatLegality>;
  MGCardPrice: ResolverTypeWrapper<MGCardPrice>;
  MGCardType: ResolverTypeWrapper<MGCardType>;
  MGColor: ResolverTypeWrapper<MGColor>;
  MGComponent: ResolverTypeWrapper<MGComponent>;
  MGFormat: ResolverTypeWrapper<MGFormat>;
  MGFrame: ResolverTypeWrapper<MGFrame>;
  MGFrameEffect: ResolverTypeWrapper<MGFrameEffect>;
  MGLanguage: ResolverTypeWrapper<MGLanguage>;
  MGLayout: ResolverTypeWrapper<MGLayout>;
  MGLegality: ResolverTypeWrapper<MGLegality>;
  MGRarity: ResolverTypeWrapper<MGRarity>;
  MGRule: ResolverTypeWrapper<MGRule>;
  MGRuling: ResolverTypeWrapper<MGRuling>;
  MGSet: ResolverTypeWrapper<MGSet>;
  MGSetBlock: ResolverTypeWrapper<MGSetBlock>;
  MGSetType: ResolverTypeWrapper<MGSetType>;
  MGSets: ResolverTypeWrapper<MGSets>;
  MGWatermark: ResolverTypeWrapper<MGWatermark>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  SetByCodeInput: SetByCodeInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  MGArtist: MGArtist;
  MGCard: MGCard;
  MGCardComponent: MGCardComponent;
  MGCardFormatLegality: MGCardFormatLegality;
  MGCardPrice: MGCardPrice;
  MGCardType: MGCardType;
  MGColor: MGColor;
  MGComponent: MGComponent;
  MGFormat: MGFormat;
  MGFrame: MGFrame;
  MGFrameEffect: MGFrameEffect;
  MGLanguage: MGLanguage;
  MGLayout: MGLayout;
  MGLegality: MGLegality;
  MGRarity: MGRarity;
  MGRule: MGRule;
  MGRuling: MGRuling;
  MGSet: MGSet;
  MGSetBlock: MGSetBlock;
  MGSetType: MGSetType;
  MGSets: MGSets;
  MGWatermark: MGWatermark;
  Query: Record<PropertyKey, never>;
  SetByCodeInput: SetByCodeInput;
  String: Scalars['String']['output'];
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MGArtistResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGArtist'] = ResolversParentTypes['MGArtist']> = {
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MGCardResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGCard'] = ResolversParentTypes['MGCard']> = {
  arenaId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artCropURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artists?: Resolver<Array<ResolversTypes['MGArtist']>, ParentType, ContextType>;
  cmc?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  collectorNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  colorIdentities?: Resolver<Array<ResolversTypes['MGColor']>, ParentType, ContextType>;
  colorIndicators?: Resolver<Array<ResolversTypes['MGColor']>, ParentType, ContextType>;
  colors?: Resolver<Array<ResolversTypes['MGColor']>, ParentType, ContextType>;
  componentParts?: Resolver<Array<ResolversTypes['MGCardComponent']>, ParentType, ContextType>;
  faceOrder?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  faces?: Resolver<Array<ResolversTypes['MGCard']>, ParentType, ContextType>;
  flavorText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  formatLegalities?: Resolver<Array<ResolversTypes['MGCardFormatLegality']>, ParentType, ContextType>;
  frame?: Resolver<Maybe<ResolversTypes['MGFrame']>, ParentType, ContextType>;
  frameEffects?: Resolver<Array<ResolversTypes['MGFrameEffect']>, ParentType, ContextType>;
  handModifier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isBooster?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isDigital?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isFoil?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isFullArt?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isHighresImage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isNonfoil?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isOversized?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isPromo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isReprint?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isReserved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isStorySpotlight?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isTextless?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  languages?: Resolver<Maybe<ResolversTypes['MGLanguage']>, ParentType, ContextType>;
  layout?: Resolver<Maybe<ResolversTypes['MGLayout']>, ParentType, ContextType>;
  lifeModifier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  loyalty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  manaCost?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mtgoFoilId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mtgoId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  multiverseIds?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameSection?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  newId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  normalURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numberOrder?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  oracleText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  otherLanguages?: Resolver<Array<ResolversTypes['MGCard']>, ParentType, ContextType>;
  otherPrintings?: Resolver<Array<ResolversTypes['MGCard']>, ParentType, ContextType>;
  pngURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  prices?: Resolver<Array<ResolversTypes['MGCardPrice']>, ParentType, ContextType>;
  printedName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  printedText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  printedTypeLine?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rarity?: Resolver<Maybe<ResolversTypes['MGRarity']>, ParentType, ContextType>;
  releasedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  set?: Resolver<Maybe<ResolversTypes['MGSet']>, ParentType, ContextType>;
  subtypes?: Resolver<Array<ResolversTypes['MGCardType']>, ParentType, ContextType>;
  supertypes?: Resolver<Array<ResolversTypes['MGCardType']>, ParentType, ContextType>;
  tcgplayerId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  toughness?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  typeLine?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  variations?: Resolver<Array<ResolversTypes['MGCard']>, ParentType, ContextType>;
  watermark?: Resolver<Maybe<ResolversTypes['MGWatermark']>, ParentType, ContextType>;
};

export type MGCardComponentResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGCardComponent'] = ResolversParentTypes['MGCardComponent']> = {
  card?: Resolver<ResolversTypes['MGCard'], ParentType, ContextType>;
  component?: Resolver<ResolversTypes['MGComponent'], ParentType, ContextType>;
};

export type MGCardFormatLegalityResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGCardFormatLegality'] = ResolversParentTypes['MGCardFormatLegality']> = {
  format?: Resolver<ResolversTypes['MGFormat'], ParentType, ContextType>;
  legality?: Resolver<ResolversTypes['MGLegality'], ParentType, ContextType>;
};

export type MGCardPriceResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGCardPrice'] = ResolversParentTypes['MGCardPrice']> = {
  dateUpdated?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  directLow?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  high?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isFoil?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  low?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  market?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  median?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type MGCardTypeResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGCardType'] = ResolversParentTypes['MGCardType']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['MGCardType']>, ParentType, ContextType>;
};

export type MGColorResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGColor'] = ResolversParentTypes['MGColor']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MGComponentResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGComponent'] = ResolversParentTypes['MGComponent']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MGFormatResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGFormat'] = ResolversParentTypes['MGFormat']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MGFrameResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGFrame'] = ResolversParentTypes['MGFrame']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MGFrameEffectResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGFrameEffect'] = ResolversParentTypes['MGFrameEffect']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MGLanguageResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGLanguage'] = ResolversParentTypes['MGLanguage']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  displayCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MGLayoutResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGLayout'] = ResolversParentTypes['MGLayout']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MGLegalityResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGLegality'] = ResolversParentTypes['MGLegality']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MGRarityResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGRarity'] = ResolversParentTypes['MGRarity']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MGRuleResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGRule'] = ResolversParentTypes['MGRule']> = {
  definition?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['MGRule']>, ParentType, ContextType>;
  term?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MGRulingResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGRuling'] = ResolversParentTypes['MGRuling']> = {
  datePublished?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MGSetResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGSet'] = ResolversParentTypes['MGSet']> = {
  cardCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  cards?: Resolver<Array<ResolversTypes['MGCard']>, ParentType, ContextType>;
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

export type MGWatermarkResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MGWatermark'] = ResolversParentTypes['MGWatermark']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  cardByID?: Resolver<Maybe<ResolversTypes['MGCard']>, ParentType, ContextType, Partial<QuerycardByIDArgs>>;
  setByCode?: Resolver<Maybe<ResolversTypes['MGSet']>, ParentType, ContextType, Partial<QuerysetByCodeArgs>>;
  sets?: Resolver<Maybe<ResolversTypes['MGSets']>, ParentType, ContextType>;
  setsByType?: Resolver<Maybe<ResolversTypes['MGSets']>, ParentType, ContextType, RequireFields<QuerysetsByTypeArgs, 'type'>>;
};

export type Resolvers<ContextType = DataSourceContext> = {
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  MGArtist?: MGArtistResolvers<ContextType>;
  MGCard?: MGCardResolvers<ContextType>;
  MGCardComponent?: MGCardComponentResolvers<ContextType>;
  MGCardFormatLegality?: MGCardFormatLegalityResolvers<ContextType>;
  MGCardPrice?: MGCardPriceResolvers<ContextType>;
  MGCardType?: MGCardTypeResolvers<ContextType>;
  MGColor?: MGColorResolvers<ContextType>;
  MGComponent?: MGComponentResolvers<ContextType>;
  MGFormat?: MGFormatResolvers<ContextType>;
  MGFrame?: MGFrameResolvers<ContextType>;
  MGFrameEffect?: MGFrameEffectResolvers<ContextType>;
  MGLanguage?: MGLanguageResolvers<ContextType>;
  MGLayout?: MGLayoutResolvers<ContextType>;
  MGLegality?: MGLegalityResolvers<ContextType>;
  MGRarity?: MGRarityResolvers<ContextType>;
  MGRule?: MGRuleResolvers<ContextType>;
  MGRuling?: MGRulingResolvers<ContextType>;
  MGSet?: MGSetResolvers<ContextType>;
  MGSetBlock?: MGSetBlockResolvers<ContextType>;
  MGSetType?: MGSetTypeResolvers<ContextType>;
  MGSets?: MGSetsResolvers<ContextType>;
  MGWatermark?: MGWatermarkResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

