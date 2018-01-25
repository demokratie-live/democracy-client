import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

import ActivityIndex from "./ActivityIndex";

const ListItemWrapper = styled.View`
  flex-direction: row;
`;

const MainWrapper = styled.View`
  flex: 1;
`;

const SideWrapper = styled.View`
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 17;
  color: #030303;
`;
const Tags = styled.Text`
  padding-top: 8;
  font-size: 15;
  color: #8f8e94;
`;

const Date = styled.Text`
  padding-top: 8;
  color: #44db5e;
  font-size: 12;
  display: ${({ visible }) => (visible ? "flex" : "none")};
`;

const ListItem = ({ title, tags, active, date, activityIndex }) => (
  <ListItemWrapper>
    <MainWrapper>
      <Title>{title}</Title>
      <Tags>{tags}</Tags>
    </MainWrapper>
    <SideWrapper>
      <ActivityIndex count={activityIndex} active={active} />
      <Date visible={date}>{date}</Date>
    </SideWrapper>
  </ListItemWrapper>
);

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.string,
  active: PropTypes.bool,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  activityIndex: PropTypes.number.isRequired
};

ListItem.defaultProps = {
  tags: "",
  active: false,
  date: false
};

export default ListItem;
