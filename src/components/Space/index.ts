import styled from 'styled-components/native';

export const Space = styled.View<{ space: 18 | 36 }>`
  padding-bottom: ${({ space }) => space}px;
`;
