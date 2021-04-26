import React from 'react';
export interface ChartEntry {
    name: string;
    value: number;
    color: string;
    highlight?: boolean;
}
export interface PieChartProps {
    size: number;
    data: ChartEntry[];
}
export declare const PieChart: React.FC<PieChartProps>;
