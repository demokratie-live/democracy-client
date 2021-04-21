import { lightTheme, DefaultTheme } from '@democracy-deutschland/ui';

export interface ThemeInterface {
  oldColors: {
    main: string;
    secondary: string;
    headerText: string;
    headerTextSecondary: string;
    tansparentSecondary: string;
    description: string;
    background: {
      header: string;
      main: string;
      secondary: string;
    };
  };
  textColors: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverted: string;
    warn: string;
  };
  distances: {
    main: number;
    secondary: number;
    small: number;
  };
}

const myTheme: ThemeInterface = {
  distances: {
    main: 18,
    secondary: 11,
    small: 4,
  },
  textColors: {
    primary: 'pink',
    secondary: '#9B9B9B',
    tertiary: '#555',
    inverted: 'orange',
    warn: 'red',
  },
  oldColors: {
    main: 'blue',
    secondary: 'red',
    headerText: '#fff',
    headerTextSecondary: '#fffb',
    tansparentSecondary: '#0009',
    description: '#9B9B9B',
    background: {
      header: '#4494d3',
      main: '#fff',
      secondary: '#EFEFF4',
    },
  },
};

type TheTheme = ThemeInterface & DefaultTheme;

const theme: TheTheme = { ...myTheme, ...lightTheme };

export { theme };
