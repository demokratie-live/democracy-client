import React from 'react';
export interface CountryMapProps {
    data: {
        procedure: {
            procedureId: string;
            voted: boolean;
            communityVotes: {
                constituencies: Array<{
                    yes: number;
                    no: number;
                    abstination: number;
                    total: number;
                    constituency: string;
                }>;
            } | null;
        };
    };
}
export declare const CountryMap: React.FC<CountryMapProps>;
