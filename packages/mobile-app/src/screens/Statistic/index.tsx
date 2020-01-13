import styled from 'styled-components/native';
import React, { useState, useContext } from 'react';
import { Dimensions, SectionList, SafeAreaView } from 'react-native';
import Chart from './Chart';
import { useQuery } from '@apollo/react-hooks';
import { VOTE_STATISTIC } from './graphql/query/getStatistic';
import { VoteStatistic } from './graphql/query/__generated__/VoteStatistic';
import { ListLoading } from '@democracy-deutschland/mobile-ui/src/components/shared/ListLoading';
import {
  VotedProcedures_votedProcedures,
  VotedProcedures,
} from './graphql/query/__generated__/VotedProcedures';
import { VOTED_PROCEDURE } from './graphql/query/getVotedProcedures';
import { ListItem } from '@democracy-deutschland/mobile-ui/src/components/Lists/ListItem';
import { pieChartGovernmentData } from '../../lib/helper/PieChartGovernmentData';
import { LocalVotesContext } from '../../context/LocalVotes';
import { communityVoteData } from '../../lib/helper/PieChartCommunityData';
import { Segment } from '../Bundestag/List/Components/Segment';
import { Row } from '@democracy-deutschland/mobile-ui/src/components/Lists/Row';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatisticRootStackParamList } from '../../routes/Sidebar/Statistic';

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const StatisticWrapper = styled.View`
  padding-top: 18;
  align-items: center;
`;

const StatisticNumbersWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  padding-bottom: 18;
`;

const StatisticNumberWrapper = styled.View``;

const StatisticNumber = styled.Text<{ voted?: boolean }>`
  font-size: 71;
  color: ${({ voted }) => (voted ? '#5794CE' : 'grey')};
  font-weight: 200;
  text-align: center;
`;

const StatisticNumberDescription = styled.Text`
  text-align: center;
  font-size: 13;
  color: #4a4a4a;
`;

type StatisticScreenNavigationProp = StackNavigationProp<
  StatisticRootStackParamList,
  'Statistic'
>;

type StatisticScreenRouteProp = RouteProp<
  StatisticRootStackParamList,
  'Statistic'
>;

interface Props {
  route: StatisticScreenRouteProp;
  navigation: StatisticScreenNavigationProp;
}

export const Statistic: React.FC<Props> = ({ navigation }) => {
  const { data: voteStatisticData } = useQuery<VoteStatistic>(VOTE_STATISTIC);
  const { getLocalVoteSelection } = useContext(LocalVotesContext);
  const {
    data: votedProceduresData,
    loading: votedProceduresLoading,
  } = useQuery<VotedProcedures>(VOTED_PROCEDURE);
  const [pieChartWidth, setPieChartWidth] = useState(
    Math.min(Dimensions.get('window').width, Dimensions.get('window').height),
  );

  const onLayout = () => {
    const newPieChartWidth = Math.min(
      Dimensions.get('window').width,
      Dimensions.get('window').height,
    );
    if (pieChartWidth !== newPieChartWidth) {
      setPieChartWidth(pieChartWidth);
    }
  };

  if (!voteStatisticData) {
    return <ListLoading />;
  }

  const {
    voteStatistic: { proceduresCount, votedProcedures },
  } = voteStatisticData;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollWrapper>
        <StatisticWrapper onLayout={onLayout}>
          <StatisticNumbersWrapper>
            <StatisticNumberWrapper>
              <StatisticNumber voted>{votedProcedures}</StatisticNumber>
              <StatisticNumberDescription>
                Abgestimmte Vorgänge
              </StatisticNumberDescription>
            </StatisticNumberWrapper>
            <StatisticNumberWrapper>
              <StatisticNumber>
                {proceduresCount - votedProcedures}
              </StatisticNumber>
              <StatisticNumberDescription>
                Unabgestimme Vorgänge
              </StatisticNumberDescription>
            </StatisticNumberWrapper>
          </StatisticNumbersWrapper>
          <Chart value={(100 * votedProcedures) / proceduresCount} showValue />
        </StatisticWrapper>
        {!votedProceduresLoading &&
          votedProceduresData &&
          votedProceduresData.votedProcedures && (
            <SectionList<VotedProcedures_votedProcedures>
              sections={[
                {
                  title: 'Abgestimmte',
                  data: votedProceduresData.votedProcedures,
                },
              ]}
              renderItem={({ item }) => {
                const {
                  title,
                  sessionTOPHeading,
                  subjectGroups,
                  voteDate,
                  voteEnd,
                  voted,
                  communityVotes,
                  voteResults = null,
                  votedGovernment,
                  procedureId,
                  type,
                } = item;
                let subline = null;
                if (sessionTOPHeading) {
                  subline = sessionTOPHeading;
                } else if (subjectGroups) {
                  subline = subjectGroups.join(', ');
                }
                const govSlices = pieChartGovernmentData({
                  voteResults,
                  votedGovernment,
                });
                const localSelection = getLocalVoteSelection(procedureId);
                const communityVoteSlices = communityVoteData({
                  communityVotes,
                  localSelection,
                  voted,
                });
                return (
                  <Row
                    onPress={() => {
                      navigation.navigate('Procedure', {
                        procedureId,
                        title: type || procedureId,
                      });
                    }}>
                    <ListItem
                      title={title}
                      subline={subline}
                      voteDate={voteDate}
                      endDate={voteEnd}
                      voted={voted}
                      votes={communityVotes ? communityVotes.total || 0 : 0}
                      govermentChart={{ votes: govSlices, large: true }}
                      communityVotes={communityVoteSlices}
                    />
                  </Row>
                );
              }}
              keyExtractor={({ _id }) => _id}
              renderSectionHeader={({ section }) => {
                if (section.data.length > 0) {
                  return <Segment text={section.title} />;
                }
                return null;
              }}
            />
          )}
      </ScrollWrapper>
    </SafeAreaView>
  );
};
