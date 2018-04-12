import React, { Component } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

import ArgumentEntry from "../ArgumentEntry";

const Content = styled.View`
  flex: 1;
  padding-horizontal: 11;
  padding-vertical: 11;
`;

const Title = styled.Text.attrs({
  numberOfLines: 1
}) ``;

const Text = styled.Text``;

const TextMore = styled.Text.attrs({}) `
  padding-top: 7;
  color: #979797;
`;

const Side = styled.View`
  padding-vertical: 11;
  padding-right: 11;
  align-items: center;
  justify-content: flex-end;
`;

const Collapse = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 25;
  height: 15;
`;

const CollapseImage = styled.Image.attrs({
  source: ({ open }) =>
    open
      ? require("../../../assets/icons/segmentOpen.png")
      : require("../../../assets/icons/segmentClosed.png")
}) ``;

class Message extends Component {
  state = {
    moreTextOpened: false
  };
  render() {
    const { argumentation, title, text, moreText } = this.props;
    const { moreTextOpened } = this.state;
    return (
      <ArgumentEntry argumentation={argumentation}>
        <Content>
          {!!title && <Title>{title}</Title>}
          <Text numberOfLines={4}>{text}</Text>
          {!!moreText && (
            <TextMore numberOfLines={moreTextOpened ? 0 : 1}>
              {moreText}
            </TextMore>
          )}
        </Content>
        <Side>
          <Collapse
            onPress={() => this.setState({ moreTextOpened: !moreTextOpened })}
          >
            <CollapseImage open={moreTextOpened} />
          </Collapse>
        </Side>
      </ArgumentEntry>
    );
  }
}

Message.propTypes = {
  argumentation: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  moreText: PropTypes.string
};

Message.defaultProps = {
  argumentation: "neutral",
  title: "",
  moreText: ""
};

export default Message;
