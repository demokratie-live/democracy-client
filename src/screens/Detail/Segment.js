import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

import DetailsSegment from "./Segments/Details";
import DocumentsSegment from "./Segments/Documents";
import Voting from "./Segments/Voting";

const Wrapper = styled.View``;

const SegmentTouch = styled.TouchableHighlight.attrs({
  activeOpacity: 0.5,
  underlayColor: "rgba(68, 148, 211, 0.1)"
})``;

const SegmentWrapper = styled.View`
  padding-vertical: 10;
  padding-horizontal: 18;
  flex-direction: row;
  border-bottom-width: 1;
  border-bottom-color: rgba(68, 148, 211, 0.1);
  align-items: center;
`;

const Title = styled.Text`
  flex: 1;
  font-size: 17;
`;

const CollapseIcon = styled.Image.attrs({
  source: ({ open }) =>
    open
      ? require("../../../assets/icons/segmentOpen.png")
      : require("../../../assets/icons/segmentClosed.png")
})``;

const Content = styled.View`
  display: ${({ open, collapsible }) =>
    open || !collapsible ? "flex" : "none"};
  padding-horizontal: 16;
  padding-vertical: 10;
`;

const Segment = ({ type, title, onPress, open, data, collapsible }) => {
  const renderContent = () => {
    switch (type) {
      case "details":
        return <DetailsSegment {...data} />;
      case "documents":
        return <DocumentsSegment {...data} />;
      case "voting":
        return <Voting {...data} />;

      default:
        return <Title>Kein Segement definiert</Title>;
    }
  };
  return (
    <Wrapper>
      <SegmentTouch onPress={onPress}>
        <SegmentWrapper>
          <Title>{title}</Title>
          {collapsible && <CollapseIcon open={open} />}
        </SegmentWrapper>
      </SegmentTouch>
      <Content open={open} collapsible={collapsible}>
        {renderContent()}
      </Content>
    </Wrapper>
  );
};

Segment.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.shape({}),
  collapsible: PropTypes.bool
};

Segment.defaultProps = {
  data: {},
  collapsible: true
};

export default Segment;
