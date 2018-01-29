import React from "react";
import styled from "styled-components/native";

const Wrapper = styled.View``;

const Head = styled.View``;

const DefTitle = styled.Text`
  font-size: 12;
  color: rgba(68, 148, 211, 0.9);
`;

const DefDescr = styled.Text`
  font-size: 12;
  color: rgb(155, 155, 155);
`;

const Details = ({ recources }) => (
  <Wrapper>
    <Head>
      <DefTitle>Sachgebiet</DefTitle>
      <DefDescr>{recources}</DefDescr>
    </Head>
  </Wrapper>
);

export default Details;
