import React, { Component } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

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
  padding-horizontal: 18;
  padding-vertical: 10;
`;

class Segment extends Component {
  state = {
    open: false
  };

  componentWillMount() {
    const { open } = this.props;
    if (open) {
      this.setState({ open });
    }
  }

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { title, collapsible } = this.props;
    const { open } = this.state;
    return (
      <Wrapper>
        <SegmentTouch onPress={this.toggle}>
          <SegmentWrapper>
            <Title>{title}</Title>
            {collapsible && <CollapseIcon open={open} />}
          </SegmentWrapper>
        </SegmentTouch>
        <Content open={open} collapsible={collapsible}>
          {this.props.children}
        </Content>
      </Wrapper>
    );
  }
}

Segment.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  collapsible: PropTypes.bool,
  children: PropTypes.node.isRequired
};

Segment.defaultProps = {
  collapsible: true,
  open: false
};

export default Segment;
