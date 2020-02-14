import { useQuery } from '@apollo/react-hooks';
import React, { useContext, useState, useMemo } from 'react';
import { WahlOMeterScreenNavigationProp } from '..';
import { LocalVotesContext } from '../../../context/LocalVotes';
import { PROCEDURES_BY_HAVING_VOTE_RESULTS } from '../../Bundestag/Procedure/Voting/components/graphql/query/proceduresByIdHavingVoteResults';
import {
  proceduresByIdHavingVoteResults,
  proceduresByIdHavingVoteResultsVariables,
} from '../../Bundestag/Procedure/Voting/components/graphql/query/__generated__/proceduresByIdHavingVoteResults';
import FraktionenChart from './Chart';
import NoVotesPlaceholder from '../NoVotesPlaceholder';
import { ListLoading } from '@democracy-deutschland/mobile-ui/src/components/shared/ListLoading';
import FraktionenList from './FraktionenList';
import { partyChartData, getMatchingProcedures } from './lib';
import { Segment } from '../../Bundestag/List/Components/Segment';

interface Props {
  navigation: WahlOMeterScreenNavigationProp;
}

const Fraktionen: React.FC<Props> = ({ navigation }) => {
  const [selectedParty, selectParty] = useState();
  const { localVotes } = useContext(LocalVotesContext);
  const { data: proceduresData } = useQuery<
    proceduresByIdHavingVoteResults,
    proceduresByIdHavingVoteResultsVariables
  >(PROCEDURES_BY_HAVING_VOTE_RESULTS, {
    variables: {
      procedureIds: localVotes.map(({ procedureId }) => procedureId),
      pageSize: 999999,
    },
  });

  let totalProcedures = 0;
  if (proceduresData && proceduresData.proceduresByIdHavingVoteResults) {
    totalProcedures = proceduresData.proceduresByIdHavingVoteResults.total || 0;
  }
  // Filtered Array of procedures voted local

  const Chart = useMemo(() => {
    if (!localVotes.length) {
      return (
        <>
          <NoVotesPlaceholder subline="Fraktionen" />
          <Segment text="Abstimmungen" />
        </>
      );
    }
    if (proceduresData) {
      const matchingProcedures = getMatchingProcedures({
        votedProcedures: proceduresData,
        localVotes,
      });
      const preparedData = partyChartData({
        votedProcedures: proceduresData,
        localVotes,
        matchingProcedures,
      });

      if (!selectedParty && preparedData[0]) {
        selectParty(preparedData[0].party);
      }

      return (
        <FraktionenChart
          changeSelectedParty={selectParty}
          navigation={navigation}
          totalProcedures={totalProcedures}
          preparedData={preparedData}
          matchingProcedures={matchingProcedures}
        />
      );
    }
    return <ListLoading />;
  }, [localVotes, navigation, proceduresData, selectedParty, totalProcedures]);

  return (
    <FraktionenList
      party={selectedParty}
      Chart={Chart}
      onProcedureListItemClick={({ item }) =>
        navigation.navigate('Procedure', {
          procedureId: item.procedureId,
          title: item.type || item.procedureId,
        })
      }
    />
  );
};

export default Fraktionen;
