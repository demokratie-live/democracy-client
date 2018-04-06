import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

import ArgumentEntry from "../ArgumentEntry";

const argumentationColors = {
  pro: "#4ecd45",
  contra: "#cd4545",
  neutral: "lightgrey"
};

const Wrapper = styled.View`
  padding-bottom: 11;
  padding-horizontal: 18;
`;

const RowWrapper = styled.View`
  border-top-left-radius: 10;
  border-bottom-left-radius: 10;
  border-right-width: 3;
  border-color: ${({ argumentation }) =>
    argumentation
      ? argumentationColors[argumentation]
      : argumentationColors.neutral};
  background-color: white;
  overflow: hidden;
  flex-direction: row;
  padding-horizontal: 11;
  padding-vertical: 11;
`;

const Image = styled.Image.attrs({
  width: 82,
  height: 82
})`
  width: 82;
  height: 82;
`;

const Content = styled.View`
  flex: 1;
  padding-horizontal: 11;
  padding-vertical: 11;
`;

const Title = styled.Text.attrs({
  numberOfLines: 1
})`
  padding-bottom: 11;
`;

const Text = styled.Text``;

const TextMore = styled.Text.attrs({
  numberOfLines: 1
})``;

const EntryContent = styled.View`
  flex: 1;
  padding-horizontal: 11;
  padding-vertical: 11;
`;

const Link = ({ image, children, argumentation, title, text, textMore }) => (
  <ArgumentEntry argumentation={argumentation}>
    {image && <Image {...image} />}
    <Content>
      {title && <Title>{title}</Title>}
      <Text numberOfLines={2}>{text}</Text>
    </Content>
  </ArgumentEntry>
);

Link.propTypes = {
  children: PropTypes.node,
  image: PropTypes.shape(),
  argumentation: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  textMore: PropTypes.string
};

Link.defaultProps = {
  image: null,
  children: null,
  argumentation: "neutral",
  title: "",
  textMore: ""
};

export default Link;
