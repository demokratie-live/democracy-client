interface PartyColor {
    background: string;
    text: string;
}
export interface Colors {
    primary: string;
    secondary: string;
    background: {
        primary: string;
        secondary: string;
        pushBox: string;
    };
    text: {
        primary: string;
        secondary: string;
        tertiary: string;
        colored: string;
        danger: string;
        seperator: string;
        badge: string;
        date: {
            future: string;
            current: string;
            past: string;
        };
    };
    vote: {
        community: {
            yes: string;
            abstination: string;
            no: string;
        };
        government: {
            yes: string;
            abstination: string;
            no: string;
            notVoted: string;
        };
        notVoted: {
            yes: string;
            abstination: string;
            no: string;
        };
        wom: {
            match: string;
            missmatch: string;
        };
    };
    party: {
        Union: PartyColor;
        SPD: PartyColor;
        AfD: PartyColor;
        FDP: PartyColor;
        Grüne: PartyColor;
        Linke: PartyColor;
        ohne: PartyColor;
    };
}
export declare const lightColors: Colors;
export declare const darkColors: Colors;
export {};
