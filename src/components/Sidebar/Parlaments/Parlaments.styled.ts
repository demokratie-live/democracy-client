import styled from 'styled-components/native';

export const Container = styled.View``;

export const List = styled.View`
  margin-bottom: ${({ theme }) => theme.spaces.default};
`;

export const HeadlineWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding-right: ${({ theme }) => theme.spaces.default};
`;

export const Headline = styled.Text`
  margin-horizontal: ${({ theme }) => theme.spaces.default};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
`;
