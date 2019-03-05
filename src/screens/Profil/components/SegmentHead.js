import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  background-color: transparent;
  height: 30;
  justify-content: center;
  padding-left: 18;
`;

const Text = styled.Text`
  font-size: 13;
  color: #6d6d72;
`;

class SegmentHead extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Wrapper>
        <Text>{children.toUpperCase()}</Text>
      </Wrapper>
    );
  }
}

SegmentHead.propTypes = {
  children: PropTypes.node.isRequired,
};

SegmentHead.defaultProps = {};

export default SegmentHead;
