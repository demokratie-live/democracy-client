import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type ActivityIndex = {
  __typename?: 'ActivityIndex';
  active?: Maybe<Scalars['Boolean']>;
  activityIndex: Scalars['Int'];
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['String'];
};

export type CodeResult = {
  __typename?: 'CodeResult';
  allowNewUser?: Maybe<Scalars['Boolean']>;
  expireTime?: Maybe<Scalars['Date']>;
  reason?: Maybe<Scalars['String']>;
  resendTime?: Maybe<Scalars['Date']>;
  succeeded: Scalars['Boolean'];
};

export type CommunityConstituencyVotes = {
  __typename?: 'CommunityConstituencyVotes';
  abstination: Scalars['Int'];
  constituency: Scalars['String'];
  no: Scalars['Int'];
  total: Scalars['Int'];
  yes: Scalars['Int'];
};

export type CommunityVotes = {
  __typename?: 'CommunityVotes';
  abstination: Scalars['Int'];
  constituencies: Array<CommunityConstituencyVotes>;
  no: Scalars['Int'];
  total: Scalars['Int'];
  yes: Scalars['Int'];
};

export type ConferenceWeek = {
  __typename?: 'ConferenceWeek';
  calendarWeek: Scalars['Int'];
  end: Scalars['Date'];
  start: Scalars['Date'];
};

export type DeputiesResult = {
  __typename?: 'DeputiesResult';
  data: Array<Deputy>;
  hasMore: Scalars['Boolean'];
  total: Scalars['Int'];
};

export type Deputy = {
  __typename?: 'Deputy';
  _id: Scalars['ID'];
  biography?: Maybe<Scalars['String']>;
  constituency?: Maybe<Scalars['String']>;
  contact?: Maybe<DeputyContact>;
  directCandidate?: Maybe<Scalars['Boolean']>;
  imgURL: Scalars['String'];
  job?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  party?: Maybe<Scalars['String']>;
  period: Scalars['Int'];
  procedures: Array<DeputyProcedure>;
  totalProcedures?: Maybe<Scalars['Int']>;
  webId: Scalars['String'];
};

export type DeputyProceduresArgs = {
  offset?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  procedureIds?: InputMaybe<Array<Scalars['String']>>;
};

export type DeputyContact = {
  __typename?: 'DeputyContact';
  address?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  links: Array<DeputyLink>;
};

export type DeputyLink = {
  __typename?: 'DeputyLink';
  URL: Scalars['String'];
  name: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export type DeputyProcedure = {
  __typename?: 'DeputyProcedure';
  decision: VoteSelection;
  procedure: Procedure;
};

export type DeputyVote = {
  __typename?: 'DeputyVote';
  decision: VoteSelection;
  deputy: Deputy;
};

export type Deviants = {
  __typename?: 'Deviants';
  abstination: Scalars['Int'];
  no: Scalars['Int'];
  notVoted?: Maybe<Scalars['Int']>;
  yes: Scalars['Int'];
};

export type Device = {
  __typename?: 'Device';
  notificationSettings?: Maybe<NotificationSettings>;
};

export type Document = {
  __typename?: 'Document';
  editor: Scalars['String'];
  number: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export enum ListType {
  ConferenceweeksPlanned = 'CONFERENCEWEEKS_PLANNED',
  Hot = 'HOT',
  InVote = 'IN_VOTE',
  Past = 'PAST',
  Preparation = 'PREPARATION',
  Top100 = 'TOP100',
}

export type Mutation = {
  __typename?: 'Mutation';
  addToken: TokenResult;
  finishSearch: SearchTerm;
  increaseActivity?: Maybe<ActivityIndex>;
  requestCode: CodeResult;
  requestVerification: VerificationResult;
  signUp?: Maybe<Auth>;
  toggleNotification?: Maybe<Procedure>;
  updateNotificationSettings?: Maybe<NotificationSettings>;
  vote: Vote;
};

export type MutationAddTokenArgs = {
  os: Scalars['String'];
  token: Scalars['String'];
};

export type MutationFinishSearchArgs = {
  term: Scalars['String'];
};

export type MutationIncreaseActivityArgs = {
  procedureId: Scalars['String'];
};

export type MutationRequestCodeArgs = {
  newPhone: Scalars['String'];
  oldPhoneHash?: InputMaybe<Scalars['String']>;
};

export type MutationRequestVerificationArgs = {
  code: Scalars['String'];
  newPhoneHash: Scalars['String'];
  newUser?: InputMaybe<Scalars['Boolean']>;
};

export type MutationSignUpArgs = {
  deviceHashEncrypted: Scalars['String'];
};

export type MutationToggleNotificationArgs = {
  procedureId: Scalars['String'];
};

export type MutationUpdateNotificationSettingsArgs = {
  conferenceWeekPushs?: InputMaybe<Scalars['Boolean']>;
  disableUntil?: InputMaybe<Scalars['Date']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  newPreperation?: InputMaybe<Scalars['Boolean']>;
  newVote?: InputMaybe<Scalars['Boolean']>;
  outcomePushs?: InputMaybe<Scalars['Boolean']>;
  outcomePushsEnableOld?: InputMaybe<Scalars['Boolean']>;
  procedures?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  voteConferenceWeekPushs?: InputMaybe<Scalars['Boolean']>;
  voteTOP100Pushs?: InputMaybe<Scalars['Boolean']>;
};

export type MutationVoteArgs = {
  constituency?: InputMaybe<Scalars['String']>;
  procedure: Scalars['ID'];
  selection: VoteSelection;
};

export type NotificationSettings = {
  __typename?: 'NotificationSettings';
  conferenceWeekPushs?: Maybe<Scalars['Boolean']>;
  disableUntil?: Maybe<Scalars['Date']>;
  enabled?: Maybe<Scalars['Boolean']>;
  /** @deprecated <= 1.22 Notification Settings */
  newPreperation?: Maybe<Scalars['Boolean']>;
  /** @deprecated <= 1.22 Notification Settings */
  newVote?: Maybe<Scalars['Boolean']>;
  outcomePushs?: Maybe<Scalars['Boolean']>;
  procedures?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  voteConferenceWeekPushs?: Maybe<Scalars['Boolean']>;
  voteTOP100Pushs?: Maybe<Scalars['Boolean']>;
};

export type PartyVote = {
  __typename?: 'PartyVote';
  deviants: Deviants;
  main: VoteSelection;
  party: Scalars['String'];
};

export type Procedure = {
  __typename?: 'Procedure';
  _id: Scalars['ID'];
  abstract?: Maybe<Scalars['String']>;
  activityIndex: ActivityIndex;
  communityVotes?: Maybe<CommunityVotes>;
  completed?: Maybe<Scalars['Boolean']>;
  currentStatus?: Maybe<Scalars['String']>;
  currentStatusHistory: Array<Scalars['String']>;
  importantDocuments: Array<Document>;
  list?: Maybe<ListType>;
  /** @deprecated Use listTypes instead of type */
  listType?: Maybe<ProcedureType>;
  notify?: Maybe<Scalars['Boolean']>;
  period?: Maybe<Scalars['Int']>;
  procedureId: Scalars['String'];
  sessionTOPHeading?: Maybe<Scalars['String']>;
  subjectGroups: Array<Scalars['String']>;
  submissionDate?: Maybe<Scalars['Date']>;
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
  type: Scalars['String'];
  verified?: Maybe<Scalars['Boolean']>;
  voteDate?: Maybe<Scalars['Date']>;
  voteEnd?: Maybe<Scalars['Date']>;
  voteResults?: Maybe<VoteResult>;
  voteWeek?: Maybe<Scalars['Int']>;
  voteYear?: Maybe<Scalars['Int']>;
  voted: Scalars['Boolean'];
  votedGovernment?: Maybe<Scalars['Boolean']>;
  votes: Scalars['Int'];
};

export type ProcedureCommunityVotesArgs = {
  constituencies?: InputMaybe<Array<Scalars['String']>>;
};

export type ProcedureFilter = {
  activity?: InputMaybe<Array<Scalars['String']>>;
  status?: InputMaybe<Array<Scalars['String']>>;
  subjectGroups?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<Array<Scalars['String']>>;
};

export enum ProcedureType {
  Hot = 'HOT',
  InVote = 'IN_VOTE',
  Past = 'PAST',
  Preparation = 'PREPARATION',
  Voting = 'VOTING',
}

export type ProcedureWomFilter = {
  subjectGroups: Array<Scalars['String']>;
};

export type ProceduresHavingVoteResults = {
  __typename?: 'ProceduresHavingVoteResults';
  procedures: Array<Procedure>;
  total: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  activityIndex?: Maybe<ActivityIndex>;
  communityVotes?: Maybe<CommunityVotes>;
  currentConferenceWeek: ConferenceWeek;
  deputies: DeputiesResult;
  deputiesOfConstituency: Array<Deputy>;
  deputy?: Maybe<Deputy>;
  me?: Maybe<User>;
  mostSearched: Array<SearchTerm>;
  notificationSettings?: Maybe<NotificationSettings>;
  notifiedProcedures: Array<Procedure>;
  procedure: Procedure;
  procedures: Array<Procedure>;
  proceduresById: Array<Procedure>;
  proceduresByIdHavingVoteResults: ProceduresHavingVoteResults;
  proceduresWithVoteResults: Array<Procedure>;
  recommendedProcedures: RecommendedProceduresResult;
  /** @deprecated use searchProceduresAutocomplete */
  searchProcedures: Array<Procedure>;
  searchProceduresAutocomplete: SearchProcedures;
  showRecommendations: Scalars['Boolean'];
  voteStatistic?: Maybe<VoteStatistic>;
  votedProcedures: Array<Procedure>;
  votes?: Maybe<Vote>;
};

export type QueryActivityIndexArgs = {
  procedureId: Scalars['String'];
};

export type QueryCommunityVotesArgs = {
  constituencies?: InputMaybe<Array<Scalars['String']>>;
  procedure: Scalars['ID'];
};

export type QueryDeputiesArgs = {
  excludeIds?: InputMaybe<Array<Scalars['String']>>;
  filterConstituency?: InputMaybe<Scalars['String']>;
  filterIds?: InputMaybe<Array<Scalars['String']>>;
  filterTerm?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  period?: InputMaybe<Scalars['Int']>;
};

export type QueryDeputiesOfConstituencyArgs = {
  constituency: Scalars['String'];
  directCandidate?: InputMaybe<Scalars['Boolean']>;
  period?: InputMaybe<Scalars['Int']>;
};

export type QueryDeputyArgs = {
  id: Scalars['String'];
};

export type QueryProcedureArgs = {
  id: Scalars['ID'];
};

export type QueryProceduresArgs = {
  filter?: InputMaybe<ProcedureFilter>;
  listTypes?: InputMaybe<Array<ListType>>;
  offset?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  period?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ProcedureType>;
};

export type QueryProceduresByIdArgs = {
  ids: Array<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
};

export type QueryProceduresByIdHavingVoteResultsArgs = {
  filter?: InputMaybe<ProcedureWomFilter>;
  offset?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  period?: InputMaybe<Scalars['Int']>;
  procedureIds?: InputMaybe<Array<Scalars['String']>>;
  timespan?: InputMaybe<VotedTimeSpan>;
};

export type QueryProceduresWithVoteResultsArgs = {
  procedureIds: Array<Scalars['String']>;
};

export type QueryRecommendedProceduresArgs = {
  period?: InputMaybe<Scalars['Int']>;
};

export type QuerySearchProceduresArgs = {
  term: Scalars['String'];
};

export type QuerySearchProceduresAutocompleteArgs = {
  period?: InputMaybe<Scalars['Int']>;
  term: Scalars['String'];
};

export type QueryShowRecommendationsArgs = {
  period?: InputMaybe<Scalars['Int']>;
};

export type QueryVotesArgs = {
  constituencies?: InputMaybe<Array<Scalars['String']>>;
  procedure: Scalars['ID'];
};

export type RecommendationGroup = {
  __typename?: 'RecommendationGroup';
  procedures: Array<Procedure>;
  title: Scalars['String'];
};

export type RecommendedProceduresResult = {
  __typename?: 'RecommendedProceduresResult';
  data: Array<RecommendationGroup>;
  hasMore: Scalars['Boolean'];
  total: Scalars['Int'];
};

export type Schema = {
  __typename?: 'Schema';
  query?: Maybe<Query>;
};

export type SearchProcedures = {
  __typename?: 'SearchProcedures';
  autocomplete: Array<Scalars['String']>;
  procedures: Array<Procedure>;
};

export type SearchTerm = {
  __typename?: 'SearchTerm';
  term: Scalars['String'];
};

export type TokenResult = {
  __typename?: 'TokenResult';
  succeeded?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  /** @deprecated No longer supported */
  deviceHash?: Maybe<Scalars['String']>;
  verified: Scalars['Boolean'];
};

export type VerificationResult = {
  __typename?: 'VerificationResult';
  reason?: Maybe<Scalars['String']>;
  succeeded: Scalars['Boolean'];
};

export type Vote = {
  __typename?: 'Vote';
  _id: Scalars['ID'];
  voteResults?: Maybe<CommunityVotes>;
  voted: Scalars['Boolean'];
};

export type VoteResult = {
  __typename?: 'VoteResult';
  abstination: Scalars['Int'];
  decisionText?: Maybe<Scalars['String']>;
  deputyVotes: Array<DeputyVote>;
  governmentDecision: VoteSelection;
  namedVote: Scalars['Boolean'];
  no: Scalars['Int'];
  /** @deprecated No longer supported */
  notVote?: Maybe<Scalars['Int']>;
  notVoted?: Maybe<Scalars['Int']>;
  partyVotes: Array<PartyVote>;
  procedureId: Scalars['String'];
  yes: Scalars['Int'];
};

export type VoteResultDeputyVotesArgs = {
  constituencies?: InputMaybe<Array<Scalars['String']>>;
  directCandidate?: InputMaybe<Scalars['Boolean']>;
  webIds?: InputMaybe<Array<Scalars['String']>>;
};

export enum VoteSelection {
  Abstination = 'ABSTINATION',
  No = 'NO',
  Notvoted = 'NOTVOTED',
  Yes = 'YES',
}

export type VoteStatistic = {
  __typename?: 'VoteStatistic';
  proceduresCount: Scalars['Int'];
  votedProcedures: Scalars['Int'];
};

export enum VotedTimeSpan {
  CurrentQuarter = 'CurrentQuarter',
  CurrentSittingWeek = 'CurrentSittingWeek',
  CurrentYear = 'CurrentYear',
  LastQuarter = 'LastQuarter',
  LastSittingWeek = 'LastSittingWeek',
  LastYear = 'LastYear',
  Period = 'Period',
}

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: { __typename?: 'User'; _id: string; verified: boolean } | null;
};

export const MeDocument = gql`
  query Me {
    me {
      _id
      verified
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export type ActivityIndexKeySpecifier = ('active' | 'activityIndex' | ActivityIndexKeySpecifier)[];
export type ActivityIndexFieldPolicy = {
  active?: FieldPolicy<any> | FieldReadFunction<any>;
  activityIndex?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuthKeySpecifier = ('token' | AuthKeySpecifier)[];
export type AuthFieldPolicy = {
  token?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CodeResultKeySpecifier = (
  | 'allowNewUser'
  | 'expireTime'
  | 'reason'
  | 'resendTime'
  | 'succeeded'
  | CodeResultKeySpecifier
)[];
export type CodeResultFieldPolicy = {
  allowNewUser?: FieldPolicy<any> | FieldReadFunction<any>;
  expireTime?: FieldPolicy<any> | FieldReadFunction<any>;
  reason?: FieldPolicy<any> | FieldReadFunction<any>;
  resendTime?: FieldPolicy<any> | FieldReadFunction<any>;
  succeeded?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CommunityConstituencyVotesKeySpecifier = (
  | 'abstination'
  | 'constituency'
  | 'no'
  | 'total'
  | 'yes'
  | CommunityConstituencyVotesKeySpecifier
)[];
export type CommunityConstituencyVotesFieldPolicy = {
  abstination?: FieldPolicy<any> | FieldReadFunction<any>;
  constituency?: FieldPolicy<any> | FieldReadFunction<any>;
  no?: FieldPolicy<any> | FieldReadFunction<any>;
  total?: FieldPolicy<any> | FieldReadFunction<any>;
  yes?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CommunityVotesKeySpecifier = (
  | 'abstination'
  | 'constituencies'
  | 'no'
  | 'total'
  | 'yes'
  | CommunityVotesKeySpecifier
)[];
export type CommunityVotesFieldPolicy = {
  abstination?: FieldPolicy<any> | FieldReadFunction<any>;
  constituencies?: FieldPolicy<any> | FieldReadFunction<any>;
  no?: FieldPolicy<any> | FieldReadFunction<any>;
  total?: FieldPolicy<any> | FieldReadFunction<any>;
  yes?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ConferenceWeekKeySpecifier = (
  | 'calendarWeek'
  | 'end'
  | 'start'
  | ConferenceWeekKeySpecifier
)[];
export type ConferenceWeekFieldPolicy = {
  calendarWeek?: FieldPolicy<any> | FieldReadFunction<any>;
  end?: FieldPolicy<any> | FieldReadFunction<any>;
  start?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeputiesResultKeySpecifier = (
  | 'data'
  | 'hasMore'
  | 'total'
  | DeputiesResultKeySpecifier
)[];
export type DeputiesResultFieldPolicy = {
  data?: FieldPolicy<any> | FieldReadFunction<any>;
  hasMore?: FieldPolicy<any> | FieldReadFunction<any>;
  total?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeputyKeySpecifier = (
  | '_id'
  | 'biography'
  | 'constituency'
  | 'contact'
  | 'directCandidate'
  | 'imgURL'
  | 'job'
  | 'name'
  | 'party'
  | 'period'
  | 'procedures'
  | 'totalProcedures'
  | 'webId'
  | DeputyKeySpecifier
)[];
export type DeputyFieldPolicy = {
  _id?: FieldPolicy<any> | FieldReadFunction<any>;
  biography?: FieldPolicy<any> | FieldReadFunction<any>;
  constituency?: FieldPolicy<any> | FieldReadFunction<any>;
  contact?: FieldPolicy<any> | FieldReadFunction<any>;
  directCandidate?: FieldPolicy<any> | FieldReadFunction<any>;
  imgURL?: FieldPolicy<any> | FieldReadFunction<any>;
  job?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  party?: FieldPolicy<any> | FieldReadFunction<any>;
  period?: FieldPolicy<any> | FieldReadFunction<any>;
  procedures?: FieldPolicy<any> | FieldReadFunction<any>;
  totalProcedures?: FieldPolicy<any> | FieldReadFunction<any>;
  webId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeputyContactKeySpecifier = (
  | 'address'
  | 'email'
  | 'links'
  | DeputyContactKeySpecifier
)[];
export type DeputyContactFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  links?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeputyLinkKeySpecifier = ('URL' | 'name' | 'username' | DeputyLinkKeySpecifier)[];
export type DeputyLinkFieldPolicy = {
  URL?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  username?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeputyProcedureKeySpecifier = (
  | 'decision'
  | 'procedure'
  | DeputyProcedureKeySpecifier
)[];
export type DeputyProcedureFieldPolicy = {
  decision?: FieldPolicy<any> | FieldReadFunction<any>;
  procedure?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeputyVoteKeySpecifier = ('decision' | 'deputy' | DeputyVoteKeySpecifier)[];
export type DeputyVoteFieldPolicy = {
  decision?: FieldPolicy<any> | FieldReadFunction<any>;
  deputy?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeviantsKeySpecifier = (
  | 'abstination'
  | 'no'
  | 'notVoted'
  | 'yes'
  | DeviantsKeySpecifier
)[];
export type DeviantsFieldPolicy = {
  abstination?: FieldPolicy<any> | FieldReadFunction<any>;
  no?: FieldPolicy<any> | FieldReadFunction<any>;
  notVoted?: FieldPolicy<any> | FieldReadFunction<any>;
  yes?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeviceKeySpecifier = ('notificationSettings' | DeviceKeySpecifier)[];
export type DeviceFieldPolicy = {
  notificationSettings?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DocumentKeySpecifier = ('editor' | 'number' | 'type' | 'url' | DocumentKeySpecifier)[];
export type DocumentFieldPolicy = {
  editor?: FieldPolicy<any> | FieldReadFunction<any>;
  number?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | 'addToken'
  | 'finishSearch'
  | 'increaseActivity'
  | 'requestCode'
  | 'requestVerification'
  | 'signUp'
  | 'toggleNotification'
  | 'updateNotificationSettings'
  | 'vote'
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  addToken?: FieldPolicy<any> | FieldReadFunction<any>;
  finishSearch?: FieldPolicy<any> | FieldReadFunction<any>;
  increaseActivity?: FieldPolicy<any> | FieldReadFunction<any>;
  requestCode?: FieldPolicy<any> | FieldReadFunction<any>;
  requestVerification?: FieldPolicy<any> | FieldReadFunction<any>;
  signUp?: FieldPolicy<any> | FieldReadFunction<any>;
  toggleNotification?: FieldPolicy<any> | FieldReadFunction<any>;
  updateNotificationSettings?: FieldPolicy<any> | FieldReadFunction<any>;
  vote?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NotificationSettingsKeySpecifier = (
  | 'conferenceWeekPushs'
  | 'disableUntil'
  | 'enabled'
  | 'newPreperation'
  | 'newVote'
  | 'outcomePushs'
  | 'procedures'
  | 'tags'
  | 'voteConferenceWeekPushs'
  | 'voteTOP100Pushs'
  | NotificationSettingsKeySpecifier
)[];
export type NotificationSettingsFieldPolicy = {
  conferenceWeekPushs?: FieldPolicy<any> | FieldReadFunction<any>;
  disableUntil?: FieldPolicy<any> | FieldReadFunction<any>;
  enabled?: FieldPolicy<any> | FieldReadFunction<any>;
  newPreperation?: FieldPolicy<any> | FieldReadFunction<any>;
  newVote?: FieldPolicy<any> | FieldReadFunction<any>;
  outcomePushs?: FieldPolicy<any> | FieldReadFunction<any>;
  procedures?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
  voteConferenceWeekPushs?: FieldPolicy<any> | FieldReadFunction<any>;
  voteTOP100Pushs?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PartyVoteKeySpecifier = ('deviants' | 'main' | 'party' | PartyVoteKeySpecifier)[];
export type PartyVoteFieldPolicy = {
  deviants?: FieldPolicy<any> | FieldReadFunction<any>;
  main?: FieldPolicy<any> | FieldReadFunction<any>;
  party?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProcedureKeySpecifier = (
  | '_id'
  | 'abstract'
  | 'activityIndex'
  | 'communityVotes'
  | 'completed'
  | 'currentStatus'
  | 'currentStatusHistory'
  | 'importantDocuments'
  | 'list'
  | 'listType'
  | 'notify'
  | 'period'
  | 'procedureId'
  | 'sessionTOPHeading'
  | 'subjectGroups'
  | 'submissionDate'
  | 'tags'
  | 'title'
  | 'type'
  | 'verified'
  | 'voteDate'
  | 'voteEnd'
  | 'voteResults'
  | 'voteWeek'
  | 'voteYear'
  | 'voted'
  | 'votedGovernment'
  | 'votes'
  | ProcedureKeySpecifier
)[];
export type ProcedureFieldPolicy = {
  _id?: FieldPolicy<any> | FieldReadFunction<any>;
  abstract?: FieldPolicy<any> | FieldReadFunction<any>;
  activityIndex?: FieldPolicy<any> | FieldReadFunction<any>;
  communityVotes?: FieldPolicy<any> | FieldReadFunction<any>;
  completed?: FieldPolicy<any> | FieldReadFunction<any>;
  currentStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  currentStatusHistory?: FieldPolicy<any> | FieldReadFunction<any>;
  importantDocuments?: FieldPolicy<any> | FieldReadFunction<any>;
  list?: FieldPolicy<any> | FieldReadFunction<any>;
  listType?: FieldPolicy<any> | FieldReadFunction<any>;
  notify?: FieldPolicy<any> | FieldReadFunction<any>;
  period?: FieldPolicy<any> | FieldReadFunction<any>;
  procedureId?: FieldPolicy<any> | FieldReadFunction<any>;
  sessionTOPHeading?: FieldPolicy<any> | FieldReadFunction<any>;
  subjectGroups?: FieldPolicy<any> | FieldReadFunction<any>;
  submissionDate?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  verified?: FieldPolicy<any> | FieldReadFunction<any>;
  voteDate?: FieldPolicy<any> | FieldReadFunction<any>;
  voteEnd?: FieldPolicy<any> | FieldReadFunction<any>;
  voteResults?: FieldPolicy<any> | FieldReadFunction<any>;
  voteWeek?: FieldPolicy<any> | FieldReadFunction<any>;
  voteYear?: FieldPolicy<any> | FieldReadFunction<any>;
  voted?: FieldPolicy<any> | FieldReadFunction<any>;
  votedGovernment?: FieldPolicy<any> | FieldReadFunction<any>;
  votes?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProceduresHavingVoteResultsKeySpecifier = (
  | 'procedures'
  | 'total'
  | ProceduresHavingVoteResultsKeySpecifier
)[];
export type ProceduresHavingVoteResultsFieldPolicy = {
  procedures?: FieldPolicy<any> | FieldReadFunction<any>;
  total?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | 'activityIndex'
  | 'communityVotes'
  | 'currentConferenceWeek'
  | 'deputies'
  | 'deputiesOfConstituency'
  | 'deputy'
  | 'me'
  | 'mostSearched'
  | 'notificationSettings'
  | 'notifiedProcedures'
  | 'procedure'
  | 'procedures'
  | 'proceduresById'
  | 'proceduresByIdHavingVoteResults'
  | 'proceduresWithVoteResults'
  | 'recommendedProcedures'
  | 'searchProcedures'
  | 'searchProceduresAutocomplete'
  | 'showRecommendations'
  | 'voteStatistic'
  | 'votedProcedures'
  | 'votes'
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  activityIndex?: FieldPolicy<any> | FieldReadFunction<any>;
  communityVotes?: FieldPolicy<any> | FieldReadFunction<any>;
  currentConferenceWeek?: FieldPolicy<any> | FieldReadFunction<any>;
  deputies?: FieldPolicy<any> | FieldReadFunction<any>;
  deputiesOfConstituency?: FieldPolicy<any> | FieldReadFunction<any>;
  deputy?: FieldPolicy<any> | FieldReadFunction<any>;
  me?: FieldPolicy<any> | FieldReadFunction<any>;
  mostSearched?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationSettings?: FieldPolicy<any> | FieldReadFunction<any>;
  notifiedProcedures?: FieldPolicy<any> | FieldReadFunction<any>;
  procedure?: FieldPolicy<any> | FieldReadFunction<any>;
  procedures?: FieldPolicy<any> | FieldReadFunction<any>;
  proceduresById?: FieldPolicy<any> | FieldReadFunction<any>;
  proceduresByIdHavingVoteResults?: FieldPolicy<any> | FieldReadFunction<any>;
  proceduresWithVoteResults?: FieldPolicy<any> | FieldReadFunction<any>;
  recommendedProcedures?: FieldPolicy<any> | FieldReadFunction<any>;
  searchProcedures?: FieldPolicy<any> | FieldReadFunction<any>;
  searchProceduresAutocomplete?: FieldPolicy<any> | FieldReadFunction<any>;
  showRecommendations?: FieldPolicy<any> | FieldReadFunction<any>;
  voteStatistic?: FieldPolicy<any> | FieldReadFunction<any>;
  votedProcedures?: FieldPolicy<any> | FieldReadFunction<any>;
  votes?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RecommendationGroupKeySpecifier = (
  | 'procedures'
  | 'title'
  | RecommendationGroupKeySpecifier
)[];
export type RecommendationGroupFieldPolicy = {
  procedures?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RecommendedProceduresResultKeySpecifier = (
  | 'data'
  | 'hasMore'
  | 'total'
  | RecommendedProceduresResultKeySpecifier
)[];
export type RecommendedProceduresResultFieldPolicy = {
  data?: FieldPolicy<any> | FieldReadFunction<any>;
  hasMore?: FieldPolicy<any> | FieldReadFunction<any>;
  total?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SchemaKeySpecifier = ('query' | SchemaKeySpecifier)[];
export type SchemaFieldPolicy = {
  query?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SearchProceduresKeySpecifier = (
  | 'autocomplete'
  | 'procedures'
  | SearchProceduresKeySpecifier
)[];
export type SearchProceduresFieldPolicy = {
  autocomplete?: FieldPolicy<any> | FieldReadFunction<any>;
  procedures?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SearchTermKeySpecifier = ('term' | SearchTermKeySpecifier)[];
export type SearchTermFieldPolicy = {
  term?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TokenResultKeySpecifier = ('succeeded' | TokenResultKeySpecifier)[];
export type TokenResultFieldPolicy = {
  succeeded?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = ('_id' | 'deviceHash' | 'verified' | UserKeySpecifier)[];
export type UserFieldPolicy = {
  _id?: FieldPolicy<any> | FieldReadFunction<any>;
  deviceHash?: FieldPolicy<any> | FieldReadFunction<any>;
  verified?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type VerificationResultKeySpecifier = (
  | 'reason'
  | 'succeeded'
  | VerificationResultKeySpecifier
)[];
export type VerificationResultFieldPolicy = {
  reason?: FieldPolicy<any> | FieldReadFunction<any>;
  succeeded?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type VoteKeySpecifier = ('_id' | 'voteResults' | 'voted' | VoteKeySpecifier)[];
export type VoteFieldPolicy = {
  _id?: FieldPolicy<any> | FieldReadFunction<any>;
  voteResults?: FieldPolicy<any> | FieldReadFunction<any>;
  voted?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type VoteResultKeySpecifier = (
  | 'abstination'
  | 'decisionText'
  | 'deputyVotes'
  | 'governmentDecision'
  | 'namedVote'
  | 'no'
  | 'notVote'
  | 'notVoted'
  | 'partyVotes'
  | 'procedureId'
  | 'yes'
  | VoteResultKeySpecifier
)[];
export type VoteResultFieldPolicy = {
  abstination?: FieldPolicy<any> | FieldReadFunction<any>;
  decisionText?: FieldPolicy<any> | FieldReadFunction<any>;
  deputyVotes?: FieldPolicy<any> | FieldReadFunction<any>;
  governmentDecision?: FieldPolicy<any> | FieldReadFunction<any>;
  namedVote?: FieldPolicy<any> | FieldReadFunction<any>;
  no?: FieldPolicy<any> | FieldReadFunction<any>;
  notVote?: FieldPolicy<any> | FieldReadFunction<any>;
  notVoted?: FieldPolicy<any> | FieldReadFunction<any>;
  partyVotes?: FieldPolicy<any> | FieldReadFunction<any>;
  procedureId?: FieldPolicy<any> | FieldReadFunction<any>;
  yes?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type VoteStatisticKeySpecifier = (
  | 'proceduresCount'
  | 'votedProcedures'
  | VoteStatisticKeySpecifier
)[];
export type VoteStatisticFieldPolicy = {
  proceduresCount?: FieldPolicy<any> | FieldReadFunction<any>;
  votedProcedures?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StrictTypedTypePolicies = {
  ActivityIndex?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ActivityIndexKeySpecifier | (() => undefined | ActivityIndexKeySpecifier);
    fields?: ActivityIndexFieldPolicy;
  };
  Auth?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | AuthKeySpecifier | (() => undefined | AuthKeySpecifier);
    fields?: AuthFieldPolicy;
  };
  CodeResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CodeResultKeySpecifier | (() => undefined | CodeResultKeySpecifier);
    fields?: CodeResultFieldPolicy;
  };
  CommunityConstituencyVotes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CommunityConstituencyVotesKeySpecifier
      | (() => undefined | CommunityConstituencyVotesKeySpecifier);
    fields?: CommunityConstituencyVotesFieldPolicy;
  };
  CommunityVotes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CommunityVotesKeySpecifier | (() => undefined | CommunityVotesKeySpecifier);
    fields?: CommunityVotesFieldPolicy;
  };
  ConferenceWeek?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ConferenceWeekKeySpecifier | (() => undefined | ConferenceWeekKeySpecifier);
    fields?: ConferenceWeekFieldPolicy;
  };
  DeputiesResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | DeputiesResultKeySpecifier | (() => undefined | DeputiesResultKeySpecifier);
    fields?: DeputiesResultFieldPolicy;
  };
  Deputy?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | DeputyKeySpecifier | (() => undefined | DeputyKeySpecifier);
    fields?: DeputyFieldPolicy;
  };
  DeputyContact?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | DeputyContactKeySpecifier | (() => undefined | DeputyContactKeySpecifier);
    fields?: DeputyContactFieldPolicy;
  };
  DeputyLink?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | DeputyLinkKeySpecifier | (() => undefined | DeputyLinkKeySpecifier);
    fields?: DeputyLinkFieldPolicy;
  };
  DeputyProcedure?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeputyProcedureKeySpecifier
      | (() => undefined | DeputyProcedureKeySpecifier);
    fields?: DeputyProcedureFieldPolicy;
  };
  DeputyVote?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | DeputyVoteKeySpecifier | (() => undefined | DeputyVoteKeySpecifier);
    fields?: DeputyVoteFieldPolicy;
  };
  Deviants?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | DeviantsKeySpecifier | (() => undefined | DeviantsKeySpecifier);
    fields?: DeviantsFieldPolicy;
  };
  Device?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | DeviceKeySpecifier | (() => undefined | DeviceKeySpecifier);
    fields?: DeviceFieldPolicy;
  };
  Document?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | DocumentKeySpecifier | (() => undefined | DocumentKeySpecifier);
    fields?: DocumentFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  NotificationSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | NotificationSettingsKeySpecifier
      | (() => undefined | NotificationSettingsKeySpecifier);
    fields?: NotificationSettingsFieldPolicy;
  };
  PartyVote?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PartyVoteKeySpecifier | (() => undefined | PartyVoteKeySpecifier);
    fields?: PartyVoteFieldPolicy;
  };
  Procedure?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ProcedureKeySpecifier | (() => undefined | ProcedureKeySpecifier);
    fields?: ProcedureFieldPolicy;
  };
  ProceduresHavingVoteResults?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProceduresHavingVoteResultsKeySpecifier
      | (() => undefined | ProceduresHavingVoteResultsKeySpecifier);
    fields?: ProceduresHavingVoteResultsFieldPolicy;
  };
  Query?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier);
    fields?: QueryFieldPolicy;
  };
  RecommendationGroup?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RecommendationGroupKeySpecifier
      | (() => undefined | RecommendationGroupKeySpecifier);
    fields?: RecommendationGroupFieldPolicy;
  };
  RecommendedProceduresResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RecommendedProceduresResultKeySpecifier
      | (() => undefined | RecommendedProceduresResultKeySpecifier);
    fields?: RecommendedProceduresResultFieldPolicy;
  };
  Schema?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SchemaKeySpecifier | (() => undefined | SchemaKeySpecifier);
    fields?: SchemaFieldPolicy;
  };
  SearchProcedures?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SearchProceduresKeySpecifier
      | (() => undefined | SearchProceduresKeySpecifier);
    fields?: SearchProceduresFieldPolicy;
  };
  SearchTerm?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SearchTermKeySpecifier | (() => undefined | SearchTermKeySpecifier);
    fields?: SearchTermFieldPolicy;
  };
  TokenResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | TokenResultKeySpecifier | (() => undefined | TokenResultKeySpecifier);
    fields?: TokenResultFieldPolicy;
  };
  User?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier);
    fields?: UserFieldPolicy;
  };
  VerificationResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | VerificationResultKeySpecifier
      | (() => undefined | VerificationResultKeySpecifier);
    fields?: VerificationResultFieldPolicy;
  };
  Vote?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | VoteKeySpecifier | (() => undefined | VoteKeySpecifier);
    fields?: VoteFieldPolicy;
  };
  VoteResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | VoteResultKeySpecifier | (() => undefined | VoteResultKeySpecifier);
    fields?: VoteResultFieldPolicy;
  };
  VoteStatistic?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | VoteStatisticKeySpecifier | (() => undefined | VoteStatisticKeySpecifier);
    fields?: VoteStatisticFieldPolicy;
  };
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
