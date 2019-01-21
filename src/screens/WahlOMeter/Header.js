import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-direction: row;
`;

const TimeSelect = styled.View`
  flex: 1;
`;

const ProcedureCount = styled.View``;

const ProcedureCountText = styled.Text`
  font-size: 15;
  color: #6d6d72;
  font-weight: 500;
`;

const WomHeader = ({ totalProcedures, votedProceduresCount }) => (
  <Wrapper>
    <TimeSelect />
    <ProcedureCount>
      <ProcedureCountText>
        {votedProceduresCount}/{totalProcedures}
      </ProcedureCountText>
    </ProcedureCount>
  </Wrapper>
);

export default WomHeader;
