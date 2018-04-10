import React, { Component } from "react";
import PropTypes from "prop-types";
import { PanResponder, Animated, Dimensions } from "react-native";
import styled from "styled-components/native";
import { graphql, compose } from "react-apollo";
import { Navigator } from "react-native-navigation";

import VoteButton from "../../components/VoteButton";

import VOTE from "../../graphql/mutations/vote";
import VOTE_LOCAL from "../../graphql/mutations/voteLocal";
import VOTED from "../../graphql/queries/voted";
import VOTES from "../../graphql/queries/votes";
import VOTED_LOCAL from "../../graphql/queries/votedLocal";
import GET_ACTIVITY_INDEX from "../../graphql/queries/activityIndex";

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 18;
  background-color: #fafafa;
`;

const DropZone = styled.View`
  position: absolute;
  right: 18;
  width: 100;
  height: 100;
  align-items: center;
  justify-content: center;
`;

const CheckIcon = styled.Image.attrs({
  source: require("../../../assets/icons/voteDropZone.png")
})``;

// const CheckIcon = styled(SimpleLineIcons).attrs({
//   size: 80,
//   color: "#000000",
//   name: "check"
// })`
//   padding-top: 5;
// `;

const LineWrapper = styled.View`
  position: absolute;
  left: 120;
  right: 120;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const Line = styled.Image.attrs({
  source: require("../../../assets/icons/vote-line.png"),
  resizeMode: "stretch"
})``;

class BalloutBox extends Component {
  state = {
    pan: new Animated.ValueXY(),
    isDraggable: true
  };

  componentWillMount() {
    // Add a listener for the delta value change
    const { vote, voteLocal, selection, navigator } = this.props;
    this.val = { x: 0, y: 0 };
    this.state.pan.addListener(value => {
      this.val = value;
    });
    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (this.state.isDraggable) {
          Animated.event([null, { dx: this.state.pan.x }])(e, gestureState);
        }
      },
      onPanResponderRelease: (e, gesture) => {
        if (this.state.isDraggable) {
          if (this.isDropArea(gesture)) {
            Animated.spring(this.state.pan, {
              toValue: {
                x: Dimensions.get("window").width - 94 - 2 * 18,
                y: 0
              },
              friction: 5
            }).start(() => {
              vote(selection).then(() => {
                voteLocal(selection);
              });

              navigator.dismissAllModals({
                animationType: "slide-down" // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
              });
            });
            this.setState({ isDraggable: false });
          } else {
            Animated.spring(this.state.pan, {
              toValue: { x: 0, y: 0 },
              friction: 5
            }).start();
          }
        }
      }
    });
    // adjusting delta value
    this.state.pan.setValue({ x: 0, y: 0 });
  }

  componentDidMount() {
    Animated.timing(this.state.pan, {
      toValue: { x: 20, y: 0 },
      duration: 1000
    }).start(event => {
      if (event.finished) {
        Animated.timing(this.state.pan, {
          toValue: { x: 0, y: 0 },
          duration: 300
        }).start();
      }
    });
  }

  onLayout = ({ nativeEvent: { layout: { width } } }) => {
    if (!this.state.isDraggable) {
      Animated.spring(this.state.pan, {
        toValue: {
          x: width - 94 - 2 * 18,
          y: 0
        }
      }).start();
    }
  };

  isDropArea = gesture => gesture.moveX > Dimensions.get("window").width - 100;

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };
    const { selection } = this.props;
    return (
      <Wrapper onLayout={this.onLayout}>
        <DropZone>
          <CheckIcon />
        </DropZone>
        <LineWrapper>
          <Line />
        </LineWrapper>
        <Animated.View {...this.panResponder.panHandlers} style={[panStyle]}>
          <VoteButton selection={selection} />
        </Animated.View>
      </Wrapper>
    );
  }
}

BalloutBox.propTypes = {
  vote: PropTypes.func.isRequired,
  voteLocal: PropTypes.func.isRequired,
  selection: PropTypes.string.isRequired,
  navigator: PropTypes.instanceOf(Navigator).isRequired
};

export default compose(
  graphql(VOTE, {
    props({ ownProps: { procedureObjId, procedureId }, mutate }) {
      return {
        vote: selection =>
          mutate({
            variables: { procedure: procedureObjId, selection },
            optimisticResponse: {
              __typename: "Mutation",
              vote: {
                __typename: "Vote",
                voted: true
              }
            },
            update: (proxy, { data: { vote: { voted } } }) => {
              const data = proxy.readQuery({
                query: VOTED,
                variables: { procedure: procedureObjId }
              });
              data.votes.voted = voted;
              proxy.writeQuery({
                query: VOTED,
                variables: { procedure: procedureObjId },
                data
              });
              const activityData = proxy.readQuery({
                query: GET_ACTIVITY_INDEX,
                variables: { procedureId }
              });
              if (!activityData.activityIndex.active) {
                activityData.activityIndex.active = true;
                activityData.activityIndex.activityIndex += 1;
                proxy.writeQuery({
                  query: GET_ACTIVITY_INDEX,
                  variables: { procedureId },
                  data: activityData
                });
              }
            },
            refetchQueries: [
              {
                query: VOTES,
                variables: { procedure: procedureObjId }
              }
            ]
          })
      };
    }
  }),

  graphql(VOTE_LOCAL, {
    name: "voteLocal",
    props({ ownProps: { procedureObjId }, voteLocal }) {
      return {
        voteLocal: selection =>
          voteLocal({
            variables: { procedure: procedureObjId, selection },
            refetchQueries: [
              {
                query: VOTED_LOCAL,
                variables: { procedure: procedureObjId }
              }
            ]
          })
      };
    }
  })
)(BalloutBox);
