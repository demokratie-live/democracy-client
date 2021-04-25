import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  CountryMapConstituencies,
  CountryMapConstituenciesVariables,
} from './graphql/__generated__/CountryMapConstituencies';
import { CountryMapConstituenciesQuery } from './graphql/CountryMapConstituencies';
import { CountryMap as CountryMapCmp } from '@democracy-deutschland/ui';

const Container = styled.View`
  align-items: center;
  flex: 1;
`;

interface Props {
  procedureId: string;
}

export const CountryMap: React.FC<Props> = ({ procedureId }) => {
  const { data } = useQuery<
    CountryMapConstituencies,
    CountryMapConstituenciesVariables
  >(CountryMapConstituenciesQuery, {
    variables: {
      procedureId,
    },
  });

  if (!data?.procedure.communityVotes) {
    return null;
  }

  return (
    <Container>
      <CountryMapCmp data={data} />
    </Container>
  );
};
