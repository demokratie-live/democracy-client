import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  height: 68;
  background-color: #f6f6f6;
  justify-content: center;
`;

const FillBox = styled.View`
  position: absolute;
  align-self: flex-start;
  height: 68;
  width: ${({ width }) => `${width}%`};
  background-color: #4494d3;
`;

const Text = styled.Text`
  padding-horizontal: 17;
`;

const Money = styled.Text`
  font-size: 17;
`;

const DueDate = styled.Text`
  font-size: 11;
`;

const Description = styled.Text`
  font-size: 13;
  color: #5f5f5b;
`;
// color: #9b9b9b;

const Entry = ({ money, description, occupied, target, dueDate }) => (
  <Wrapper>
    <FillBox width={occupied / target * 100} />
    <Text>
      <Money>{money}</Money>
      <DueDate>{`  ${dueDate}`}</DueDate>
      <Description>{`\n${description}`}</Description>
    </Text>
  </Wrapper>
);

Entry.propTypes = {
  money: PropTypes.string.isRequired,
  dueDate: PropTypes.string,
  description: PropTypes.string.isRequired,
  target: PropTypes.number.isRequired,
  occupied: PropTypes.number.isRequired,
};

Entry.defaultProps = {
  dueDate: '',
};

export default Entry;
