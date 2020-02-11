export interface ThemeInterface {
  colors: {
    main: string;
    secondary: string;
    headerText: string;
    headerTextSecondary: string;
    tansparentSecondary: string;
    background: {
      header: string;
      main: string;
    };
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
  colors: {
    main: 'blue',
    secondary: 'red',
    headerText: '#fff',
    headerTextSecondary: '#fffb',
    tansparentSecondary: '#0009',
    background: {
      header: '#4494d3',
      main: '#fff',
    },
  },
};

const theme: ThemeInterface = myTheme;

export { theme };
