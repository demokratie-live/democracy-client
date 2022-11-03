import React, { useState } from 'react';
import { ScrollViewProps, useWindowDimensions, View } from 'react-native';
import { DeputyVoteResult } from './Deputy';
import styled from 'styled-components/native';
import { ProcedureQuery, useDeputyVoteResultsQuery } from '../../../../__generated__/graphql';
import { useInitialState } from '../../../../api/state/initialState';
import { useRecoilValue } from 'recoil';
import { favorizedDeputiesState } from '../../../../api/state/favorizedDeputies';
import Folding from '../../../../components/Folding';
import { DeputyVoteResultPlaceholder } from './DeputyPlaceholder';
import { parlamentState } from '../../../../api/state/parlament';
import { Pagination as PaginationCmp } from '@democracy-deutschland/ui';

const ScrollView = styled.ScrollView.attrs(
  (): ScrollViewProps => ({
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {
      alignContent: 'center',
    },
  }),
)``;

const Pagination = styled(PaginationCmp)`
  margin-top: ${({ theme }) => theme.spaces.small};
`;

interface Props {
  voteResults: Exclude<ProcedureQuery['procedure']['voteResults'], null | undefined>;
  procedureId: string;
  voted: boolean;
}

export const DeputyVoteResultSlider: React.FC<Props> = ({ voteResults, voted, procedureId }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const { isVerified } = useInitialState();
  const parlamentIdentifier = useRecoilValue(parlamentState);
  const favorizedDeputies = useRecoilValue(favorizedDeputiesState(parlamentIdentifier));
  const { data } = useDeputyVoteResultsQuery({
    variables: {
      webIds: [...favorizedDeputies],
      procedureId: procedureId,
    },
  });
  const { width } = useWindowDimensions();

  // FIXME Sollte nur im falle von Fehlerhaften Daten vom server ausgelöst werden.
  // https://github.com/demokratie-live/democracy-client/issues/714
  if (voteResults.partyVotes.length === 0) {
    return null;
  }

  const renderGovernmentVoteDetails = () => {
    const votes = // TODO improve server typesafety
      (voteResults.yes || 0) +
      (voteResults.no || 0) +
      (voteResults.notVoted || 0) +
      (voteResults.abstination || 0);
    const dataPieChart = [
      {
        label: 'Zustimmungen',
        percent: (voteResults.yes || 0) / votes,
        value: voteResults.yes,
        color: '#99C93E',
      },
      {
        label: 'Enthaltungen',
        percent: (voteResults.abstination || 0) / votes,
        value: voteResults.abstination,
        color: '#4CB0D8',
      },
      {
        label: 'Ablehnungen',
        percent: (voteResults.no || 0) / votes,
        value: voteResults.no,
        color: '#D43194',
      },
    ];

    if (voteResults.namedVote) {
      dataPieChart.push({
        label: 'Abwesend',
        percent: (voteResults.notVoted || 0) / votes,
        value: voteResults.notVoted || 0,
        color: '#B1B3B4',
      });
    }

    const partyColors = ['#D43194', '#4CB0D8', '#99C93E'];
    if (voteResults.namedVote) {
      partyColors.unshift('#B1B3B4');
    }

    const screens =
      (data?.procedure?.voteResults?.deputyVotes || []).length > 0
        ? [
            ...(data?.procedure?.voteResults?.deputyVotes.map(deputy => (
              <DeputyVoteResult key="deputy" {...deputy} />
            )) ?? []),
            <DeputyVoteResultPlaceholder
              key="addNewDeputy"
              label="weitere Abgeordnete hinzufügen"
            />,
          ]
        : [
            <DeputyVoteResultPlaceholder
              key="addNewDeputy"
              label="Abgeordnetenergebnis anzeigen"
            />,
          ];

    const onMomentumScrollEnd: ScrollViewProps['onMomentumScrollEnd'] = ({ nativeEvent }) => {
      const index = Math.round(nativeEvent.contentOffset.x / width);
      if (index !== activeSlide) {
        setActiveSlide(index);
      }
    };

    return (
      <View style={{ marginBottom: 0, marginTop: 10 }}>
        <ScrollView onMomentumScrollEnd={onMomentumScrollEnd}>{screens}</ScrollView>
        <Pagination active={activeSlide} length={screens.length} />
      </View>
    );
  };

  if (data?.procedure?.voteResults?.deputyVotes) {
    return (
      <Folding title="Abgeordnetenergebnis" opened={!isVerified || voted} paddingHorizontal={0}>
        {renderGovernmentVoteDetails()}
      </Folding>
    );
  }
  return null;
};
