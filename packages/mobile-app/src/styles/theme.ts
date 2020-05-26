export interface ThemeInterface {
  colors: {
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
    inverted: string;
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
    secondary: '#777',
    inverted: 'orange',
  },
  colors: {
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

const theme: ThemeInterface = myTheme;

export { theme };
