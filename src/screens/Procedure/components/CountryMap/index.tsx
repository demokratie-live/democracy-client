import React, { useLayoutEffect } from "react";
import styled from "styled-components/native";
import { CountryMap as CountryMapCmp } from "@democracy-deutschland/ui";
import { useCountryMapConstituenciesQuery } from "../../../../__generated__/graphql";
import { Dimensions } from "react-native";

const Container = styled.View`
  align-items: center;
  flex: 1;
`;

interface Props {
  procedureId: string;
}

export const CountryMap: React.FC<Props> = ({ procedureId }) => {
  const [containerWidth, setContainerWidth] = React.useState(0);

  useLayoutEffect(() => {
    const onContainerLayout = () => {
      const { width, height } = Dimensions.get("screen");
      setContainerWidth(Math.min(width, height));
    };

    onContainerLayout();

    const resizeListener = Dimensions.addEventListener(
      "change",
      onContainerLayout
    );

    return () => {
      resizeListener.remove();
    };
  }, []);

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
          procedure: {
            ...data.procedure,
            communityVotes: data.procedure.communityVotes,
          },
        }}
        width={containerWidth}
      />
    </Container>
  );
};
