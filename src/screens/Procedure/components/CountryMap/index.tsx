import React from 'react';
import styled from 'styled-components/native';
import { CountryMap as CountryMapCmp } from '@democracy-deutschland/ui';
import { useCountryMapConstituenciesQuery } from '../../../../__generated__/graphql';

const Container = styled.View`
  align-items: center;
  flex: 1;
`;

interface Props {
  procedureId: string;
}

export const CountryMap: React.FC<Props> = ({ procedureId }) => {
  const { data } = useCountryMapConstituenciesQuery({
    variables: {
      procedureId,
    },
  });

  if (!data?.procedure.communityVotes) {
    return null;
  }

  return (
    <Container>
      <CountryMapCmp
        data={{
          procedure: { ...data.procedure, communityVotes: data.procedure.communityVotes },
        }}
        width={380}
      />
    </Container>
  );
};
