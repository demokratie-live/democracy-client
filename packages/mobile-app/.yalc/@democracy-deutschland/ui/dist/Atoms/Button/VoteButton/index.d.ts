import React from 'react';
export declare type Decisions = 'YES' | 'ABSTINATION' | 'NO';
export interface VoteButtonProps {
    decision: Decisions;
}
export declare const VoteButton: React.FC<VoteButtonProps>;
