import React from "react";
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

const ActivityIndex = ({
  active,
  touchable,
  activityIndex,
  increaseActivity
}) => {
  if (touchable) {
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
};

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
    props: ({ data: { activityIndex: { activityIndex } } }) => ({
      activityIndex
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
                activityIndex: prevActivityIndex + 1
              }
            },
            update: (
              proxy,
              { data: { increaseActivity: { activityIndex } } }
            ) => {
              const data = proxy.readQuery({
                query: getActivityIndex,
                variables: { procedureId }
              });
              data.activityIndex.activityIndex = activityIndex;
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
