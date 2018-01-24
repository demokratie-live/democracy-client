import React, { Component } from "react";
import styled from "styled-components/native";

import ActivityIndex from "./ActivityIndex";

const ListItemWrapper = styled.View`
  flex-direction: row;
`;

const MainWrapper = styled.View`
  flex: 1;
`;

const SideWrapper = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  font-size: 17;
  color: #030303;
  letter-spacing: -0.41;
`;
const Tags = styled.Text`
  padding-top: 8;
  font-size: 15;
  color: #8f8e94;
  letter-spacing: -0.24;
`;

const Date = styled.Text`
  padding-top: 8;
  color: #44db5e;
  font-size: 12;
  display: ${({ visible }) => visible ? "flex" : "none"};
`;

class ListItem extends Component {
  render() {
    const { title, tags, active, date } = this.props;
    return (
      <ListItemWrapper>
        <MainWrapper>
          <Title>{title}</Title>
          <Tags>{tags}</Tags>
        </MainWrapper>
        <SideWrapper>
          <ActivityIndex count="1234" active={active} />
          <Date visible={date}>{date}</Date>
        </SideWrapper>
      </ListItemWrapper>
    );
  }
}

export default ListItem;
