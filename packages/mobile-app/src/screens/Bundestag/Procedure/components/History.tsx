import React from 'react';
import { Procedure_procedure } from '../graphql/query/__generated__/Procedure';
import { styled } from '../../../../styles';

const Wrapper = styled.View``;

const StateWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 22;
`;

interface IconProps {
  currentStatus: Procedure_procedure['currentStatus'];
  state: string;
}

const Icon = styled.View<IconProps>`
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
  color: ${({ theme }) => theme.textColors.secondary};
`;

const Line = styled.View`
  position: absolute;
  width: 1;
  left: 9;
  top: 18;
  bottom: 22;
  background-color: #979797;
`;

interface Props {
  history: Procedure_procedure['currentStatusHistory'];
  currentStatus: Procedure_procedure['currentStatus'];
}

export const History: React.FC<Props> = ({ history, currentStatus }) => {
  return (
    <Wrapper>
      <Line />
      {history.map(state => (
        <StateWrapper key={state}>
          <Icon currentStatus={currentStatus} state={state} />
          <State>{state}</State>
        </StateWrapper>
      ))}
    </Wrapper>
  );
};
