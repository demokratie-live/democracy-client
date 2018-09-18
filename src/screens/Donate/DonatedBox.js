import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  width: 100%;
  height: 68;
  background-color: #4494d390;
  justify-content: center;
  align-items: center;
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

const DonatedBox = ({ target, occupied, style, moneyTextStyle, descriptionTextStyle }) => (
  <Wrapper style={style}>
    <FillBox width={occupied / target * 100} />
    <Money style={moneyTextStyle}>{`${target - occupied}€/Monat fehlen`}</Money>
    <Description style={descriptionTextStyle}>zur nachhaltigen Finanzierung</Description>
  </Wrapper>
);

DonatedBox.propTypes = {
  target: PropTypes.number.isRequired,
  occupied: PropTypes.number.isRequired,
  style: PropTypes.shape(),
  moneyTextStyle: PropTypes.shape(),
  descriptionTextStyle: PropTypes.shape(),
};

DonatedBox.defaultProps = {
  style: {},
  moneyTextStyle: {},
  descriptionTextStyle: {},
};

export default DonatedBox;
