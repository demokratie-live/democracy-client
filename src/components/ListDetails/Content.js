import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Wrapper = styled.ScrollView`
  flex: 1;
`;

const Text = styled.Text``;

const Content = ({ description }) => (
  <Wrapper>
    <Text>{description}</Text>
  </Wrapper>
);

Content.defaultProps = {
  description: '',
};

Content.propTypes = {
  description: PropTypes.string,
};

export default Content;
