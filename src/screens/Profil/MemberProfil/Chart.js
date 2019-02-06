import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Chart from '../../Statistic/Chart';

const Wrapper = styled.View`
  flex-direction: row;
  padding-horizontal: 18;
  padding-top: 18;
`;

const ProcedureCount = styled.View`
  padding-left: 18;
  justify-content: space-around;
`;

const ProcedureCountText = styled.Text`
  font-size: 20;
  color: #6d6d72;
  font-weight: 500;
`;

const Label = styled.Text`
  font-size: 17;
  color: #9b9b9b;
`;

const WomHeader = ({ totalProcedures, votedProceduresCount }) => (
  <Wrapper>
    <Chart
      showValue
      valueSize={8}
      floatNumbers={0}
      value={(votedProceduresCount / totalProcedures) * 100}
      width={60}
    />
    <ProcedureCount>
      <ProcedureCountText>
        {votedProceduresCount}/{totalProcedures}
      </ProcedureCountText>
      <Label>Namentliche Abstimmungen</Label>
    </ProcedureCount>
  </Wrapper>
);

WomHeader.propTypes = {
  totalProcedures: PropTypes.number.isRequired,
  votedProceduresCount: PropTypes.number.isRequired,
};

WomHeader.defaultProps = {};

export default WomHeader;
