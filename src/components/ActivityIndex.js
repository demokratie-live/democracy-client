import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { graphql, compose } from "react-apollo";

import INCREASE_ACTIVITY from "../graphql/mutations/increaseActivity";

import F_ACTIVITY_INDEX from "../graphql/fragments/ProcedureActivityIndex";

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
  activityIndex: PropTypes.number,
  active: PropTypes.bool,
  touchable: PropTypes.bool
};

ActivityIndex.defaultProps = {
  active: false,
  touchable: false,
  activityIndex: 0
};

export default compose(
  // graphql(getActivityIndex, {
  //   props: props => {
  //     console.log("getActivityIndex", props);
  //     const { data: { activityIndex } } = props;
  //     return {
  //       activityIndex: activityIndex ? activityIndex.activityIndex : 0,
  //       active: activityIndex ? activityIndex.active : false
  //     };
  //   },
  //   skip: ({ skipFetchData }) => skipFetchData,
  //   options: () => ({
  //     fetchPolicy: "cache-and-network"
  //   })
  // }),
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
            update: (cache, { data: { increaseActivity } }) => {
              // ActivityIndex increasing
              const aiFragment = cache.readFragment({
                id: procedureId,
                fragment: F_ACTIVITY_INDEX
              });
              if (!aiFragment.activityIndex.active) {
                aiFragment.activityIndex.active = increaseActivity.active;
                aiFragment.activityIndex.activityIndex =
                  increaseActivity.activityIndex;
                cache.writeFragment({
                  id: procedureId,
                  fragment: F_ACTIVITY_INDEX,
                  data: aiFragment
                });
              }
            }
          })
      };
    }
  })
)(ActivityIndex);
