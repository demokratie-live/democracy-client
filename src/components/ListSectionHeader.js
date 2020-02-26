import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Wrapper = styled.View`
  padding-vertical: 8;
  padding-horizontal: 16;
  background-color: #e6edf2;
`;

const Title = styled.Text`
  font-size: 15;
  color: #6d6d72;
`;

class ListSectionHeader extends Component {
  shouldComponentUpdate(np) {
    const { title } = this.props;
    return title !== np.title;
  }

  render() {
    const { title } = this.props;
    if (!title) {
      return null;
    }
    return (
      <Wrapper>
        <Title>{title.toUpperCase()}</Title>
      </Wrapper>
    );
  }
}

ListSectionHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

ListSectionHeader.defaultProps = {
  title: false,
};

export default ListSectionHeader;
