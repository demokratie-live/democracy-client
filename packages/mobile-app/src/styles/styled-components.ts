import * as styledComponents from 'styled-components/native';
import { ThemeInterface } from './theme';

const {
  default: styled,
  css,
  ThemeProvider,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<
  ThemeInterface
>;

export { css, ThemeProvider, styled };
