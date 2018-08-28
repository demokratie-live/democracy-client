import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const argumentationColors = {
  pro: '#4ecd45',
  contra: '#cd4545',
  neutral: 'lightgrey',
};

const Wrapper = styled.View`
  padding-bottom: 11;
  padding-horizontal: 18;
`;

const RowWrapper = styled.View`
  border-top-left-radius: 10;
  border-bottom-left-radius: 10;
  border-right-width: 3;
  border-color: ${({ argumentation }) =>
    argumentation ? argumentationColors[argumentation] : argumentationColors.neutral};
  background-color: white;
  overflow: hidden;
  flex-direction: row;
`;

const Entry = ({ children, argumentation }) => (
  <Wrapper>
    <RowWrapper argumentation={argumentation}>{children}</RowWrapper>
  </Wrapper>
);

Entry.propTypes = {
  children: PropTypes.node,
  argumentation: PropTypes.string,
};

Entry.defaultProps = {
  children: null,
  argumentation: 'neutral',
};

export default Entry;
