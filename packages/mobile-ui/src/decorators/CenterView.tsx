import React from 'react';
import { DecoratorFunction } from '@storybook/addons';
import styled from 'styled-components/native';

const Centered = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;

const CenterView: DecoratorFunction<React.ReactNode> = storyFn => {
  return <Centered>{storyFn()}</Centered>;
};

export default CenterView;
