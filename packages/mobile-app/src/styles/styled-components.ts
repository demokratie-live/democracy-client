import * as styledComponents from 'styled-components/native';
import { ThemeInterface } from './theme';
import { DefaultTheme } from '@democracy-deutschland/ui';

const {
  default: styled,
  css,
  ThemeProvider,
  // @ts-ignore
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<
  ThemeInterface & DefaultTheme
>;

export { css, ThemeProvider, styled };
