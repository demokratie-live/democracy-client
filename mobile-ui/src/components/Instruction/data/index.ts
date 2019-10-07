import { Props } from '../Slide';

export enum Screen {
  Willkommen = 'Willkommen',
  Beobachte = 'Beobachte',
  Informiere = 'Informiere',
  Stimme = 'Stimme',
  Vergleiche = 'Vergleiche',
  Analysiere = 'Analysiere',
  Registrieren = 'Registrieren',
}

type ScreenData = { [key in Screen]: Props };

export const slidesData: ScreenData = {
  Willkommen: {
    head: {
      image: require('../assets/icon.logo.png'),
      title: 'Willkommen bei DEMOCRACY',
      description: 'Alles über die deutsche Politik in einer App',
    },
    images: {
      center: require('../assets/screen.list.png'),
      right: require('../assets/screen.detail.png'),
    },
  },
  Beobachte: {
    head: {
      image: require('../assets/icon.beobachte.png'),
      title: 'Beobachte',
      description:
        '…alle vergangenen, aktuellen und zukünftigen Abstimmungen des Bundestages',
    },
    images: {
      center: require('../assets/screen.list.png'),
      left: require('../assets/screen.list.png'),
      right: require('../assets/screen.detail.png'),
    },
  },
  Informiere: {
    head: {
      image: require('../assets/icon.informiere.png'),
      title: 'Informiere Dich',
      description:
        '…über die Gesetzesvorlagen entlang der offiziellen Informationen des Bundestages',
    },
    images: {
      center: require('../assets/screen.detail.png'),
      left: require('../assets/screen.list.png'),
      right: require('../assets/screen.vote.png'),
    },
  },
  Stimme: {
    head: {
      image: require('../assets/icon.stimme.png'),
      title: 'Stimme',
      description:
        '…noch vor der offiziellen Bundestagsentscheidung selbst über den Antrag ab',
    },
    images: {
      center: require('../assets/screen.vote.png'),
      left: require('../assets/screen.detail.png'),
      right: require('../assets/screen.compare.png'),
    },
  },
  Vergleiche: {
    head: {
      image: require('../assets/icon.vergleiche.png'),
      title: 'Vergleiche',
      description:
        '…Dein eigenes Abstimmungsverhalten mit dem Stimmungsbild in der Community und Deinem Wahlkreis',
    },
    images: {
      center: require('../assets/screen.compare.png'),
      left: require('../assets/screen.vote.png'),
      right: require('../assets/screen.analyse.png'),
    },
  },
  Analysiere: {
    head: {
      image: require('../assets/icon.analyse.png'),
      title: 'Analysiere',
      description:
        '…Deine Übereinstimmungen mit den im Bundestag vertretenen Parteien und Kandidaten',
    },
    images: {
      center: require('../assets/screen.analyse.png'),
      left: require('../assets/screen.compare.png'),
    },
    isNew: true,
  },
  Registrieren: {
    head: {
      image: require('../assets/icon.logo.png'),
      title: 'Registriere Dich',
      description: 'Zum Abstimmen musst Du Deine\nHandynummer verifizieren',
    },
    images: {
      center: require('../assets/screen.registrieren.png'),
    },
  },
};
