import { ScrollViewProps } from 'react-native';
import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs<{ width: number }>(
  (): ScrollViewProps => ({
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      alignItems: 'center',
    },
  }),
)`
  padding-bottom: ${({ theme }) => theme.spaces.small};
`;

export const PieChartWrapper = styled.View<{ width: number }>`
  padding-top: 9px;
  padding-horizontal: 36px;
  width: ${({ width }) => width}px;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.View`
  width: 100%;
  align-items: center;
`;
