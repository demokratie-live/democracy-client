import React, { PureComponent } from 'react';

import { styled } from '../../styles';
import Chart from '../WahlOMeter/HeaderChart';

const Wrapper = styled.View`
  flex-direction: row;
  padding-horizontal: 18px;
  padding-top: 18px;
`;

const ProcedureCount = styled.View`
  padding-left: 18px;
  justify-content: space-around;
`;

const ProcedureCountText = styled.Text`
  font-size: 20px;
  color: #6d6d72;
  font-weight: 500;
`;

const Label = styled.Text`
  font-size: 17px;
  color: ${({ theme }) => theme.textColors.secondary};
`;

interface Props {
  totalProcedures: number;
  votedProceduresCount: number;
}

class MemberChart extends PureComponent<Props> {
  render() {
    const { totalProcedures, votedProceduresCount } = this.props;
    return (
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
  }
}

export default MemberChart;
