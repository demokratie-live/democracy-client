import React from 'react';
import { styled } from '../../../styles';

const Wrapper = styled.View`
  flex: 1;
  height: 68px;
  background-color: #f6f6f6;
  justify-content: center;
`;

const FillBox = styled.View<{ width: number }>`
  position: absolute;
  align-self: flex-start;
  height: 68px;
  width: ${({ width }) => `${width}%`};
  background-color: #4494d3;
`;

const Text = styled.Text`
  padding-horizontal: 17px;
`;

const Money = styled.Text`
  font-size: 17px;
`;

const DueDate = styled.Text`
  font-size: 11px;
`;

const Description = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.textColors.tertiary};
`;

interface Props {
  money: string;
  dueDate?: string;
  description: string;
  target: number;
  occupied: number;
}

const Entry: React.FC<Props> = ({
  money,
  description,
  occupied,
  target,
  dueDate = '',
}) => (
  <Wrapper>
    <FillBox width={(occupied / target) * 100} />
    <Text>
      <Money>{money}</Money>
      <DueDate>{`  ${dueDate}`}</DueDate>
      <Description>{`\n${description}`}</Description>
    </Text>
  </Wrapper>
);

export default Entry;
