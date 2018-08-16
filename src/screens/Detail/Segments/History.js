import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Wrapper = styled.View``;

const StateWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 22;
`;

const Icon = styled.View`
  width: 19;
  height: 19;
  border-radius: 9;
  background-color: ${({ currentStatus, state }) => {
    if (state === '2. Beratung / 3. Beratung' || state === '1. Beratung') {
      return '#9b9b9b';
    }
    return currentStatus === state ? '#0076ff' : '#4494d3';
  }};
`;

const State = styled.Text`
  font-size: 13;
  padding-left: 14;
  color: #8e8e93;
`;

const Line = styled.View`
  position: absolute;
  width: 1;
  left: 9;
  top: 18;
  bottom: 22;
  background-color: #979797;
`;

const Documents = ({ history, currentStatus, voted }) => {
  const renderState = state => {
    if (['Angenommen', 'Abgelehnt'].indexOf(state) !== -1 && !voted) {
      return 'Abgestimmt';
    }
    return state;
  };
  return (
    <Wrapper>
      <Line />
      {history.map(state => (
        <StateWrapper key={state}>
          <Icon currentStatus={currentStatus} state={state} />
          <State>{renderState(state)}</State>
        </StateWrapper>
      ))}
    </Wrapper>
  );
};

Documents.propTypes = {
  history: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentStatus: PropTypes.string.isRequired,
  voted: PropTypes.bool.isRequired,
};

export default Documents;
