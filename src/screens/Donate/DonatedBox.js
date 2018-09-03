import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  margin-top: 21;
  flex: 1;
  width: 100%;
  height: 68;
  background-color: #d3e4f2;
  justify-content: center;
  align-items: center;
  padding-horizontal: 17;
`;

const FillBox = styled.View`
  position: absolute;
  align-self: flex-start;
  height: 68;
  width: ${({ width }) => `${width}%`};
  background-color: #4494d3;
`;

const Money = styled.Text`
  font-size: 17;
`;

const Description = styled.Text`
  font-size: 13;
  padding-top: 5;
  color: #4f4f4b;
`;

const Entry = ({ target, occupied }) => (
  <Wrapper>
    <FillBox width={occupied / target * 100} />
    <Money>{`${target - occupied}€/Monat fehlen`}</Money>
    <Description>zur nachhaltigen Finanzierung</Description>
  </Wrapper>
);

export default Entry;
