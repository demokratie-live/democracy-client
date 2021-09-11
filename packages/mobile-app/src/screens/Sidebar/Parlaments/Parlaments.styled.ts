import { styled } from '../../../styles';

export const Container = styled.View`
  margin-horizontal: ${({ theme }) => theme.spaces.default};
`;

export const List = styled.View`
  margin-bottom: ${({ theme }) => theme.spaces.default};
`;

export const Headline = styled.Text`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
`;
