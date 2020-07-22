import { Slice } from '@democracy-deutschland/mobile-ui/src/components/shared/Charts/PieChart';

interface Props {
  decision?: 'YES' | 'ABSTINATION' | 'NOTVOTED' | 'NO' | null;
}

export const pieChartFull = ({ decision }: Props): Slice[] => {
  switch (decision) {
    case 'YES':
      return [
        {
          color: '#99C93E',
          percent: (1 || 0) / 1,
          large: true,
        },
      ];
    case 'NO':
      return [
        {
          color: '#D43194',
          percent: (1 || 0) / 1,
          large: true,
        },
      ];
    case 'ABSTINATION':
      return [
        {
          color: '#4CB0D8',
          percent: (1 || 0) / 1,
          large: true,
        },
      ];
    case 'NOTVOTED':
      return [
        {
          color: '#B1B3B4',
          percent: (1 || 0) / 1,
          large: true,
        },
      ];
    default:
      return [
        {
          color: '#d8d8d8',
          percent: (1 || 0) / 1,
        },
      ];
  }
};
