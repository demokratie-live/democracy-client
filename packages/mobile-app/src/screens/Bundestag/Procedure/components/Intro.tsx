import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { ListItem } from '@democracy-deutschland/mobile-ui/src/components/Lists/ListItem';
import { LocalVotesContext } from '../../../../context/LocalVotes';
import { communityVoteData } from '../../../../lib/helper/PieChartCommunityData';
import { pieChartGovernmentData } from '../../../../lib/helper/PieChartGovernmentData';
import { Procedure_procedure } from '../graphql/query/__generated__/Procedure';

const Container = styled.View`
  padding-top: 18;
  padding-horizontal: 18;
`;
type Props = Procedure_procedure;

export const Intro: React.FC<Props> = ({
  title,
  procedureId,
  voteDate,
  voteEnd,
  voted,
  voteResults,
  communityVotes,
  sessionTOPHeading,
  subjectGroups,
  votedGovernment,
}) => {
  // If no session top headings available use subject groups
  let subline = null;
  if (sessionTOPHeading) {
    subline = sessionTOPHeading;
  } else if (subjectGroups) {
    subline = subjectGroups.join(', ');
  }

  const { getLocalVoteSelection } = useContext(LocalVotesContext);

  const localSelection = getLocalVoteSelection(procedureId);

  const communityVoteSlices = communityVoteData({
    communityVotes,
    localSelection,
    voted,
  });

  const govSlices = pieChartGovernmentData({
    voteResults,
    votedGovernment,
  });

  return (
    <Container>
      <ListItem
        title={title}
        isIntro
        subline={subline}
        voteDate={voteDate}
        endDate={voteEnd}
        voted={voted}
        votes={communityVotes ? communityVotes.total || 0 : 0}
        govermentChart={{
          votes: govSlices,
          large: true,
        }}
        communityVotes={communityVoteSlices}
      />
    </Container>
  );
};
