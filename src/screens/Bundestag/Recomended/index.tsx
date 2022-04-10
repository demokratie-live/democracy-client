import { ProcedureListItem } from '@democracy-deutschland/ui';
import { useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import React from 'react';
import { SectionList, TouchableOpacity } from 'react-native';
import { localVotesState } from '../../../api/state/votesLocal';
import { ListLoading } from '../../../components/ListLoading';
import { RootStackParamList } from '../../../routes';
import { SidebarParamList } from '../../../routes/Sidebar';
import { useRecommendedProceduresQuery } from '../../../__generated__/graphql';
import { Segment } from '../List/Components/Segment';
import { Divider } from './styled';
import { BundestagTopTabParamList } from '../../../routes/Bundestag';
import { theme } from '../../../styles/theme';
import { useRecoilValue } from 'recoil';

type ScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<BundestagTopTabParamList, 'Empfohlen'>,
  CompositeNavigationProp<
    DrawerNavigationProp<SidebarParamList, 'Bundestag'>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;

export const Recommended = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const localVotes = useRecoilValue(localVotesState);
  const { data } = useRecommendedProceduresQuery();

  if (!data || !data?.recommendedProcedures.data) {
    return <ListLoading />;
  }

  const sectionListData = data.recommendedProcedures.data.map(s => ({
    title: s.title,
    data: s.procedures,
  }));

  return (
    <SectionList
      sections={sectionListData}
      renderSectionHeader={({ section }) => <Segment text={section.title} />}
      keyExtractor={({ procedureId }) => procedureId}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item }) => {
        const localSelection = localVotes.find(
          localVote => localVote.procedureId === item.procedureId,
        )?.selection;
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Procedure', {
                procedureId: item.procedureId,
                title: item.type || item.procedureId,
              })
            }
          >
            <ProcedureListItem
              date={new Date(item.voteDate || '')}
              title={item.title}
              subtitle={item.subjectGroups.join(', ')}
              voted={item.voted}
              votes={item.activityIndex.activityIndex}
              communityChart={
                item.voted && item.communityVotes
                  ? {
                      size: 18,
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
                      size: 18,
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
