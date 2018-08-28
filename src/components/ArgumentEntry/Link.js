import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import ArgumentEntry from '../ArgumentEntry';

const Image = styled.Image.attrs({
  width: 82,
  height: 82,
})`
  width: 82;
  height: 82;
`;

const Content = styled.View`
  flex: 1;
  padding-horizontal: 11;
  padding-vertical: 11;
`;

const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  padding-bottom: 11;
`;

const Text = styled.Text``;

const Link = ({ image, argumentation, title, text }) => (
  <ArgumentEntry argumentation={argumentation}>
    {image && <Image {...image} />}
    <Content>
      {title && <Title>{title}</Title>}
      <Text numberOfLines={2}>{text}</Text>
    </Content>
  </ArgumentEntry>
);

Link.propTypes = {
  children: PropTypes.node,
  image: PropTypes.shape(),
  argumentation: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  textMore: PropTypes.string,
};

Link.defaultProps = {
  image: null,
  children: null,
  argumentation: 'neutral',
  title: '',
  textMore: '',
};

export default Link;
