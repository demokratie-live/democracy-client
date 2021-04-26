import React from 'react';
export interface VotesDataEntry {
    [selection: string]: number;
}
export interface DonutChartProps {
    votesData: VotesDataEntry;
    colors: string[];
    innerTextTop: string;
    innerTextBottom: string;
    size: number;
    topLeftText?: string;
    topRightSvg?: React.ReactNode;
    hidePercentage?: boolean;
}
export declare const DonutChart: React.FC<DonutChartProps>;
