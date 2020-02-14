import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import unionBy from 'lodash.unionby';

// GraphQL
import { FlatList } from 'react-native';
import { ListLoading } from '@democracy-deutschland/mobile-ui/src/components/shared/ListLoading';
import { ListItem } from '@democracy-deutschland/mobile-ui/src/components/Lists/ListItem';
import { Row } from '@democracy-deutschland/mobile-ui/src/components/Lists/Row';
import { LocalVotesContext } from '../../../context/LocalVotes';
import { useQuery } from '@apollo/react-hooks';
import { pieChartGovernmentDataLargeParty } from '../../../lib/helper/PieChartGovernmentData';
import { communityVoteData } from '../../../lib/helper/PieChartCommunityData';
import { ChainEntry } from '../../../lib/VotesLocal';
import { WOM_PARTY_DATA } from './graphql/query/womPartyData';
import {
  WomPartyData,
  WomPartyDataVariables,
  WomPartyData_proceduresByIdHavingVoteResults_procedures,
} from './graphql/query/__generated__/WomPartyData';

const Container = styled.View`
  background-color: #fff;
`;

export interface ChartData {
  votedProcedures: WomPartyData;
  localVotes: ChainEntry[];
}
interface ChildProps {
  totalProcedures: number;
  chartData: ChartData;
}
interface Props {
  onProcedureListItemClick: ({
    item,
  }: {
    item: WomPartyData_proceduresByIdHavingVoteResults_procedures;
  }) => void;
  Chart: JSX.Element;
  party: string;
}

const FraktionenList: React.FC<Props> = ({
  onProcedureListItemClick,
  Chart,
  party,
}) => {
  useEffect(() => {
    console.log('Mount');
  }, []);
  const { getLocalVoteSelection } = useContext(LocalVotesContext);

  const {
    data: procedurListData,
    loading,
    fetchMore,
    networkStatus,
    refetch,
  } = useQuery<WomPartyData, WomPartyDataVariables>(WOM_PARTY_DATA, {
    variables: { procedureIds: null, offset: 0 },
  });
  let hasMore = true;
  const listData =
    procedurListData &&
    procedurListData.proceduresByIdHavingVoteResults &&
    procedurListData.proceduresByIdHavingVoteResults.procedures
      ? procedurListData.proceduresByIdHavingVoteResults.procedures
      : [];

  return (
    <Container>
      <FlatList<WomPartyData_proceduresByIdHavingVoteResults_procedures>
        data={[...listData]}
        onRefresh={refetch}
        refreshing={loading}
        renderItem={({ item }) => (
          <Row onPress={() => onProcedureListItemClick({ item })}>
            <ListItem
              {...item}
              votes={item.communityVotes ? item.communityVotes.total || 0 : 0}
              govermentChart={{
                votes: pieChartGovernmentDataLargeParty({
                  ...item,
                  party,
                }),
              }}
              communityVotes={communityVoteData({
                ...item,
                localSelection: getLocalVoteSelection(item.procedureId),
              })}
            />
          </Row>
        )}
        ListHeaderComponent={Chart}
        ListFooterComponent={() =>
          networkStatus === 3 || hasMore ? <ListLoading /> : null
        }
        onEndReached={() =>
          hasMore &&
          listData.length > 0 &&
          !loading &&
          fetchMore({
            variables: {
              procedureIds: null,
              offset: procedurListData
                ? procedurListData.proceduresByIdHavingVoteResults.procedures
                    .length
                : 0,
            },
            updateQuery: (prev, { fetchMoreResult, variables }) => {
              console.log('ASDF', variables, prev);
              if (!prev) {
                const xy: WomPartyData = {
                  proceduresByIdHavingVoteResults: {
                    procedures: [],
                    __typename: 'ProceduresHavingVoteResults',
                    total: 0,
                  },
                };
                return xy;
              }
              if (!fetchMoreResult || !prev) {
                return prev;
              }
              if (
                hasMore &&
                fetchMoreResult.proceduresByIdHavingVoteResults.procedures
                  .length === 0
              ) {
                hasMore = false;
              }

              return Object.assign({}, prev, {
                proceduresByIdHavingVoteResults: {
                  ...prev.proceduresByIdHavingVoteResults,
                  procedures: unionBy(
                    prev.proceduresByIdHavingVoteResults.procedures,
                    fetchMoreResult.proceduresByIdHavingVoteResults.procedures,
                    '_id',
                  ),
                },
              });
            },
          })
        }
        keyExtractor={item => item.procedureId}
      />
    </Container>
  );
};

export default FraktionenList;
