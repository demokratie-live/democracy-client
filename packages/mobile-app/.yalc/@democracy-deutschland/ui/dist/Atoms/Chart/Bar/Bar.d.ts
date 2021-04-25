import React from 'react';
export interface BarData {
    value: number;
    color: string;
}
export interface BarProps {
    data: BarData[];
    width: number;
    height: number;
    active?: boolean;
}
export declare const Bar: React.FC<BarProps>;
