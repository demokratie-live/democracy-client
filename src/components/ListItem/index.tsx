import { VoteDate as VoteDateCmp, VotesIndex as VotesIndexCmp } from '@democracy-deutschland/ui';
import React from 'react';
import styled from 'styled-components/native';
import { PieChart, Slice } from '../PieChart';

// import ActivityIndex from './ActivityIndex';
// import DemocracyIconComponent from '../../iconfont/DemocracyFont';
// import StatusIcon from '../components/StatusIcon';

// const DemocracyIcon = styled(DemocracyIconComponent)``;

const ListItemWrapper = styled.View`
  flex-direction: row;
`;

const MainWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const SideWrapper = styled.View`
  align-items: flex-end;
  min-width: 50px;
  justify-content: space-between;
`;

const VotesIndex = styled(VotesIndexCmp)``;

const ChartWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const VoteDate = styled(VoteDateCmp)`
  padding-top: 18px;
`;

const Title = styled.Text`
  font-size: 17px;
  min-height: 61px;
  color: #030303;
`;

const Subline = styled.Text`
  padding-top: 8px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const PaddingRight = styled.View`
  padding-right: 3px;
`;

export interface Props {
  title: string;
  isIntro?: boolean;
  subline?: string | null;
  voted: boolean;
  votes: number;
  voteDate?: Date;
  endDate?: Date;
  communityVotes: Slice[];
  govermentChart?: {
    votes?: Slice[];
    large?: boolean;
  };
}

const ListItem: React.FC<Props> = ({
  title,
  isIntro,
  subline,
  voteDate,
  endDate,
  communityVotes,
  govermentChart,
  // procedureId,
  // children,
  // activityIndex: { activityIndex, active },
  // votedGovernment,
  voted,
  // viewedStatus,
  votes,
}) => {
  // TODO title length function: handle subline line length by https://facebook.github.io/react-native/docs/text#ontextlayout on title
  // const [titleLines, setTitleLines] = useState(2);
  return (
    <ListItemWrapper>
      {/* <StatusIcon
      push={viewedStatus === 'PUSH'}
      unreaded={viewedStatus === 'NEW' && !voted && !active}
    /> */}
      <MainWrapper>
        <Title
          numberOfLines={isIntro ? undefined : 3}
          // TODO title length function
          // onTextLayout={({ nativeEvent: { lines } }) =>
          //   setTitleLines(lines.length)
          // }
        >
          {title}
        </Title>
        {!!subline && (
          <Subline
            // TODO title length function
            // numberOfLines={titleLines > 2 ? 1 : 2}
            numberOfLines={isIntro ? undefined : 2}
          >
            {subline}
          </Subline>
        )}
      </MainWrapper>
      <SideWrapper>
        <VotesIndex votes={votes} voted={voted} />
        <ChartWrapper>
          {!!govermentChart && !!govermentChart.votes && (
            <PaddingRight>
              <PieChart data={govermentChart.votes} size={20} large={govermentChart.large} />
            </PaddingRight>
          )}
          <PieChart data={communityVotes} size={20} />
        </ChartWrapper>
        {voteDate && <VoteDate date={voteDate} dateEnd={endDate} />}
      </SideWrapper>
    </ListItemWrapper>
  );
};

export { ListItem };
