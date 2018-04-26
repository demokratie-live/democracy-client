import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";

const VoteIconButtonWrapper = styled.TouchableOpacity`
  width: 88;
  height: 88;

  border-color: rgba(21, 192, 99, 0.8);
  border-radius: ${88 / 2};
  align-items: center;
  justify-content: center;
  background-color: ${({ selection, votedSelection, voted }) => {
    if ((voted || votedSelection) && selection !== votedSelection) {
      return "grey";
    }
    switch (selection) {
      case "YES":
        return "#15C063";
      case "ABSTINATION":
        return "#2C82E4";
      case "NO":
        return "#EC3E31";
      default:
        return "grey";
    }
  }};
`;

const VoteIconButton = styled.Image.attrs({
  flex: 1,
  source: require("../../assets/icons/thumbsUp.png"),
  resizeMode: "contain",
  width: null,
  height: null
})`
  width: 40;
  height: 40;
`;

const VoteButton = props => {
  const { votedSelection, onPress, selection, voted, style } = props;
  let styleWrapper;
  let styleButton;
  switch (selection) {
    case "YES":
      styleButton = {
        marginBottom: 5
      };
      break;
    case "ABSTINATION":
      styleWrapper = {
        borderColor: "rgba(44, 130, 228, 0.8)"
      };
      styleButton = {
        transform: [{ rotate: "-90deg" }],
        marginRight: 5
      };

      break;
    case "NO":
      styleWrapper = {
        borderColor: "rgba(236, 62, 49, 0.8)"
      };
      styleButton = {
        transform: [{ rotate: "180deg" }],
        marginTop: 5
      };
      break;

    default:
      break;
  }
  return (
    <VoteIconButtonWrapper
      voted={voted}
      disabled={!!(!onPress || votedSelection)}
      selection={selection}
      votedSelection={votedSelection}
      onPress={onPress}
      style={{ ...styleWrapper, ...style }}
    >
      <VoteIconButton style={styleButton} />
    </VoteIconButtonWrapper>
  );
};

VoteButton.propTypes = {
  votedSelection: PropTypes.string,
  onPress: PropTypes.func,
  selection: PropTypes.string.isRequired,
  voted: PropTypes.bool,
  style: PropTypes.shape()
};

VoteButton.defaultProps = {
  votedSelection: null,
  onPress: null,
  voted: null,
  style: {}
};

export default VoteButton;
