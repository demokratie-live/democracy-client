import React from 'react';
declare type Variants = 'primary' | 'secondary' | 'danger' | 'danger-secondary';
export interface ButtonProps {
    children: string;
    variant: Variants;
}
export declare const Button: React.FC<ButtonProps>;
export {};
