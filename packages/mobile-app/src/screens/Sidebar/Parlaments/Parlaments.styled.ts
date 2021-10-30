import { styled } from '../../../styles';

export const Container = styled.View``;

export const List = styled.View`
  margin-bottom: ${({ theme }) => theme.spaces.default};
`;

export const Headline = styled.Text`
  margin-horizontal: ${({ theme }) => theme.spaces.default};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
`;
