/// <reference path="../../../../src/@types/styled.d.ts" />
/// <reference types="react" />
/// <reference types="styled-components-react-native" />
export declare const CircleButton: import("styled-components").StyledComponent<import("react").FC<import("../Circle/Circle.styled").CircleProps>, import("styled-components").DefaultTheme, {}, never>;
export interface VoteButtonProps {
    size: number;
    color: string;
}
export declare const ThumbUp: import("styled-components").StyledComponent<import("react").FC<import("../../Icons/icons/ThumbUp").ThumbUpIconProps>, import("styled-components").DefaultTheme, {
    width: 45;
    height: 45;
} & {
    rotation: number;
}, "width" | "height">;
