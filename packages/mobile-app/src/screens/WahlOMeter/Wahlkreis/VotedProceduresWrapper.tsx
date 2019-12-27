import React, { useContext, ReactElement } from 'react';
import unionBy from 'lodash.unionby';

// Components
import NoVotesPlaceholder from '../NoVotesPlaceholder';
import { FlatList } from 'react-native';
import VoteVarificationNoConstituency from '../../Bundestag/Procedure/Voting/components/NoConstituency';
import { LocalVotesContext } from '../../../context/LocalVotes';
import { useQuery } from '@apollo/react-hooks';
import { DEPUTY_CHART_DATA } from './graphql/query/deputyChartData';
import {
  DeputyChartData,
  DeputyChartDataVariables,
} from './graphql/query/__generated__/DeputyChartData';
import { DEPUTY_PROCEDURES } from './graphql/query/deputyProcedures';
import {
  DeputyProcedures,
  DeputyProceduresVariables,
  DeputyProcedures_deputyProcedures_procedures_procedure,
} from './graphql/query/__generated__/DeputyProcedures';
import { ListItem } from '@democracy-deutschland/mobile-ui/src/components/Lists/ListItem';
import { Row } from '@democracy-deutschland/mobile-ui/src/components/Lists/Row';
import { pieChartGovernmentData } from '../../../lib/helper/PieChartGovernmentData';
import { communityVoteData } from '../../../lib/helper/PieChartCommunityData';
import { ListLoading } from '@democracy-deutschland/mobile-ui/src/components/shared/ListLoading';
import { VoteSelection } from '../../../../__generated__/globalTypes';
import { ChainEntry } from '../../../lib/VotesLocal';

// GraphQL
// import GET_PROCEDURE_CHART_DATA from '../../../graphql/queries/getDeputyChartData';
// import GET_DEPUTY_PROCEDURES from '../../../graphql/queries/getDeputyProcedures';
// import VOTES_SELECTION_LOCAL from '../../../graphql/queries/local/votesSelection';
// import GET_CONSTITUENCY from '../../../graphql/queries/local/constituency';
// import VoteVarificationNoConstituency from '../../VoteVarification/NoConstituency';

export interface ChartData {
  votedProcedures: {
    procedureId: string;
    decision: VoteSelection;
  }[];
  localVotes: ChainEntry[];
}
interface ChildProps {
  deputy: {
    party: string | null;
    imgURL: string;
    constituency: string;
    name: string;
  };
  totalProcedures: number;
  chartData: ChartData;
}
interface Props {
  onProcedureListItemClick: ({
    item,
  }: {
    item: 'chart' | DeputyProcedures_deputyProcedures_procedures_procedure;
  }) => void;
  children: JSX.Element | ((props: ChildProps) => ReactElement);
}

const VotedProceduresWrapper: React.FC<Props> = ({
  onProcedureListItemClick,
  children,
}) => {
  const { localVotes } = useContext(LocalVotesContext);

  // TODO get constituency by context api
  const constituency = '103';

  const { data: proceduresData } = useQuery<
    DeputyChartData,
    DeputyChartDataVariables
  >(DEPUTY_CHART_DATA, {
    variables: {
      constituency,
      directCandidate: true,
      procedureIds: localVotes.map(({ procedureId }) => procedureId),
    },
  });

  const { data: procedurListData, fetchMore, networkStatus } = useQuery<
    DeputyProcedures,
    DeputyProceduresVariables
  >(DEPUTY_PROCEDURES, {
    variables: {
      constituency,
      directCandidate: true,
      offset: 0,
      pageSize: 10,
    },
  });

  if (!constituency) {
    return <VoteVarificationNoConstituency />;
  }

  let hasMore = true;
  if (localVotes.length === 0) {
    return <NoVotesPlaceholder subline="Wahlkreis" />;
  }
  let totalProcedures = 0;
  if (
    proceduresData &&
    proceduresData.chartData &&
    proceduresData.chartData[0] &&
    proceduresData.chartData[0].totalProcedures
  ) {
    totalProcedures = proceduresData.chartData[0].totalProcedures;
    const votedProcedures = proceduresData.chartData[0].procedures.map(
      ({ procedure, decision }) => ({
        procedureId: procedure.procedureId,
        decision,
      }),
    );
    const { party, imgURL, name } = proceduresData.chartData[0];
    const deputy = {
      party,
      imgURL,
      constituency,
      name,
    };
    if (
      !(
        procedurListData &&
        procedurListData.deputyProcedures &&
        procedurListData.deputyProcedures[0] &&
        procedurListData.deputyProcedures[0].procedures
      )
    ) {
      return null;
    }
    const listData =
      procedurListData &&
      procedurListData.deputyProcedures &&
      procedurListData.deputyProcedures[0] &&
      procedurListData.deputyProcedures[0].procedures
        ? procedurListData.deputyProcedures[0].procedures.map(
            ({ procedure }) => procedure,
          )
        : [];
    return (
      <FlatList<
        'chart' | DeputyProcedures_deputyProcedures_procedures_procedure
      >
        data={['chart', ...listData]}
        renderItem={({ item }) => {
          if (item === 'chart') {
            const renderedChild = (children as (
              props: ChildProps,
            ) => ReactElement)({
              deputy,
              totalProcedures,
              chartData: {
                votedProcedures,
                localVotes,
              },
            });
            return renderedChild;
          } else {
            return (
              <Row onPress={() => onProcedureListItemClick({ item })}>
                <ListItem
                  {...item}
                  votes={
                    item.communityVotes ? item.communityVotes.total || 0 : 0
                  }
                  governmentVotes={pieChartGovernmentData(item)}
                  communityVotes={communityVoteData(item)}
                />
              </Row>
            );
          }
        }}
        ListFooterComponent={() =>
          networkStatus === 3 ? <ListLoading /> : null
        }
        onEndReached={() =>
          hasMore &&
          listData.length > 0 &&
          fetchMore({
            variables: {
              offset: listData.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev;
              }
              if (
                hasMore &&
                fetchMoreResult.deputyProcedures[0].procedures.length === 0
              ) {
                hasMore = false;
              }

              return {
                ...prev,
                deputyProcedures: [
                  {
                    ...prev.deputyProcedures[0],
                    procedures: unionBy(
                      prev.deputyProcedures[0].procedures,
                      fetchMoreResult.deputyProcedures[0].procedures,
                      p => p.procedure.procedureId,
                    ),
                  },
                ],
              };
            },
          })
        }
        keyExtractor={item => (item === 'chart' ? item : item.procedureId)}
      />
    );
  }
  return <NoVotesPlaceholder subline="Wahlkreis" />;
};

export default VotedProceduresWrapper;
