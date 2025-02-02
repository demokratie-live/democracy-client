export type ParlamentIdentifier = "BT-20" | "BT-19";
type Institutions = "Bundestag";

interface ParlamentProceduresScreen {
  inVote?: boolean;
  recomended?: boolean;
  top100?: boolean;
  past?: boolean;
  all?: boolean;
}

interface ParlamentWomScreen {
  institution?: boolean;
  fractions?: boolean;
  deputies?: boolean;
}
interface ParlamentScreens {
  procedures: ParlamentProceduresScreen;
  wom?: false | ParlamentWomScreen;
  deputies?: boolean;
}
export interface Parlament {
  identifier: ParlamentIdentifier;
  institution: Institutions;
  mainScreen: "Sitzungswoche" | "Top100" | "Empfohlen";
  period: number;
  screens: ParlamentScreens;
}

type Parlaments = {
  [parlament in ParlamentIdentifier]: Parlament;
};

export const parlaments: Parlaments = {
  "BT-20": {
    identifier: "BT-20",
    institution: "Bundestag",
    mainScreen: "Sitzungswoche",
    period: 20,
    screens: {
      procedures: {
        inVote: true,
        past: true,
        top100: true,
      },
      wom: {
        institution: true,
        fractions: true,
        deputies: true,
      },
      deputies: true,
    },
  },
  "BT-19": {
    identifier: "BT-19",
    institution: "Bundestag",
    mainScreen: "Empfohlen",
    period: 19,
    screens: {
      procedures: {
        recomended: true,
        top100: true,
        all: true,
      },
      wom: {
        institution: true,
        fractions: true,
        deputies: true,
      },
      deputies: true,
    },
  },
  // 'BT-18': {
  //   identifier: 'BT-18',
  //   institution: 'Bundestag',
  //   period: 18,
  //   screens: {
  //     procedures: {
  //       top100: true,
  //       all: true,
  //     },
  //     wom: {
  //       institution: true,
  //       fractions: true,
  //       deputies: true,
  //     },
  //     deputies: true,
  //   },
  // },
};
