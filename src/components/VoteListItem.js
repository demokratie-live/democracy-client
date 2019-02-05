import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import ActivityIndex from './ActivityIndex';
import DateTime from './Date';
import DemocracyIconComponent from '../../iconfont/DemocracyFont';
import StatusIcon from '../components/StatusIcon';

const DemocracyIcon = styled(DemocracyIconComponent)``;

const ListItemWrapper = styled.View`
  flex-direction: row;
`;

const MainWrapper = styled.View`
  flex: 1;
  padding-right: 10;
  justify-content: space-between;
`;

const SideWrapper = styled.View`
  align-items: center;
  justify-content: space-between;
  min-width: 50;
`;

const Title = styled.Text.attrs(() => ({ numberOfLines: 3 }))`
  font-size: 17;
  color: #030303;
`;
const Tags = styled.Text.attrs(() => ({ numberOfLines: 2 }))`
  padding-top: 8;
  font-size: 15;
  color: #8f8e94;
`;

const ListItem = ({
  title,
  tags,
  date,
  procedureId,
  children,
  activityIndex: { activityIndex, active },
  votedGovernment,
  voted,
  viewedStatus,
}) => (
  <ListItemWrapper>
    <StatusIcon
      push={viewedStatus === 'PUSH'}
      unreaded={viewedStatus === 'NEW' && !voted && !active}
    />
    <MainWrapper>
      <Title>{title}</Title>
      {!children && <Tags>{tags && tags.join(', ')}</Tags>}
      {children}
    </MainWrapper>
    <SideWrapper>
      <ActivityIndex
        procedureId={procedureId}
        activityIndex={activityIndex}
        active={active}
        listView
      />

      {voted && (
        <DemocracyIcon
          name={`checkmark${votedGovernment ? '-double' : ''}`}
          size={14}
          color="#35a335"
        />
      )}
      {date && <DateTime date={date} />}
    </SideWrapper>
  </ListItemWrapper>
);

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  procedureId: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.bool]),
  children: PropTypes.node,
  activityIndex: PropTypes.shape(),
  votedGovernment: PropTypes.bool,
  voted: PropTypes.bool,
  viewedStatus: PropTypes.string.isRequired,
};

ListItem.defaultProps = {
  tags: [],
  date: false,
  children: null,
  activityIndex: {},
  votedGovernment: false,
  voted: false,
};

export default ListItem;
