/// <reference path="../../../src/@types/styled.d.ts" />
/// <reference types="styled-components-react-native" />
export declare type Variant = 'primary' | 'secondary' | 'danger' | 'danger-secondary';
export interface ButtonProps {
    color: string;
}
export declare const Button: import("styled-components").StyledComponent<typeof import("react-native").TouchableOpacity, import("styled-components").DefaultTheme, ButtonProps, never>;
export declare const Label: import("styled-components").StyledComponent<typeof import("react-native").Text, import("styled-components").DefaultTheme, ButtonProps, never>;
