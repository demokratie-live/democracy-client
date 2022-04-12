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
  Date: string;
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
  Top100 = 'TOP100'
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
  Voting = 'VOTING'
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
  Yes = 'YES'
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
  Period = 'Period'
}

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', _id: string, verified: boolean } | null };

export type AddTokenMutationVariables = Exact<{
  token: Scalars['String'];
  os: Scalars['String'];
}>;


export type AddTokenMutation = { __typename?: 'Mutation', addToken: { __typename?: 'TokenResult', succeeded?: boolean | null } };

export type UpdateNotificationSettingsMutationVariables = Exact<{
  enabled?: InputMaybe<Scalars['Boolean']>;
  conferenceWeekPushs?: InputMaybe<Scalars['Boolean']>;
  voteConferenceWeekPushs?: InputMaybe<Scalars['Boolean']>;
  voteTOP100Pushs?: InputMaybe<Scalars['Boolean']>;
  outcomePushs?: InputMaybe<Scalars['Boolean']>;
}>;


export type UpdateNotificationSettingsMutation = { __typename?: 'Mutation', updateNotificationSettings?: { __typename?: 'NotificationSettings', enabled?: boolean | null, conferenceWeekPushs?: boolean | null, voteConferenceWeekPushs?: boolean | null, voteTOP100Pushs?: boolean | null, outcomePushs?: boolean | null } | null };

export type NotificationSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationSettingsQuery = { __typename?: 'Query', notificationSettings?: { __typename?: 'NotificationSettings', enabled?: boolean | null, conferenceWeekPushs?: boolean | null, voteConferenceWeekPushs?: boolean | null, voteTOP100Pushs?: boolean | null, outcomePushs?: boolean | null } | null };

export type CurrentConferenceWeekQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentConferenceWeekQuery = { __typename?: 'Query', currentConferenceWeek: { __typename?: 'ConferenceWeek', start: string, end: string, calendarWeek: number } };

export type ProceduresListQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  listTypes?: InputMaybe<Array<ListType> | ListType>;
  sort?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ProcedureFilter>;
  constituencies?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  period: Scalars['Int'];
}>;


export type ProceduresListQuery = { __typename?: 'Query', procedures: Array<{ __typename?: 'Procedure', _id: string, title: string, procedureId: string, sessionTOPHeading?: string | null, subjectGroups: Array<string>, voteDate?: string | null, voteEnd?: string | null, list?: ListType | null, type: string, voteWeek?: number | null, voteYear?: number | null, votedGovernment?: boolean | null, voted: boolean, activityIndex: { __typename?: 'ActivityIndex', activityIndex: number }, voteResults?: { __typename?: 'VoteResult', yes: number, abstination: number, no: number, governmentDecision: VoteSelection } | null, communityVotes?: { __typename?: 'CommunityVotes', yes: number, abstination: number, no: number, total: number } | null }> };

export type RecommendedProceduresQueryVariables = Exact<{ [key: string]: never; }>;


export type RecommendedProceduresQuery = { __typename?: 'Query', recommendedProcedures: { __typename?: 'RecommendedProceduresResult', total: number, hasMore: boolean, data: Array<{ __typename?: 'RecommendationGroup', title: string, procedures: Array<{ __typename?: 'Procedure', _id: string, title: string, procedureId: string, sessionTOPHeading?: string | null, subjectGroups: Array<string>, voteDate?: string | null, voteEnd?: string | null, list?: ListType | null, type: string, voteWeek?: number | null, voteYear?: number | null, votedGovernment?: boolean | null, voted: boolean, activityIndex: { __typename?: 'ActivityIndex', activityIndex: number }, voteResults?: { __typename?: 'VoteResult', yes: number, abstination: number, no: number, governmentDecision: VoteSelection } | null, communityVotes?: { __typename?: 'CommunityVotes', yes: number, abstination: number, no: number, total: number } | null }> }> } };

export type FinishSearchMutationVariables = Exact<{
  term: Scalars['String'];
}>;


export type FinishSearchMutation = { __typename?: 'Mutation', finishSearch: { __typename?: 'SearchTerm', term: string } };

export type MostSearchedQueryVariables = Exact<{ [key: string]: never; }>;


export type MostSearchedQuery = { __typename?: 'Query', mostSearched: Array<{ __typename?: 'SearchTerm', term: string }> };

export type SearchProceduresQueryVariables = Exact<{
  term: Scalars['String'];
  period: Scalars['Int'];
}>;


export type SearchProceduresQuery = { __typename?: 'Query', searchProceduresAutocomplete: { __typename?: 'SearchProcedures', autocomplete: Array<string>, procedures: Array<{ __typename?: 'Procedure', _id: string, title: string, procedureId: string, sessionTOPHeading?: string | null, subjectGroups: Array<string>, tags: Array<string>, abstract?: string | null, voteDate?: string | null, votedGovernment?: boolean | null, submissionDate?: string | null, completed?: boolean | null, voted: boolean, type: string, voteResults?: { __typename?: 'VoteResult', yes: number, abstination: number, no: number, governmentDecision: VoteSelection } | null, communityVotes?: { __typename?: 'CommunityVotes', yes: number, abstination: number, no: number, total: number } | null }> } };

export type CountryMapConstituenciesQueryVariables = Exact<{
  procedureId: Scalars['ID'];
}>;


export type CountryMapConstituenciesQuery = { __typename?: 'Query', procedure: { __typename?: 'Procedure', procedureId: string, voted: boolean, communityVotes?: { __typename?: 'CommunityVotes', constituencies: Array<{ __typename?: 'CommunityConstituencyVotes', yes: number, no: number, abstination: number, total: number, constituency: string }> } | null } };

export type DeputyVoteResultsQueryVariables = Exact<{
  procedureId: Scalars['ID'];
  webIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeputyVoteResultsQuery = { __typename?: 'Query', procedure: { __typename?: 'Procedure', procedureId: string, voteResults?: { __typename?: 'VoteResult', deputyVotes: Array<{ __typename?: 'DeputyVote', decision: VoteSelection, deputy: { __typename?: 'Deputy', webId: string, imgURL: string, name: string, party?: string | null, constituency?: string | null } }> } | null } };

export type ToggleNotificationMutationVariables = Exact<{
  procedureId: Scalars['String'];
}>;


export type ToggleNotificationMutation = { __typename?: 'Mutation', toggleNotification?: { __typename?: 'Procedure', notify?: boolean | null } | null };

export type ProcedureQueryVariables = Exact<{
  id: Scalars['ID'];
  constituencies?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type ProcedureQuery = { __typename?: 'Query', procedure: { __typename?: 'Procedure', _id: string, procedureId: string, title: string, sessionTOPHeading?: string | null, tags: Array<string>, abstract?: string | null, voteDate?: string | null, voteEnd?: string | null, notify?: boolean | null, list?: ListType | null, type: string, subjectGroups: Array<string>, submissionDate?: string | null, currentStatus?: string | null, currentStatusHistory: Array<string>, voted: boolean, votedGovernment?: boolean | null, importantDocuments: Array<{ __typename?: 'Document', editor: string, type: string, url: string, number: string }>, communityVotes?: { __typename?: 'CommunityVotes', yes: number, abstination: number, no: number, total: number, constituencies: Array<{ __typename?: 'CommunityConstituencyVotes', yes: number, abstination: number, no: number, constituency: string, total: number }> } | null, voteResults?: { __typename?: 'VoteResult', yes: number, abstination: number, no: number, notVoted?: number | null, decisionText?: string | null, namedVote: boolean, governmentDecision: VoteSelection, partyVotes: Array<{ __typename?: 'PartyVote', main: VoteSelection, party: string, deviants: { __typename?: 'Deviants', yes: number, abstination: number, no: number, notVoted?: number | null } }> } | null } };

export type RequestSmsCodeMutationVariables = Exact<{
  newPhone: Scalars['String'];
  oldPhoneHash?: InputMaybe<Scalars['String']>;
}>;


export type RequestSmsCodeMutation = { __typename?: 'Mutation', requestCode: { __typename?: 'CodeResult', reason?: string | null, allowNewUser?: boolean | null, succeeded: boolean, resendTime?: string | null, expireTime?: string | null } };

export type RequestVerificationMutationVariables = Exact<{
  code: Scalars['String'];
  newPhoneHash: Scalars['String'];
  newUser?: InputMaybe<Scalars['Boolean']>;
}>;


export type RequestVerificationMutation = { __typename?: 'Mutation', requestVerification: { __typename?: 'VerificationResult', reason?: string | null, succeeded: boolean } };

export type VoteMutationVariables = Exact<{
  procedure: Scalars['ID'];
  selection: VoteSelection;
  constituency?: InputMaybe<Scalars['String']>;
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: { __typename?: 'Vote', voted: boolean } };

export type PartyChartDataQueryVariables = Exact<{
  procedureIds?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  period: Scalars['Int'];
  pageSize?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type PartyChartDataQuery = { __typename?: 'Query', partyChartProcedures: { __typename?: 'ProceduresHavingVoteResults', total: number, procedures: Array<{ __typename?: 'Procedure', _id: string, procedureId: string, voteResults?: { __typename?: 'VoteResult', governmentDecision: VoteSelection, partyVotes: Array<{ __typename?: 'PartyVote', party: string, main: VoteSelection }> } | null }> } };


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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const AddTokenDocument = gql`
    mutation AddToken($token: String!, $os: String!) {
  addToken(token: $token, os: $os) {
    succeeded
  }
}
    `;
export type AddTokenMutationFn = Apollo.MutationFunction<AddTokenMutation, AddTokenMutationVariables>;

/**
 * __useAddTokenMutation__
 *
 * To run a mutation, you first call `useAddTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTokenMutation, { data, loading, error }] = useAddTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *      os: // value for 'os'
 *   },
 * });
 */
export function useAddTokenMutation(baseOptions?: Apollo.MutationHookOptions<AddTokenMutation, AddTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTokenMutation, AddTokenMutationVariables>(AddTokenDocument, options);
      }
export type AddTokenMutationHookResult = ReturnType<typeof useAddTokenMutation>;
export type AddTokenMutationResult = Apollo.MutationResult<AddTokenMutation>;
export type AddTokenMutationOptions = Apollo.BaseMutationOptions<AddTokenMutation, AddTokenMutationVariables>;
export const UpdateNotificationSettingsDocument = gql`
    mutation UpdateNotificationSettings($enabled: Boolean, $conferenceWeekPushs: Boolean, $voteConferenceWeekPushs: Boolean, $voteTOP100Pushs: Boolean, $outcomePushs: Boolean) {
  updateNotificationSettings(
    enabled: $enabled
    conferenceWeekPushs: $conferenceWeekPushs
    voteConferenceWeekPushs: $voteConferenceWeekPushs
    voteTOP100Pushs: $voteTOP100Pushs
    outcomePushs: $outcomePushs
  ) {
    enabled
    conferenceWeekPushs
    voteConferenceWeekPushs
    voteTOP100Pushs
    outcomePushs
  }
}
    `;
export type UpdateNotificationSettingsMutationFn = Apollo.MutationFunction<UpdateNotificationSettingsMutation, UpdateNotificationSettingsMutationVariables>;

/**
 * __useUpdateNotificationSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationSettingsMutation, { data, loading, error }] = useUpdateNotificationSettingsMutation({
 *   variables: {
 *      enabled: // value for 'enabled'
 *      conferenceWeekPushs: // value for 'conferenceWeekPushs'
 *      voteConferenceWeekPushs: // value for 'voteConferenceWeekPushs'
 *      voteTOP100Pushs: // value for 'voteTOP100Pushs'
 *      outcomePushs: // value for 'outcomePushs'
 *   },
 * });
 */
export function useUpdateNotificationSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNotificationSettingsMutation, UpdateNotificationSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNotificationSettingsMutation, UpdateNotificationSettingsMutationVariables>(UpdateNotificationSettingsDocument, options);
      }
export type UpdateNotificationSettingsMutationHookResult = ReturnType<typeof useUpdateNotificationSettingsMutation>;
export type UpdateNotificationSettingsMutationResult = Apollo.MutationResult<UpdateNotificationSettingsMutation>;
export type UpdateNotificationSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateNotificationSettingsMutation, UpdateNotificationSettingsMutationVariables>;
export const NotificationSettingsDocument = gql`
    query NotificationSettings {
  notificationSettings {
    enabled
    conferenceWeekPushs
    voteConferenceWeekPushs
    voteTOP100Pushs
    outcomePushs
  }
}
    `;

/**
 * __useNotificationSettingsQuery__
 *
 * To run a query within a React component, call `useNotificationSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationSettingsQuery(baseOptions?: Apollo.QueryHookOptions<NotificationSettingsQuery, NotificationSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationSettingsQuery, NotificationSettingsQueryVariables>(NotificationSettingsDocument, options);
      }
export function useNotificationSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationSettingsQuery, NotificationSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationSettingsQuery, NotificationSettingsQueryVariables>(NotificationSettingsDocument, options);
        }
export type NotificationSettingsQueryHookResult = ReturnType<typeof useNotificationSettingsQuery>;
export type NotificationSettingsLazyQueryHookResult = ReturnType<typeof useNotificationSettingsLazyQuery>;
export type NotificationSettingsQueryResult = Apollo.QueryResult<NotificationSettingsQuery, NotificationSettingsQueryVariables>;
export const CurrentConferenceWeekDocument = gql`
    query CurrentConferenceWeek {
  currentConferenceWeek {
    start
    end
    calendarWeek
  }
}
    `;

/**
 * __useCurrentConferenceWeekQuery__
 *
 * To run a query within a React component, call `useCurrentConferenceWeekQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentConferenceWeekQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentConferenceWeekQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentConferenceWeekQuery(baseOptions?: Apollo.QueryHookOptions<CurrentConferenceWeekQuery, CurrentConferenceWeekQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentConferenceWeekQuery, CurrentConferenceWeekQueryVariables>(CurrentConferenceWeekDocument, options);
      }
export function useCurrentConferenceWeekLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentConferenceWeekQuery, CurrentConferenceWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentConferenceWeekQuery, CurrentConferenceWeekQueryVariables>(CurrentConferenceWeekDocument, options);
        }
export type CurrentConferenceWeekQueryHookResult = ReturnType<typeof useCurrentConferenceWeekQuery>;
export type CurrentConferenceWeekLazyQueryHookResult = ReturnType<typeof useCurrentConferenceWeekLazyQuery>;
export type CurrentConferenceWeekQueryResult = Apollo.QueryResult<CurrentConferenceWeekQuery, CurrentConferenceWeekQueryVariables>;
export const ProceduresListDocument = gql`
    query ProceduresList($offset: Int, $pageSize: Int, $listTypes: [ListType!], $sort: String, $filter: ProcedureFilter, $constituencies: [String!], $period: Int!) {
  procedures(
    offset: $offset
    pageSize: $pageSize
    listTypes: $listTypes
    sort: $sort
    filter: $filter
    period: $period
  ) {
    _id
    title
    procedureId
    sessionTOPHeading
    subjectGroups
    voteDate
    voteEnd
    list
    type
    voteWeek
    voteYear
    activityIndex {
      activityIndex
    }
    votedGovernment
    voted
    voteResults {
      yes
      abstination
      no
      governmentDecision
    }
    communityVotes(constituencies: $constituencies) {
      yes
      abstination
      no
      total
    }
  }
}
    `;

/**
 * __useProceduresListQuery__
 *
 * To run a query within a React component, call `useProceduresListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProceduresListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProceduresListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      pageSize: // value for 'pageSize'
 *      listTypes: // value for 'listTypes'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      constituencies: // value for 'constituencies'
 *      period: // value for 'period'
 *   },
 * });
 */
export function useProceduresListQuery(baseOptions: Apollo.QueryHookOptions<ProceduresListQuery, ProceduresListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProceduresListQuery, ProceduresListQueryVariables>(ProceduresListDocument, options);
      }
export function useProceduresListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProceduresListQuery, ProceduresListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProceduresListQuery, ProceduresListQueryVariables>(ProceduresListDocument, options);
        }
export type ProceduresListQueryHookResult = ReturnType<typeof useProceduresListQuery>;
export type ProceduresListLazyQueryHookResult = ReturnType<typeof useProceduresListLazyQuery>;
export type ProceduresListQueryResult = Apollo.QueryResult<ProceduresListQuery, ProceduresListQueryVariables>;
export const RecommendedProceduresDocument = gql`
    query RecommendedProcedures {
  recommendedProcedures {
    total
    hasMore
    data {
      title
      procedures {
        _id
        title
        procedureId
        sessionTOPHeading
        subjectGroups
        voteDate
        voteEnd
        list
        type
        voteWeek
        voteYear
        activityIndex {
          activityIndex
        }
        votedGovernment
        voted
        voteResults {
          yes
          abstination
          no
          governmentDecision
        }
        communityVotes {
          yes
          abstination
          no
          total
        }
      }
    }
  }
}
    `;

/**
 * __useRecommendedProceduresQuery__
 *
 * To run a query within a React component, call `useRecommendedProceduresQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendedProceduresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecommendedProceduresQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecommendedProceduresQuery(baseOptions?: Apollo.QueryHookOptions<RecommendedProceduresQuery, RecommendedProceduresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecommendedProceduresQuery, RecommendedProceduresQueryVariables>(RecommendedProceduresDocument, options);
      }
export function useRecommendedProceduresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecommendedProceduresQuery, RecommendedProceduresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecommendedProceduresQuery, RecommendedProceduresQueryVariables>(RecommendedProceduresDocument, options);
        }
export type RecommendedProceduresQueryHookResult = ReturnType<typeof useRecommendedProceduresQuery>;
export type RecommendedProceduresLazyQueryHookResult = ReturnType<typeof useRecommendedProceduresLazyQuery>;
export type RecommendedProceduresQueryResult = Apollo.QueryResult<RecommendedProceduresQuery, RecommendedProceduresQueryVariables>;
export const FinishSearchDocument = gql`
    mutation FinishSearch($term: String!) {
  finishSearch(term: $term) {
    term
  }
}
    `;
export type FinishSearchMutationFn = Apollo.MutationFunction<FinishSearchMutation, FinishSearchMutationVariables>;

/**
 * __useFinishSearchMutation__
 *
 * To run a mutation, you first call `useFinishSearchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinishSearchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finishSearchMutation, { data, loading, error }] = useFinishSearchMutation({
 *   variables: {
 *      term: // value for 'term'
 *   },
 * });
 */
export function useFinishSearchMutation(baseOptions?: Apollo.MutationHookOptions<FinishSearchMutation, FinishSearchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FinishSearchMutation, FinishSearchMutationVariables>(FinishSearchDocument, options);
      }
export type FinishSearchMutationHookResult = ReturnType<typeof useFinishSearchMutation>;
export type FinishSearchMutationResult = Apollo.MutationResult<FinishSearchMutation>;
export type FinishSearchMutationOptions = Apollo.BaseMutationOptions<FinishSearchMutation, FinishSearchMutationVariables>;
export const MostSearchedDocument = gql`
    query MostSearched {
  mostSearched {
    term
  }
}
    `;

/**
 * __useMostSearchedQuery__
 *
 * To run a query within a React component, call `useMostSearchedQuery` and pass it any options that fit your needs.
 * When your component renders, `useMostSearchedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMostSearchedQuery({
 *   variables: {
 *   },
 * });
 */
export function useMostSearchedQuery(baseOptions?: Apollo.QueryHookOptions<MostSearchedQuery, MostSearchedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MostSearchedQuery, MostSearchedQueryVariables>(MostSearchedDocument, options);
      }
export function useMostSearchedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MostSearchedQuery, MostSearchedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MostSearchedQuery, MostSearchedQueryVariables>(MostSearchedDocument, options);
        }
export type MostSearchedQueryHookResult = ReturnType<typeof useMostSearchedQuery>;
export type MostSearchedLazyQueryHookResult = ReturnType<typeof useMostSearchedLazyQuery>;
export type MostSearchedQueryResult = Apollo.QueryResult<MostSearchedQuery, MostSearchedQueryVariables>;
export const SearchProceduresDocument = gql`
    query SearchProcedures($term: String!, $period: Int!) {
  searchProceduresAutocomplete(term: $term, period: $period) {
    procedures {
      _id
      title
      procedureId
      sessionTOPHeading
      subjectGroups
      tags
      abstract
      voteDate
      votedGovernment
      submissionDate
      completed
      voted
      type
      voteResults {
        yes
        abstination
        no
        governmentDecision
      }
      communityVotes {
        yes
        abstination
        no
        total
      }
    }
    autocomplete
  }
}
    `;

/**
 * __useSearchProceduresQuery__
 *
 * To run a query within a React component, call `useSearchProceduresQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProceduresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProceduresQuery({
 *   variables: {
 *      term: // value for 'term'
 *      period: // value for 'period'
 *   },
 * });
 */
export function useSearchProceduresQuery(baseOptions: Apollo.QueryHookOptions<SearchProceduresQuery, SearchProceduresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchProceduresQuery, SearchProceduresQueryVariables>(SearchProceduresDocument, options);
      }
export function useSearchProceduresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProceduresQuery, SearchProceduresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchProceduresQuery, SearchProceduresQueryVariables>(SearchProceduresDocument, options);
        }
export type SearchProceduresQueryHookResult = ReturnType<typeof useSearchProceduresQuery>;
export type SearchProceduresLazyQueryHookResult = ReturnType<typeof useSearchProceduresLazyQuery>;
export type SearchProceduresQueryResult = Apollo.QueryResult<SearchProceduresQuery, SearchProceduresQueryVariables>;
export const CountryMapConstituenciesDocument = gql`
    query CountryMapConstituencies($procedureId: ID!) {
  procedure(id: $procedureId) {
    procedureId
    voted
    communityVotes {
      constituencies {
        yes
        no
        abstination
        total
        constituency
      }
    }
  }
}
    `;

/**
 * __useCountryMapConstituenciesQuery__
 *
 * To run a query within a React component, call `useCountryMapConstituenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountryMapConstituenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountryMapConstituenciesQuery({
 *   variables: {
 *      procedureId: // value for 'procedureId'
 *   },
 * });
 */
export function useCountryMapConstituenciesQuery(baseOptions: Apollo.QueryHookOptions<CountryMapConstituenciesQuery, CountryMapConstituenciesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountryMapConstituenciesQuery, CountryMapConstituenciesQueryVariables>(CountryMapConstituenciesDocument, options);
      }
export function useCountryMapConstituenciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountryMapConstituenciesQuery, CountryMapConstituenciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountryMapConstituenciesQuery, CountryMapConstituenciesQueryVariables>(CountryMapConstituenciesDocument, options);
        }
export type CountryMapConstituenciesQueryHookResult = ReturnType<typeof useCountryMapConstituenciesQuery>;
export type CountryMapConstituenciesLazyQueryHookResult = ReturnType<typeof useCountryMapConstituenciesLazyQuery>;
export type CountryMapConstituenciesQueryResult = Apollo.QueryResult<CountryMapConstituenciesQuery, CountryMapConstituenciesQueryVariables>;
export const DeputyVoteResultsDocument = gql`
    query DeputyVoteResults($procedureId: ID!, $webIds: [String!]!) {
  procedure(id: $procedureId) {
    procedureId
    voteResults {
      deputyVotes(webIds: $webIds) {
        deputy {
          webId
          imgURL
          name
          party
          constituency
        }
        decision
      }
    }
  }
}
    `;

/**
 * __useDeputyVoteResultsQuery__
 *
 * To run a query within a React component, call `useDeputyVoteResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeputyVoteResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeputyVoteResultsQuery({
 *   variables: {
 *      procedureId: // value for 'procedureId'
 *      webIds: // value for 'webIds'
 *   },
 * });
 */
export function useDeputyVoteResultsQuery(baseOptions: Apollo.QueryHookOptions<DeputyVoteResultsQuery, DeputyVoteResultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeputyVoteResultsQuery, DeputyVoteResultsQueryVariables>(DeputyVoteResultsDocument, options);
      }
export function useDeputyVoteResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeputyVoteResultsQuery, DeputyVoteResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeputyVoteResultsQuery, DeputyVoteResultsQueryVariables>(DeputyVoteResultsDocument, options);
        }
export type DeputyVoteResultsQueryHookResult = ReturnType<typeof useDeputyVoteResultsQuery>;
export type DeputyVoteResultsLazyQueryHookResult = ReturnType<typeof useDeputyVoteResultsLazyQuery>;
export type DeputyVoteResultsQueryResult = Apollo.QueryResult<DeputyVoteResultsQuery, DeputyVoteResultsQueryVariables>;
export const ToggleNotificationDocument = gql`
    mutation ToggleNotification($procedureId: String!) {
  toggleNotification(procedureId: $procedureId) {
    notify
  }
}
    `;
export type ToggleNotificationMutationFn = Apollo.MutationFunction<ToggleNotificationMutation, ToggleNotificationMutationVariables>;

/**
 * __useToggleNotificationMutation__
 *
 * To run a mutation, you first call `useToggleNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleNotificationMutation, { data, loading, error }] = useToggleNotificationMutation({
 *   variables: {
 *      procedureId: // value for 'procedureId'
 *   },
 * });
 */
export function useToggleNotificationMutation(baseOptions?: Apollo.MutationHookOptions<ToggleNotificationMutation, ToggleNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleNotificationMutation, ToggleNotificationMutationVariables>(ToggleNotificationDocument, options);
      }
export type ToggleNotificationMutationHookResult = ReturnType<typeof useToggleNotificationMutation>;
export type ToggleNotificationMutationResult = Apollo.MutationResult<ToggleNotificationMutation>;
export type ToggleNotificationMutationOptions = Apollo.BaseMutationOptions<ToggleNotificationMutation, ToggleNotificationMutationVariables>;
export const ProcedureDocument = gql`
    query Procedure($id: ID!, $constituencies: [String!]) {
  procedure(id: $id) {
    _id
    procedureId
    title
    sessionTOPHeading
    tags
    abstract
    voteDate
    voteEnd
    notify
    list
    type
    subjectGroups
    submissionDate
    currentStatus
    currentStatusHistory
    voted
    votedGovernment
    notify
    importantDocuments {
      editor
      type
      url
      number
    }
    communityVotes(constituencies: $constituencies) {
      yes
      abstination
      no
      total
      constituencies {
        yes
        abstination
        no
        constituency
        total
      }
    }
    voteResults {
      yes
      abstination
      no
      notVoted
      decisionText
      namedVote
      governmentDecision
      partyVotes {
        main
        party
        deviants {
          yes
          abstination
          no
          notVoted
        }
      }
    }
  }
}
    `;

/**
 * __useProcedureQuery__
 *
 * To run a query within a React component, call `useProcedureQuery` and pass it any options that fit your needs.
 * When your component renders, `useProcedureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProcedureQuery({
 *   variables: {
 *      id: // value for 'id'
 *      constituencies: // value for 'constituencies'
 *   },
 * });
 */
export function useProcedureQuery(baseOptions: Apollo.QueryHookOptions<ProcedureQuery, ProcedureQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProcedureQuery, ProcedureQueryVariables>(ProcedureDocument, options);
      }
export function useProcedureLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProcedureQuery, ProcedureQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProcedureQuery, ProcedureQueryVariables>(ProcedureDocument, options);
        }
export type ProcedureQueryHookResult = ReturnType<typeof useProcedureQuery>;
export type ProcedureLazyQueryHookResult = ReturnType<typeof useProcedureLazyQuery>;
export type ProcedureQueryResult = Apollo.QueryResult<ProcedureQuery, ProcedureQueryVariables>;
export const RequestSmsCodeDocument = gql`
    mutation RequestSmsCode($newPhone: String!, $oldPhoneHash: String) {
  requestCode(newPhone: $newPhone, oldPhoneHash: $oldPhoneHash) {
    reason
    allowNewUser
    succeeded
    resendTime
    expireTime
  }
}
    `;
export type RequestSmsCodeMutationFn = Apollo.MutationFunction<RequestSmsCodeMutation, RequestSmsCodeMutationVariables>;

/**
 * __useRequestSmsCodeMutation__
 *
 * To run a mutation, you first call `useRequestSmsCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestSmsCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestSmsCodeMutation, { data, loading, error }] = useRequestSmsCodeMutation({
 *   variables: {
 *      newPhone: // value for 'newPhone'
 *      oldPhoneHash: // value for 'oldPhoneHash'
 *   },
 * });
 */
export function useRequestSmsCodeMutation(baseOptions?: Apollo.MutationHookOptions<RequestSmsCodeMutation, RequestSmsCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestSmsCodeMutation, RequestSmsCodeMutationVariables>(RequestSmsCodeDocument, options);
      }
export type RequestSmsCodeMutationHookResult = ReturnType<typeof useRequestSmsCodeMutation>;
export type RequestSmsCodeMutationResult = Apollo.MutationResult<RequestSmsCodeMutation>;
export type RequestSmsCodeMutationOptions = Apollo.BaseMutationOptions<RequestSmsCodeMutation, RequestSmsCodeMutationVariables>;
export const RequestVerificationDocument = gql`
    mutation RequestVerification($code: String!, $newPhoneHash: String!, $newUser: Boolean) {
  requestVerification(code: $code, newPhoneHash: $newPhoneHash, newUser: $newUser) {
    reason
    succeeded
  }
}
    `;
export type RequestVerificationMutationFn = Apollo.MutationFunction<RequestVerificationMutation, RequestVerificationMutationVariables>;

/**
 * __useRequestVerificationMutation__
 *
 * To run a mutation, you first call `useRequestVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestVerificationMutation, { data, loading, error }] = useRequestVerificationMutation({
 *   variables: {
 *      code: // value for 'code'
 *      newPhoneHash: // value for 'newPhoneHash'
 *      newUser: // value for 'newUser'
 *   },
 * });
 */
export function useRequestVerificationMutation(baseOptions?: Apollo.MutationHookOptions<RequestVerificationMutation, RequestVerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestVerificationMutation, RequestVerificationMutationVariables>(RequestVerificationDocument, options);
      }
export type RequestVerificationMutationHookResult = ReturnType<typeof useRequestVerificationMutation>;
export type RequestVerificationMutationResult = Apollo.MutationResult<RequestVerificationMutation>;
export type RequestVerificationMutationOptions = Apollo.BaseMutationOptions<RequestVerificationMutation, RequestVerificationMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($procedure: ID!, $selection: VoteSelection!, $constituency: String) {
  vote(procedure: $procedure, selection: $selection, constituency: $constituency) {
    voted
  }
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      procedure: // value for 'procedure'
 *      selection: // value for 'selection'
 *      constituency: // value for 'constituency'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const PartyChartDataDocument = gql`
    query PartyChartData($procedureIds: [String!], $period: Int!, $pageSize: Int, $offset: Int) {
  partyChartProcedures: proceduresByIdHavingVoteResults(
    procedureIds: $procedureIds
    pageSize: $pageSize
    offset: $offset
    period: $period
  ) {
    total
    procedures {
      _id
      procedureId
      voteResults {
        governmentDecision
        partyVotes {
          party
          main
        }
      }
    }
  }
}
    `;

/**
 * __usePartyChartDataQuery__
 *
 * To run a query within a React component, call `usePartyChartDataQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartyChartDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartyChartDataQuery({
 *   variables: {
 *      procedureIds: // value for 'procedureIds'
 *      period: // value for 'period'
 *      pageSize: // value for 'pageSize'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function usePartyChartDataQuery(baseOptions: Apollo.QueryHookOptions<PartyChartDataQuery, PartyChartDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PartyChartDataQuery, PartyChartDataQueryVariables>(PartyChartDataDocument, options);
      }
export function usePartyChartDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PartyChartDataQuery, PartyChartDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PartyChartDataQuery, PartyChartDataQueryVariables>(PartyChartDataDocument, options);
        }
export type PartyChartDataQueryHookResult = ReturnType<typeof usePartyChartDataQuery>;
export type PartyChartDataLazyQueryHookResult = ReturnType<typeof usePartyChartDataLazyQuery>;
export type PartyChartDataQueryResult = Apollo.QueryResult<PartyChartDataQuery, PartyChartDataQueryVariables>;
export type ActivityIndexKeySpecifier = ('active' | 'activityIndex' | ActivityIndexKeySpecifier)[];
export type ActivityIndexFieldPolicy = {
	active?: FieldPolicy<any> | FieldReadFunction<any>,
	activityIndex?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuthKeySpecifier = ('token' | AuthKeySpecifier)[];
export type AuthFieldPolicy = {
	token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CodeResultKeySpecifier = ('allowNewUser' | 'expireTime' | 'reason' | 'resendTime' | 'succeeded' | CodeResultKeySpecifier)[];
export type CodeResultFieldPolicy = {
	allowNewUser?: FieldPolicy<any> | FieldReadFunction<any>,
	expireTime?: FieldPolicy<any> | FieldReadFunction<any>,
	reason?: FieldPolicy<any> | FieldReadFunction<any>,
	resendTime?: FieldPolicy<any> | FieldReadFunction<any>,
	succeeded?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CommunityConstituencyVotesKeySpecifier = ('abstination' | 'constituency' | 'no' | 'total' | 'yes' | CommunityConstituencyVotesKeySpecifier)[];
export type CommunityConstituencyVotesFieldPolicy = {
	abstination?: FieldPolicy<any> | FieldReadFunction<any>,
	constituency?: FieldPolicy<any> | FieldReadFunction<any>,
	no?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	yes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CommunityVotesKeySpecifier = ('abstination' | 'constituencies' | 'no' | 'total' | 'yes' | CommunityVotesKeySpecifier)[];
export type CommunityVotesFieldPolicy = {
	abstination?: FieldPolicy<any> | FieldReadFunction<any>,
	constituencies?: FieldPolicy<any> | FieldReadFunction<any>,
	no?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	yes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConferenceWeekKeySpecifier = ('calendarWeek' | 'end' | 'start' | ConferenceWeekKeySpecifier)[];
export type ConferenceWeekFieldPolicy = {
	calendarWeek?: FieldPolicy<any> | FieldReadFunction<any>,
	end?: FieldPolicy<any> | FieldReadFunction<any>,
	start?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeputiesResultKeySpecifier = ('data' | 'hasMore' | 'total' | DeputiesResultKeySpecifier)[];
export type DeputiesResultFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeputyKeySpecifier = ('_id' | 'biography' | 'constituency' | 'contact' | 'directCandidate' | 'imgURL' | 'job' | 'name' | 'party' | 'period' | 'procedures' | 'totalProcedures' | 'webId' | DeputyKeySpecifier)[];
export type DeputyFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	biography?: FieldPolicy<any> | FieldReadFunction<any>,
	constituency?: FieldPolicy<any> | FieldReadFunction<any>,
	contact?: FieldPolicy<any> | FieldReadFunction<any>,
	directCandidate?: FieldPolicy<any> | FieldReadFunction<any>,
	imgURL?: FieldPolicy<any> | FieldReadFunction<any>,
	job?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	party?: FieldPolicy<any> | FieldReadFunction<any>,
	period?: FieldPolicy<any> | FieldReadFunction<any>,
	procedures?: FieldPolicy<any> | FieldReadFunction<any>,
	totalProcedures?: FieldPolicy<any> | FieldReadFunction<any>,
	webId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeputyContactKeySpecifier = ('address' | 'email' | 'links' | DeputyContactKeySpecifier)[];
export type DeputyContactFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	links?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeputyLinkKeySpecifier = ('URL' | 'name' | 'username' | DeputyLinkKeySpecifier)[];
export type DeputyLinkFieldPolicy = {
	URL?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeputyProcedureKeySpecifier = ('decision' | 'procedure' | DeputyProcedureKeySpecifier)[];
export type DeputyProcedureFieldPolicy = {
	decision?: FieldPolicy<any> | FieldReadFunction<any>,
	procedure?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeputyVoteKeySpecifier = ('decision' | 'deputy' | DeputyVoteKeySpecifier)[];
export type DeputyVoteFieldPolicy = {
	decision?: FieldPolicy<any> | FieldReadFunction<any>,
	deputy?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeviantsKeySpecifier = ('abstination' | 'no' | 'notVoted' | 'yes' | DeviantsKeySpecifier)[];
export type DeviantsFieldPolicy = {
	abstination?: FieldPolicy<any> | FieldReadFunction<any>,
	no?: FieldPolicy<any> | FieldReadFunction<any>,
	notVoted?: FieldPolicy<any> | FieldReadFunction<any>,
	yes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeviceKeySpecifier = ('notificationSettings' | DeviceKeySpecifier)[];
export type DeviceFieldPolicy = {
	notificationSettings?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DocumentKeySpecifier = ('editor' | 'number' | 'type' | 'url' | DocumentKeySpecifier)[];
export type DocumentFieldPolicy = {
	editor?: FieldPolicy<any> | FieldReadFunction<any>,
	number?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('addToken' | 'finishSearch' | 'increaseActivity' | 'requestCode' | 'requestVerification' | 'signUp' | 'toggleNotification' | 'updateNotificationSettings' | 'vote' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	addToken?: FieldPolicy<any> | FieldReadFunction<any>,
	finishSearch?: FieldPolicy<any> | FieldReadFunction<any>,
	increaseActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	requestCode?: FieldPolicy<any> | FieldReadFunction<any>,
	requestVerification?: FieldPolicy<any> | FieldReadFunction<any>,
	signUp?: FieldPolicy<any> | FieldReadFunction<any>,
	toggleNotification?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNotificationSettings?: FieldPolicy<any> | FieldReadFunction<any>,
	vote?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationSettingsKeySpecifier = ('conferenceWeekPushs' | 'disableUntil' | 'enabled' | 'newPreperation' | 'newVote' | 'outcomePushs' | 'procedures' | 'tags' | 'voteConferenceWeekPushs' | 'voteTOP100Pushs' | NotificationSettingsKeySpecifier)[];
export type NotificationSettingsFieldPolicy = {
	conferenceWeekPushs?: FieldPolicy<any> | FieldReadFunction<any>,
	disableUntil?: FieldPolicy<any> | FieldReadFunction<any>,
	enabled?: FieldPolicy<any> | FieldReadFunction<any>,
	newPreperation?: FieldPolicy<any> | FieldReadFunction<any>,
	newVote?: FieldPolicy<any> | FieldReadFunction<any>,
	outcomePushs?: FieldPolicy<any> | FieldReadFunction<any>,
	procedures?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	voteConferenceWeekPushs?: FieldPolicy<any> | FieldReadFunction<any>,
	voteTOP100Pushs?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PartyVoteKeySpecifier = ('deviants' | 'main' | 'party' | PartyVoteKeySpecifier)[];
export type PartyVoteFieldPolicy = {
	deviants?: FieldPolicy<any> | FieldReadFunction<any>,
	main?: FieldPolicy<any> | FieldReadFunction<any>,
	party?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProcedureKeySpecifier = ('_id' | 'abstract' | 'activityIndex' | 'communityVotes' | 'completed' | 'currentStatus' | 'currentStatusHistory' | 'importantDocuments' | 'list' | 'listType' | 'notify' | 'period' | 'procedureId' | 'sessionTOPHeading' | 'subjectGroups' | 'submissionDate' | 'tags' | 'title' | 'type' | 'verified' | 'voteDate' | 'voteEnd' | 'voteResults' | 'voteWeek' | 'voteYear' | 'voted' | 'votedGovernment' | 'votes' | ProcedureKeySpecifier)[];
export type ProcedureFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	abstract?: FieldPolicy<any> | FieldReadFunction<any>,
	activityIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	communityVotes?: FieldPolicy<any> | FieldReadFunction<any>,
	completed?: FieldPolicy<any> | FieldReadFunction<any>,
	currentStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	currentStatusHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	importantDocuments?: FieldPolicy<any> | FieldReadFunction<any>,
	list?: FieldPolicy<any> | FieldReadFunction<any>,
	listType?: FieldPolicy<any> | FieldReadFunction<any>,
	notify?: FieldPolicy<any> | FieldReadFunction<any>,
	period?: FieldPolicy<any> | FieldReadFunction<any>,
	procedureId?: FieldPolicy<any> | FieldReadFunction<any>,
	sessionTOPHeading?: FieldPolicy<any> | FieldReadFunction<any>,
	subjectGroups?: FieldPolicy<any> | FieldReadFunction<any>,
	submissionDate?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	verified?: FieldPolicy<any> | FieldReadFunction<any>,
	voteDate?: FieldPolicy<any> | FieldReadFunction<any>,
	voteEnd?: FieldPolicy<any> | FieldReadFunction<any>,
	voteResults?: FieldPolicy<any> | FieldReadFunction<any>,
	voteWeek?: FieldPolicy<any> | FieldReadFunction<any>,
	voteYear?: FieldPolicy<any> | FieldReadFunction<any>,
	voted?: FieldPolicy<any> | FieldReadFunction<any>,
	votedGovernment?: FieldPolicy<any> | FieldReadFunction<any>,
	votes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProceduresHavingVoteResultsKeySpecifier = ('procedures' | 'total' | ProceduresHavingVoteResultsKeySpecifier)[];
export type ProceduresHavingVoteResultsFieldPolicy = {
	procedures?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('activityIndex' | 'communityVotes' | 'currentConferenceWeek' | 'deputies' | 'deputiesOfConstituency' | 'deputy' | 'me' | 'mostSearched' | 'notificationSettings' | 'notifiedProcedures' | 'procedure' | 'procedures' | 'proceduresById' | 'proceduresByIdHavingVoteResults' | 'proceduresWithVoteResults' | 'recommendedProcedures' | 'searchProcedures' | 'searchProceduresAutocomplete' | 'showRecommendations' | 'voteStatistic' | 'votedProcedures' | 'votes' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	activityIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	communityVotes?: FieldPolicy<any> | FieldReadFunction<any>,
	currentConferenceWeek?: FieldPolicy<any> | FieldReadFunction<any>,
	deputies?: FieldPolicy<any> | FieldReadFunction<any>,
	deputiesOfConstituency?: FieldPolicy<any> | FieldReadFunction<any>,
	deputy?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	mostSearched?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationSettings?: FieldPolicy<any> | FieldReadFunction<any>,
	notifiedProcedures?: FieldPolicy<any> | FieldReadFunction<any>,
	procedure?: FieldPolicy<any> | FieldReadFunction<any>,
	procedures?: FieldPolicy<any> | FieldReadFunction<any>,
	proceduresById?: FieldPolicy<any> | FieldReadFunction<any>,
	proceduresByIdHavingVoteResults?: FieldPolicy<any> | FieldReadFunction<any>,
	proceduresWithVoteResults?: FieldPolicy<any> | FieldReadFunction<any>,
	recommendedProcedures?: FieldPolicy<any> | FieldReadFunction<any>,
	searchProcedures?: FieldPolicy<any> | FieldReadFunction<any>,
	searchProceduresAutocomplete?: FieldPolicy<any> | FieldReadFunction<any>,
	showRecommendations?: FieldPolicy<any> | FieldReadFunction<any>,
	voteStatistic?: FieldPolicy<any> | FieldReadFunction<any>,
	votedProcedures?: FieldPolicy<any> | FieldReadFunction<any>,
	votes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RecommendationGroupKeySpecifier = ('procedures' | 'title' | RecommendationGroupKeySpecifier)[];
export type RecommendationGroupFieldPolicy = {
	procedures?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RecommendedProceduresResultKeySpecifier = ('data' | 'hasMore' | 'total' | RecommendedProceduresResultKeySpecifier)[];
export type RecommendedProceduresResultFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SchemaKeySpecifier = ('query' | SchemaKeySpecifier)[];
export type SchemaFieldPolicy = {
	query?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SearchProceduresKeySpecifier = ('autocomplete' | 'procedures' | SearchProceduresKeySpecifier)[];
export type SearchProceduresFieldPolicy = {
	autocomplete?: FieldPolicy<any> | FieldReadFunction<any>,
	procedures?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SearchTermKeySpecifier = ('term' | SearchTermKeySpecifier)[];
export type SearchTermFieldPolicy = {
	term?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenResultKeySpecifier = ('succeeded' | TokenResultKeySpecifier)[];
export type TokenResultFieldPolicy = {
	succeeded?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('_id' | 'deviceHash' | 'verified' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	deviceHash?: FieldPolicy<any> | FieldReadFunction<any>,
	verified?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VerificationResultKeySpecifier = ('reason' | 'succeeded' | VerificationResultKeySpecifier)[];
export type VerificationResultFieldPolicy = {
	reason?: FieldPolicy<any> | FieldReadFunction<any>,
	succeeded?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VoteKeySpecifier = ('_id' | 'voteResults' | 'voted' | VoteKeySpecifier)[];
export type VoteFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	voteResults?: FieldPolicy<any> | FieldReadFunction<any>,
	voted?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VoteResultKeySpecifier = ('abstination' | 'decisionText' | 'deputyVotes' | 'governmentDecision' | 'namedVote' | 'no' | 'notVote' | 'notVoted' | 'partyVotes' | 'procedureId' | 'yes' | VoteResultKeySpecifier)[];
export type VoteResultFieldPolicy = {
	abstination?: FieldPolicy<any> | FieldReadFunction<any>,
	decisionText?: FieldPolicy<any> | FieldReadFunction<any>,
	deputyVotes?: FieldPolicy<any> | FieldReadFunction<any>,
	governmentDecision?: FieldPolicy<any> | FieldReadFunction<any>,
	namedVote?: FieldPolicy<any> | FieldReadFunction<any>,
	no?: FieldPolicy<any> | FieldReadFunction<any>,
	notVote?: FieldPolicy<any> | FieldReadFunction<any>,
	notVoted?: FieldPolicy<any> | FieldReadFunction<any>,
	partyVotes?: FieldPolicy<any> | FieldReadFunction<any>,
	procedureId?: FieldPolicy<any> | FieldReadFunction<any>,
	yes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VoteStatisticKeySpecifier = ('proceduresCount' | 'votedProcedures' | VoteStatisticKeySpecifier)[];
export type VoteStatisticFieldPolicy = {
	proceduresCount?: FieldPolicy<any> | FieldReadFunction<any>,
	votedProcedures?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	ActivityIndex?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ActivityIndexKeySpecifier | (() => undefined | ActivityIndexKeySpecifier),
		fields?: ActivityIndexFieldPolicy,
	},
	Auth?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuthKeySpecifier | (() => undefined | AuthKeySpecifier),
		fields?: AuthFieldPolicy,
	},
	CodeResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CodeResultKeySpecifier | (() => undefined | CodeResultKeySpecifier),
		fields?: CodeResultFieldPolicy,
	},
	CommunityConstituencyVotes?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommunityConstituencyVotesKeySpecifier | (() => undefined | CommunityConstituencyVotesKeySpecifier),
		fields?: CommunityConstituencyVotesFieldPolicy,
	},
	CommunityVotes?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommunityVotesKeySpecifier | (() => undefined | CommunityVotesKeySpecifier),
		fields?: CommunityVotesFieldPolicy,
	},
	ConferenceWeek?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConferenceWeekKeySpecifier | (() => undefined | ConferenceWeekKeySpecifier),
		fields?: ConferenceWeekFieldPolicy,
	},
	DeputiesResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeputiesResultKeySpecifier | (() => undefined | DeputiesResultKeySpecifier),
		fields?: DeputiesResultFieldPolicy,
	},
	Deputy?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeputyKeySpecifier | (() => undefined | DeputyKeySpecifier),
		fields?: DeputyFieldPolicy,
	},
	DeputyContact?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeputyContactKeySpecifier | (() => undefined | DeputyContactKeySpecifier),
		fields?: DeputyContactFieldPolicy,
	},
	DeputyLink?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeputyLinkKeySpecifier | (() => undefined | DeputyLinkKeySpecifier),
		fields?: DeputyLinkFieldPolicy,
	},
	DeputyProcedure?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeputyProcedureKeySpecifier | (() => undefined | DeputyProcedureKeySpecifier),
		fields?: DeputyProcedureFieldPolicy,
	},
	DeputyVote?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeputyVoteKeySpecifier | (() => undefined | DeputyVoteKeySpecifier),
		fields?: DeputyVoteFieldPolicy,
	},
	Deviants?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeviantsKeySpecifier | (() => undefined | DeviantsKeySpecifier),
		fields?: DeviantsFieldPolicy,
	},
	Device?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeviceKeySpecifier | (() => undefined | DeviceKeySpecifier),
		fields?: DeviceFieldPolicy,
	},
	Document?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DocumentKeySpecifier | (() => undefined | DocumentKeySpecifier),
		fields?: DocumentFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	NotificationSettings?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationSettingsKeySpecifier | (() => undefined | NotificationSettingsKeySpecifier),
		fields?: NotificationSettingsFieldPolicy,
	},
	PartyVote?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PartyVoteKeySpecifier | (() => undefined | PartyVoteKeySpecifier),
		fields?: PartyVoteFieldPolicy,
	},
	Procedure?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProcedureKeySpecifier | (() => undefined | ProcedureKeySpecifier),
		fields?: ProcedureFieldPolicy,
	},
	ProceduresHavingVoteResults?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProceduresHavingVoteResultsKeySpecifier | (() => undefined | ProceduresHavingVoteResultsKeySpecifier),
		fields?: ProceduresHavingVoteResultsFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	RecommendationGroup?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RecommendationGroupKeySpecifier | (() => undefined | RecommendationGroupKeySpecifier),
		fields?: RecommendationGroupFieldPolicy,
	},
	RecommendedProceduresResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RecommendedProceduresResultKeySpecifier | (() => undefined | RecommendedProceduresResultKeySpecifier),
		fields?: RecommendedProceduresResultFieldPolicy,
	},
	Schema?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SchemaKeySpecifier | (() => undefined | SchemaKeySpecifier),
		fields?: SchemaFieldPolicy,
	},
	SearchProcedures?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SearchProceduresKeySpecifier | (() => undefined | SearchProceduresKeySpecifier),
		fields?: SearchProceduresFieldPolicy,
	},
	SearchTerm?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SearchTermKeySpecifier | (() => undefined | SearchTermKeySpecifier),
		fields?: SearchTermFieldPolicy,
	},
	TokenResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TokenResultKeySpecifier | (() => undefined | TokenResultKeySpecifier),
		fields?: TokenResultFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	VerificationResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VerificationResultKeySpecifier | (() => undefined | VerificationResultKeySpecifier),
		fields?: VerificationResultFieldPolicy,
	},
	Vote?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VoteKeySpecifier | (() => undefined | VoteKeySpecifier),
		fields?: VoteFieldPolicy,
	},
	VoteResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VoteResultKeySpecifier | (() => undefined | VoteResultKeySpecifier),
		fields?: VoteResultFieldPolicy,
	},
	VoteStatistic?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VoteStatisticKeySpecifier | (() => undefined | VoteStatisticKeySpecifier),
		fields?: VoteStatisticFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;