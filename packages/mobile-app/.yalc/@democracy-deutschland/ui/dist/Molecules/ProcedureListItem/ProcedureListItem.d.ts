import React from 'react';
import { VotesIndexProps } from '../../Atoms/ListItem/VotesIndex';
import { VoteDateProps } from '../../Atoms/VoteDate';
import { CommunityChartProps } from './components/CommunityChart';
import { GovernmentChartProps } from './components/GovernmentChart';
export interface ProcedureListItemProps extends CommunityChartProps, GovernmentChartProps, VotesIndexProps, VoteDateProps {
    isIntro?: boolean;
    title: string;
    subtitle?: string;
}
export declare const ProcedureListItem: React.FC<ProcedureListItemProps>;
