import { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { Navigator } from 'react-native-navigation';

import INCREASE_ACTIVITY from '../graphql/mutations/increaseActivity';

import F_ACTIVITY_INDEX from '../graphql/fragments/ProcedureActivityIndex';

class ActivityIndex extends Component {
  shouldComponentUpdate(nextProps) {
    const { active, activityIndex } = this.props;
    if (active !== nextProps.active || activityIndex !== nextProps.activityIndex) {
      return true;
    }
    return false;
  }

  render() {
    const { active, touchable, increaseActivity, verified, procedureId, navigator } = this.props;

    if (touchable && !active) {
      return this.props.children({
        onPress: verified
          ? increaseActivity
          : () => {
              navigator.showModal({
                screen: 'democracy.SmsVerification',
                passProps: {
                  procedureId,
                  onComplete: this.onComplete,
                },
              });
            },
      });
    }

    return this.props.children({
      onPress: null,
    });
  }
}

ActivityIndex.propTypes = {
  procedureId: PropTypes.string.isRequired, // eslint-disable-line
  increaseActivity: PropTypes.func.isRequired,
  activityIndex: PropTypes.number,
  active: PropTypes.bool,
  touchable: PropTypes.bool,
  verified: PropTypes.bool,
  navigator: PropTypes.instanceOf(Navigator),
  children: PropTypes.node.isRequired,
};

ActivityIndex.defaultProps = {
  active: false,
  touchable: false,
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
