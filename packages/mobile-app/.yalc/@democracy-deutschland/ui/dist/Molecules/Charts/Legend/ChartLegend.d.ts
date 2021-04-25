import React from 'react';
export interface ChartLegendData {
    label: string;
    value: number | null;
    color: string;
}
export interface ChartLegendProps {
    data: ChartLegendData[];
}
export declare const ChartLegend: React.FC<ChartLegendProps>;
