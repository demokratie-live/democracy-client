import { useQuery } from '@apollo/client';
import { ProcedureListItem } from '@democracy-deutschland/ui';
import { useNavigation } from '@react-navigation/core';
import React, { useContext } from 'react';
import { SectionList, TouchableOpacity } from 'react-native';
import { ListLoading } from '../../../../../mobile-ui/src/components/shared/ListLoading';
import { LocalVotesContext } from '../../../context/LocalVotes';
import { theme } from '../../../styles';
import { Segment } from '../List/Components/Segment';
import { RECOMMENDED_PROCEDURES } from './graphql/recommendedProcedures';
import {
  RecommendedProcedures,
  RecommendedProcedures_recommendedProcedures_data_procedures,
} from './graphql/__generated__/RecommendedProcedures';
import { Divider } from './styled';

export const Recommended = () => {
  const navigation = useNavigation();
  const { getLocalVoteSelection } = useContext(LocalVotesContext);
  const { data } = useQuery<RecommendedProcedures>(RECOMMENDED_PROCEDURES);

  if (!data || !data?.recommendedProcedures.data) {
    return <ListLoading />;
  }

  const sectionListData = data.recommendedProcedures.data.map(s => ({
    title: s.title,
    data: s.procedures,
  }));

  return (
    <SectionList<RecommendedProcedures_recommendedProcedures_data_procedures>
      sections={sectionListData}
      renderSectionHeader={({ section }) => <Segment text={section.title} />}
      keyExtractor={({ procedureId }) => procedureId}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item }) => {
        const localSelection = getLocalVoteSelection(item.procedureId);
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Procedure', {
                procedureId: item.procedureId,
                title: item.type || item.procedureId,
              })
            }>
            <ProcedureListItem
              date={new Date(item.voteDate)}
              title={item.title}
              subtitle={item.subjectGroups.join(', ')}
              voted={item.voted}
              votes={item.activityIndex.activityIndex}
              communityChart={
                item.voted && item.communityVotes
                  ? {
                      size: 20,
                      data: [
                        {
                          name: 'yes',
                          value: item.communityVotes.yes,
                          color: item.voted
                            ? theme.colors.vote.community.yes
                            : theme.colors.vote.notVoted.yes,
                          highlight: localSelection === 'YES',
                        },
                        {
                          name: 'abstination',
                          value: item.communityVotes.abstination,
                          color: item.voted
                            ? theme.colors.vote.community.abstination
                            : theme.colors.vote.notVoted.abstination,
                          highlight: localSelection === 'ABSTINATION',
                        },
                        {
                          name: 'no',
                          value: item.communityVotes.no,
                          color: item.voted
                            ? theme.colors.vote.community.no
                            : theme.colors.vote.notVoted.no,
                          highlight: localSelection === 'NO',
                        },
                      ],
                    }
                  : undefined
              }
              governmentChart={
                item.voted && item.voteResults
                  ? {
                      size: 20,
                      data: [
                        {
                          name: 'yes',
                          value: item.voteResults.yes,
                          color: theme.colors.vote.government.yes,
                          highlight: true,
                        },
                        {
                          name: 'abstination',
                          value: item.voteResults.abstination,
                          color: theme.colors.vote.government.abstination,
                          highlight: true,
                        },
                        {
                          name: 'no',
                          value: item.voteResults.no,
                          color: theme.colors.vote.government.no,
                          highlight: true,
                        },
                      ],
                    }
                  : undefined
              }
            />
          </TouchableOpacity>
        );
      }}
    />
  );
};
