import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const VoteResultsWrapper = styled.View`
  align-items: center;
`;

const VoteResultNumbers = styled.View`
  width: ${() => Dimensions.get('window').width - 18 * 2};
  max-width: 464;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 18;
  height: 40;
`;

const VoteResult = styled.View`
  justify-content: center;
  align-items: center;
`;

const VoteResultCircleNumber = styled.View`
  flex-direction: row;
`;

const VoteResultNumber = styled.Text`
  color: #4a4a4a;
  font-size: 12;
  padding-top: 1;
`;
const VoteResultLabel = styled.Text`
  color: rgb(142, 142, 147);
  font-size: 12;
  padding-top: 6;
`;

const VoteResultCircle = styled.View<{ color: string }>`
  width: 11;
  height: 11;
  border-radius: 5;
  background-color: ${({ color }) => color};
  margin-top: 3;
  margin-right: 5;
`;

export interface ChartLegendData {
  label: string;
  value: number | null;
  color: string;
}

interface Props {
  data: ChartLegendData[];
}

export const ChartLegend: React.FC<Props> = ({ data }) => {
  return (
    <VoteResultsWrapper>
      <VoteResultNumbers>
        {data.map(({ label, value, color }) => (
          <VoteResult key={label}>
            <VoteResultCircleNumber>
              <VoteResultCircle color={color} />
              <VoteResultNumber>{value}</VoteResultNumber>
            </VoteResultCircleNumber>
            <VoteResultLabel>{label}</VoteResultLabel>
          </VoteResult>
        ))}
      </VoteResultNumbers>
    </VoteResultsWrapper>
  );
};

export default ChartLegend;
