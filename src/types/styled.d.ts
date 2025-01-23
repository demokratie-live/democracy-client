import { Colors } from "@democracy-deutschland/ui/dist/theme/colors";
import { fontSizes } from "@democracy-deutschland/ui/dist/theme/fontSizes";
import { spaces } from "@democracy-deutschland/ui/dist/theme/spaces";
import "styled-components/native";

interface IPalette {
  main: string;
  contrastText: string;
}

declare module "styled-components/native" {
  export interface DefaultTheme {
    name: string;
    colors: Colors;
    textStyles: {
      button: {
        primary: FlattenSimpleInterpolation;
      };
    };
    fontSizes: typeof fontSizes;
    spaces: typeof spaces;
  }

  export type Theme = DefaultTheme;
}
