import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type ActivityIndexKeySpecifier = ('activityIndex' | 'active' | ActivityIndexKeySpecifier)[];
export type ActivityIndexFieldPolicy = {
	activityIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	active?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuthKeySpecifier = ('token' | AuthKeySpecifier)[];
export type AuthFieldPolicy = {
	token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CodeResultKeySpecifier = ('reason' | 'allowNewUser' | 'succeeded' | 'resendTime' | 'expireTime' | CodeResultKeySpecifier)[];
export type CodeResultFieldPolicy = {
	reason?: FieldPolicy<any> | FieldReadFunction<any>,
	allowNewUser?: FieldPolicy<any> | FieldReadFunction<any>,
	succeeded?: FieldPolicy<any> | FieldReadFunction<any>,
	resendTime?: FieldPolicy<any> | FieldReadFunction<any>,
	expireTime?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CommunityConstituencyVotesKeySpecifier = ('constituency' | 'yes' | 'no' | 'abstination' | 'total' | CommunityConstituencyVotesKeySpecifier)[];
export type CommunityConstituencyVotesFieldPolicy = {
	constituency?: FieldPolicy<any> | FieldReadFunction<any>,
	yes?: FieldPolicy<any> | FieldReadFunction<any>,
	no?: FieldPolicy<any> | FieldReadFunction<any>,
	abstination?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CommunityVotesKeySpecifier = ('yes' | 'no' | 'abstination' | 'total' | 'constituencies' | CommunityVotesKeySpecifier)[];
export type CommunityVotesFieldPolicy = {
	yes?: FieldPolicy<any> | FieldReadFunction<any>,
	no?: FieldPolicy<any> | FieldReadFunction<any>,
	abstination?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	constituencies?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConferenceWeekKeySpecifier = ('start' | 'end' | 'calendarWeek' | ConferenceWeekKeySpecifier)[];
export type ConferenceWeekFieldPolicy = {
	start?: FieldPolicy<any> | FieldReadFunction<any>,
	end?: FieldPolicy<any> | FieldReadFunction<any>,
	calendarWeek?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeputiesResultKeySpecifier = ('total' | 'hasMore' | 'data' | DeputiesResultKeySpecifier)[];
export type DeputiesResultFieldPolicy = {
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeputyKeySpecifier = ('_id' | 'webId' | 'imgURL' | 'name' | 'party' | 'job' | 'biography' | 'constituency' | 'directCandidate' | 'contact' | 'totalProcedures' | 'procedures' | DeputyKeySpecifier)[];
export type DeputyFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	webId?: FieldPolicy<any> | FieldReadFunction<any>,
	imgURL?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	party?: FieldPolicy<any> | FieldReadFunction<any>,
	job?: FieldPolicy<any> | FieldReadFunction<any>,
	biography?: FieldPolicy<any> | FieldReadFunction<any>,
	constituency?: FieldPolicy<any> | FieldReadFunction<any>,
	directCandidate?: FieldPolicy<any> | FieldReadFunction<any>,
	contact?: FieldPolicy<any> | FieldReadFunction<any>,
	totalProcedures?: FieldPolicy<any> | FieldReadFunction<any>,
	procedures?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeputyContactKeySpecifier = ('address' | 'email' | 'links' | DeputyContactKeySpecifier)[];
export type DeputyContactFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	links?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeputyLinkKeySpecifier = ('name' | 'URL' | 'username' | DeputyLinkKeySpecifier)[];
export type DeputyLinkFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	URL?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeputyProcedureKeySpecifier = ('decision' | 'procedure' | DeputyProcedureKeySpecifier)[];
export type DeputyProcedureFieldPolicy = {
	decision?: FieldPolicy<any> | FieldReadFunction<any>,
	procedure?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeputyVoteKeySpecifier = ('deputy' | 'decision' | DeputyVoteKeySpecifier)[];
export type DeputyVoteFieldPolicy = {
	deputy?: FieldPolicy<any> | FieldReadFunction<any>,
	decision?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeviantsKeySpecifier = ('yes' | 'abstination' | 'no' | 'notVoted' | DeviantsKeySpecifier)[];
export type DeviantsFieldPolicy = {
	yes?: FieldPolicy<any> | FieldReadFunction<any>,
	abstination?: FieldPolicy<any> | FieldReadFunction<any>,
	no?: FieldPolicy<any> | FieldReadFunction<any>,
	notVoted?: FieldPolicy<any> | FieldReadFunction<any>
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
export type MutationKeySpecifier = ('increaseActivity' | 'requestCode' | 'requestVerification' | 'addToken' | 'updateNotificationSettings' | 'toggleNotification' | 'finishSearch' | 'signUp' | 'vote' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	increaseActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	requestCode?: FieldPolicy<any> | FieldReadFunction<any>,
	requestVerification?: FieldPolicy<any> | FieldReadFunction<any>,
	addToken?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNotificationSettings?: FieldPolicy<any> | FieldReadFunction<any>,
	toggleNotification?: FieldPolicy<any> | FieldReadFunction<any>,
	finishSearch?: FieldPolicy<any> | FieldReadFunction<any>,
	signUp?: FieldPolicy<any> | FieldReadFunction<any>,
	vote?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationSettingsKeySpecifier = ('enabled' | 'newVote' | 'newPreperation' | 'conferenceWeekPushs' | 'voteConferenceWeekPushs' | 'voteTOP100Pushs' | 'outcomePushs' | 'disableUntil' | 'procedures' | 'tags' | NotificationSettingsKeySpecifier)[];
export type NotificationSettingsFieldPolicy = {
	enabled?: FieldPolicy<any> | FieldReadFunction<any>,
	newVote?: FieldPolicy<any> | FieldReadFunction<any>,
	newPreperation?: FieldPolicy<any> | FieldReadFunction<any>,
	conferenceWeekPushs?: FieldPolicy<any> | FieldReadFunction<any>,
	voteConferenceWeekPushs?: FieldPolicy<any> | FieldReadFunction<any>,
	voteTOP100Pushs?: FieldPolicy<any> | FieldReadFunction<any>,
	outcomePushs?: FieldPolicy<any> | FieldReadFunction<any>,
	disableUntil?: FieldPolicy<any> | FieldReadFunction<any>,
	procedures?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PartyVoteKeySpecifier = ('party' | 'main' | 'deviants' | PartyVoteKeySpecifier)[];
export type PartyVoteFieldPolicy = {
	party?: FieldPolicy<any> | FieldReadFunction<any>,
	main?: FieldPolicy<any> | FieldReadFunction<any>,
	deviants?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProcedureKeySpecifier = ('_id' | 'title' | 'procedureId' | 'type' | 'period' | 'currentStatus' | 'currentStatusHistory' | 'abstract' | 'tags' | 'voteDate' | 'voteEnd' | 'voteWeek' | 'voteYear' | 'sessionTOPHeading' | 'subjectGroups' | 'submissionDate' | 'activityIndex' | 'votes' | 'importantDocuments' | 'voteResults' | 'communityVotes' | 'voted' | 'votedGovernment' | 'completed' | 'notify' | 'listType' | 'list' | 'verified' | ProcedureKeySpecifier)[];
export type ProcedureFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	procedureId?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	period?: FieldPolicy<any> | FieldReadFunction<any>,
	currentStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	currentStatusHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	abstract?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	voteDate?: FieldPolicy<any> | FieldReadFunction<any>,
	voteEnd?: FieldPolicy<any> | FieldReadFunction<any>,
	voteWeek?: FieldPolicy<any> | FieldReadFunction<any>,
	voteYear?: FieldPolicy<any> | FieldReadFunction<any>,
	sessionTOPHeading?: FieldPolicy<any> | FieldReadFunction<any>,
	subjectGroups?: FieldPolicy<any> | FieldReadFunction<any>,
	submissionDate?: FieldPolicy<any> | FieldReadFunction<any>,
	activityIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	votes?: FieldPolicy<any> | FieldReadFunction<any>,
	importantDocuments?: FieldPolicy<any> | FieldReadFunction<any>,
	voteResults?: FieldPolicy<any> | FieldReadFunction<any>,
	communityVotes?: FieldPolicy<any> | FieldReadFunction<any>,
	voted?: FieldPolicy<any> | FieldReadFunction<any>,
	votedGovernment?: FieldPolicy<any> | FieldReadFunction<any>,
	completed?: FieldPolicy<any> | FieldReadFunction<any>,
	notify?: FieldPolicy<any> | FieldReadFunction<any>,
	listType?: FieldPolicy<any> | FieldReadFunction<any>,
	list?: FieldPolicy<any> | FieldReadFunction<any>,
	verified?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProceduresHavingVoteResultsKeySpecifier = ('total' | 'procedures' | ProceduresHavingVoteResultsKeySpecifier)[];
export type ProceduresHavingVoteResultsFieldPolicy = {
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	procedures?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('activityIndex' | 'currentConferenceWeek' | 'deputiesOfConstituency' | 'deputies' | 'deputy' | 'notificationSettings' | 'procedure' | 'procedures' | 'proceduresById' | 'proceduresByIdHavingVoteResults' | 'notifiedProcedures' | 'searchProcedures' | 'searchProceduresAutocomplete' | 'votedProcedures' | 'proceduresWithVoteResults' | 'mostSearched' | 'me' | 'votes' | 'communityVotes' | 'voteStatistic' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	activityIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	currentConferenceWeek?: FieldPolicy<any> | FieldReadFunction<any>,
	deputiesOfConstituency?: FieldPolicy<any> | FieldReadFunction<any>,
	deputies?: FieldPolicy<any> | FieldReadFunction<any>,
	deputy?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationSettings?: FieldPolicy<any> | FieldReadFunction<any>,
	procedure?: FieldPolicy<any> | FieldReadFunction<any>,
	procedures?: FieldPolicy<any> | FieldReadFunction<any>,
	proceduresById?: FieldPolicy<any> | FieldReadFunction<any>,
	proceduresByIdHavingVoteResults?: FieldPolicy<any> | FieldReadFunction<any>,
	notifiedProcedures?: FieldPolicy<any> | FieldReadFunction<any>,
	searchProcedures?: FieldPolicy<any> | FieldReadFunction<any>,
	searchProceduresAutocomplete?: FieldPolicy<any> | FieldReadFunction<any>,
	votedProcedures?: FieldPolicy<any> | FieldReadFunction<any>,
	proceduresWithVoteResults?: FieldPolicy<any> | FieldReadFunction<any>,
	mostSearched?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	votes?: FieldPolicy<any> | FieldReadFunction<any>,
	communityVotes?: FieldPolicy<any> | FieldReadFunction<any>,
	voteStatistic?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SchemaKeySpecifier = ('query' | SchemaKeySpecifier)[];
export type SchemaFieldPolicy = {
	query?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SearchProceduresKeySpecifier = ('procedures' | 'autocomplete' | SearchProceduresKeySpecifier)[];
export type SearchProceduresFieldPolicy = {
	procedures?: FieldPolicy<any> | FieldReadFunction<any>,
	autocomplete?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SearchTermKeySpecifier = ('term' | SearchTermKeySpecifier)[];
export type SearchTermFieldPolicy = {
	term?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenResultKeySpecifier = ('succeeded' | TokenResultKeySpecifier)[];
export type TokenResultFieldPolicy = {
	succeeded?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('_id' | 'verified' | 'deviceHash' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	verified?: FieldPolicy<any> | FieldReadFunction<any>,
	deviceHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VerificationResultKeySpecifier = ('reason' | 'succeeded' | VerificationResultKeySpecifier)[];
export type VerificationResultFieldPolicy = {
	reason?: FieldPolicy<any> | FieldReadFunction<any>,
	succeeded?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VoteKeySpecifier = ('_id' | 'voted' | 'voteResults' | VoteKeySpecifier)[];
export type VoteFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	voted?: FieldPolicy<any> | FieldReadFunction<any>,
	voteResults?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VoteResultKeySpecifier = ('procedureId' | 'yes' | 'no' | 'abstination' | 'notVoted' | 'notVote' | 'governmentDecision' | 'decisionText' | 'namedVote' | 'partyVotes' | 'deputyVotes' | VoteResultKeySpecifier)[];
export type VoteResultFieldPolicy = {
	procedureId?: FieldPolicy<any> | FieldReadFunction<any>,
	yes?: FieldPolicy<any> | FieldReadFunction<any>,
	no?: FieldPolicy<any> | FieldReadFunction<any>,
	abstination?: FieldPolicy<any> | FieldReadFunction<any>,
	notVoted?: FieldPolicy<any> | FieldReadFunction<any>,
	notVote?: FieldPolicy<any> | FieldReadFunction<any>,
	governmentDecision?: FieldPolicy<any> | FieldReadFunction<any>,
	decisionText?: FieldPolicy<any> | FieldReadFunction<any>,
	namedVote?: FieldPolicy<any> | FieldReadFunction<any>,
	partyVotes?: FieldPolicy<any> | FieldReadFunction<any>,
	deputyVotes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VoteStatisticKeySpecifier = ('proceduresCount' | 'votedProcedures' | VoteStatisticKeySpecifier)[];
export type VoteStatisticFieldPolicy = {
	proceduresCount?: FieldPolicy<any> | FieldReadFunction<any>,
	votedProcedures?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
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