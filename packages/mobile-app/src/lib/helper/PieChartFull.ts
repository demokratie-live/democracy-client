import { Slice } from '@democracy-deutschland/mobile-ui/src/components/shared/Charts/PieChart';

interface Props {
  decision?: 'YES' | 'ABSTINATION' | 'NOTVOTED' | 'NO' | null;
  colorSchema: 'GOVERNMENT' | 'COMMUNITY';
}

const colorSchemas = {
  GOVERNMENT: {
    YES: '#99C93E',
    ABSTINATION: '#4CB0D8',
    NO: '#D43194',
    NOTVOTED: '#B1B3B4',
  },
  COMMUNITY: {
    voted: {
      YES: '#16C063',
      ABSTINATION: '#2882E4',
      NO: '#EC3E31',
      NOTVOTED: '#d8d8d8',
    },
    notVoted: {
      YES: '#C7C7CC',
      ABSTINATION: '#D8D8D8',
      NO: '#B0AFB7',
      NOTVOTED: '#d8d8d8',
    },
  },
};

const getColor = ({
  decision,
  colorSchema,
}: {
  decision: 'YES' | 'ABSTINATION' | 'NOTVOTED' | 'NO';
  colorSchema: Props['colorSchema'];
}): string => {
  let colors: {
    YES: string;
    ABSTINATION: string;
    NO: string;
    NOTVOTED: string;
  };
  if (colorSchema === 'COMMUNITY') {
    if (decision === 'NOTVOTED') {
      colors = colorSchemas[colorSchema].notVoted;
    } else {
      colors = colorSchemas[colorSchema].voted;
    }
  } else {
    colors = colorSchemas[colorSchema];
  }
  return colors[decision];
};

export const pieChartFull = ({ decision, colorSchema }: Props): Slice[] => {
  switch (decision) {
    case 'YES':
      return [
        {
          color: getColor({ decision, colorSchema }),
          percent: (1 || 0) / 1,
          large: true,
        },
      ];
    case 'NO':
      return [
        {
          color: getColor({ decision, colorSchema }),
          percent: (1 || 0) / 1,
          large: true,
        },
      ];
    case 'ABSTINATION':
      return [
        {
          color: getColor({ decision, colorSchema }),
          percent: (1 || 0) / 1,
          large: true,
        },
      ];
    case 'NOTVOTED':
      return [
        {
          color: getColor({ decision, colorSchema }),
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
