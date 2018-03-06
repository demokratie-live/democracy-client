import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

import ActivityIndex from "./ActivityIndex";
import DateTime from "./Date";

const ListItemWrapper = styled.View`
  flex-direction: row;
`;

const MainWrapper = styled.View`
  flex: 1;
  padding-right: 10;
`;

const SideWrapper = styled.View`
  align-items: center;
  justify-content: space-between;
  min-width: 50;
`;

const Title = styled.Text.attrs({ numberOfLines: 2 })`
  font-size: 17;
  color: #030303;
`;
const Tags = styled.Text.attrs({ numberOfLines: 2 })`
  padding-top: 8;
  font-size: 15;
  color: #8f8e94;
`;

const ListItem = ({ title, tags, active, date, activityIndex }) => (
  <ListItemWrapper>
    <MainWrapper>
      <Title>{title}</Title>
      <Tags>{tags.join(", ")}</Tags>
    </MainWrapper>
    <SideWrapper>
      <ActivityIndex count={activityIndex} active={active} />
      <DateTime date={date} />
    </SideWrapper>
  </ListItemWrapper>
);

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  active: PropTypes.bool,
  date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.bool
  ]),
  activityIndex: PropTypes.number.isRequired
};

ListItem.defaultProps = {
  tags: "",
  active: false,
  date: false
};

export default ListItem;
