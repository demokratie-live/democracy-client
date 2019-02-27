import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { graphql, compose } from 'react-apollo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Navigator } from 'react-native-navigation';

import INCREASE_ACTIVITY from '../graphql/mutations/increaseActivity';

import F_ACTIVITY_INDEX from '../graphql/fragments/ProcedureActivityIndex';

const Wrapper = styled.View`
  align-items: center;
`;

const WrapperTouchable = styled.TouchableOpacity`
  align-items: center;
`;

const Counter = styled.Text`
  font-size: ${({ listView }) => (listView ? 15 : 18)};
  color: #8f8e94;
`;

const Arrow = styled(Ionicons).attrs(({ listView, active }) => ({
  size: listView ? 45 : 50,
  name: 'ios-arrow-up-outline',
  color: active ? 'rgb(68, 148, 211)' : 'rgb(199, 199, 204)',
}))`
  padding-top: 15;
  margin-bottom: -15;
  line-height: 20;
  text-align-vertical: top;
`;

const VerificationTouch = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 100;
`;

class ActivityIndex extends Component {
  shouldComponentUpdate(p) {
    const { active, activityIndex } = this.props;
    return active !== p.active || activityIndex !== p.activityIndex;
  }

  render() {
    const {
      active,
      touchable,
      activityIndex,
      increaseActivity,
      listView,
      verified,
      procedureId,
      navigator,
    } = this.props;
    if (touchable && !active) {
      return (
        <WrapperTouchable onPress={increaseActivity}>
          {verified ? null : (
            <VerificationTouch
              onPress={() => {
                navigator.showModal({
                  screen: 'democracy.SmsVerification',
                  passProps: {
                    procedureId,
                    onComplete: this.onComplete,
                  },
                });
              }}
            />
          )}
          <Arrow active={active} listView={listView} />
          <Counter listView={listView}>{activityIndex}</Counter>
        </WrapperTouchable>
      );
    }
    return (
      <Wrapper>
        <Arrow active={active} listView={listView} />
        <Counter listView={listView}>{activityIndex}</Counter>
      </Wrapper>
    );
  }
}

ActivityIndex.propTypes = {
  procedureId: PropTypes.string.isRequired, // eslint-disable-line
  increaseActivity: PropTypes.func.isRequired,
  activityIndex: PropTypes.number,
  active: PropTypes.bool,
  touchable: PropTypes.bool,
  listView: PropTypes.bool,
  verified: PropTypes.bool,
  navigator: PropTypes.instanceOf(Navigator),
};

ActivityIndex.defaultProps = {
  active: false,
  touchable: false,
  listView: false,
  activityIndex: 0,
  verified: true,
  navigator: null,
};

export default compose(
  graphql(INCREASE_ACTIVITY, {
    props({ ownProps: { activityIndex: prevActivityIndex, procedureId }, mutate }) {
      return {
        increaseActivity: () =>
          mutate({
            variables: { procedureId },
            optimisticResponse: {
              __typename: 'Mutation',
              increaseActivity: {
                id: procedureId,
                __typename: 'ActivityIndex',
                activityIndex: prevActivityIndex + 1,
                active: true,
              },
            },
            update: (cache, { data: { increaseActivity } }) => {
              // ActivityIndex increasing
              const aiFragment = cache.readFragment({
                id: procedureId,
                fragment: F_ACTIVITY_INDEX,
              });
              if (!aiFragment.activityIndex.active) {
                aiFragment.activityIndex.active = increaseActivity.active;
                aiFragment.activityIndex.activityIndex = increaseActivity.activityIndex;
                cache.writeFragment({
                  id: procedureId,
                  fragment: F_ACTIVITY_INDEX,
                  data: aiFragment,
                });
              }
            },
          }),
      };
    },
  }),
)(ActivityIndex);
