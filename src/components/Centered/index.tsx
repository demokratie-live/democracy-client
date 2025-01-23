import React from "react";
import styled from "styled-components/native";

const CenteredWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Centered = ({ children }: React.PropsWithChildren) => {
  return <CenteredWrapper>{children}</CenteredWrapper>;
};
