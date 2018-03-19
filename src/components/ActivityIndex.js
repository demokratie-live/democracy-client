import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { graphql, compose } from "react-apollo";

import getActivityIndex from "../graphql/queries/activityIndex";
import INCREASE_ACTIVITY from "../graphql/mutations/increaseActivity";

const Wrapper = styled.View`
  align-items: center;
`;

const WrapperTouchable = styled.TouchableOpacity`
  align-items: center;
`;

const Icon = styled.Image``;

const Counter = styled.Text`
  padding-top: 8;
  font-size: 18;
  color: #8f8e94;
`;

const iconActive = require("../../assets/icons/disclosureIndicator-active.png");
const iconInactive = require("../../assets/icons/disclosureIndicator.png");

class ActivityIndex extends Component {
  componentWillReceiveProps() {}
  render() {
    const { active, touchable, activityIndex, increaseActivity } = this.props;
    if (touchable && !active) {
      return (
        <WrapperTouchable onPress={increaseActivity}>
          <Icon source={active ? iconActive : iconInactive} />
          <Counter>{activityIndex}</Counter>
        </WrapperTouchable>
      );
    }
    return (
      <Wrapper>
        <Icon source={active ? iconActive : iconInactive} />
        <Counter>{activityIndex}</Counter>
      </Wrapper>
    );
  }
}

ActivityIndex.propTypes = {
  procedureId: PropTypes.string.isRequired, // eslint-disable-line
  increaseActivity: PropTypes.func.isRequired,
  activityIndex: PropTypes.number.isRequired,
  active: PropTypes.bool,
  touchable: PropTypes.bool
};

ActivityIndex.defaultProps = {
  active: false,
  touchable: false
};

export default compose(
  graphql(getActivityIndex, {
    props: ({ data: { activityIndex } }) => ({
      activityIndex: activityIndex ? activityIndex.activityIndex : 0,
      active: activityIndex ? activityIndex.active : false
    }),
    options: () => ({
      fetchPolicy: "cache-and-network"
    })
  }),

  graphql(INCREASE_ACTIVITY, {
    props({
      ownProps: { activityIndex: prevActivityIndex, procedureId },
      mutate
    }) {
      return {
        increaseActivity: () =>
          mutate({
            variables: { procedureId },
            optimisticResponse: {
              __typename: "Mutation",
              increaseActivity: {
                id: procedureId,
                __typename: "ActivityIndex",
                activityIndex: prevActivityIndex + 1,
                active: true
              }
            },
            update: (proxy, { data: { increaseActivity } }) => {
              const data = proxy.readQuery({
                query: getActivityIndex,
                variables: { procedureId }
              });
              data.activityIndex = increaseActivity;
              proxy.writeQuery({
                query: getActivityIndex,
                variables: { procedureId },
                data
              });
            }
          })
      };
    }
  })
)(ActivityIndex);
