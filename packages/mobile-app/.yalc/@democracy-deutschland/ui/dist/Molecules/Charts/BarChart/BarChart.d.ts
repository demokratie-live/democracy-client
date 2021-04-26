import React from 'react';
import { BarData } from '../../../Atoms/Chart/Bar';
export interface WomPartyChartData {
    party: string;
    deviants: BarData[];
}
export interface BarChartProps {
    data: WomPartyChartData[];
    size: number;
    setSelectedParty: (i: number) => void;
    selectedParty: number;
}
export declare const BarChart: React.FC<BarChartProps>;
