import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Wrapper = styled.View`
  margin-right: 8;
  padding-left: 2;
`;

// const UnreadedIcon = styled.View`
//   width: 12;
//   height: 12;
//   background-color: #1badf8;
//   border-radius: 6;
//   margin-top: 5;
//   margin-right: 2;
// `;

const NotificationButtonIcon = styled(Ionicons).attrs(() => ({
  size: 20,
  name: 'ios-notifications',
  color: '#1badf8',
}))``;

const StatusIcon = ({
  // unreaded,
  push,
}) => (
  <Wrapper>
    {/* {unreaded && !push && <UnreadedIcon />} */}
    {push && <NotificationButtonIcon />}
  </Wrapper>
);

StatusIcon.propTypes = {
  // unreaded: PropTypes.bool,
  push: PropTypes.bool,
};

StatusIcon.defaultProps = {
  // unreaded: false,
  push: false,
};

export default StatusIcon;
