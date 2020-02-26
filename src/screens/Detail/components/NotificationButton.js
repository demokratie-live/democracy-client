import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

// Components
import IntroButton from './IntroButton';

// GraphQl
import TOGGLE_NOTIFICATION from '../../../graphql/mutations/toggleNotification';
import GET_PROCEDURE from '../../../graphql/queries/getProcedure';

const NotificationButtonIcon = styled(Ionicons).attrs(({ active }) => ({
  size: 32,
  name: active ? 'ios-notifications' : 'ios-notifications-outline',
  color: active ? 'rgb(255, 171, 33)' : 'rgb(0, 0, 0)',
}))``;

const optimisticResponse = ({ notify }) => {
  return {
    __typename: 'Mutation',
    toggleNotification: {
      __typename: 'Procedure',
      notify: !notify,
    },
  };
};

const update = ({ procedureId }) => (
  cache,
  {
    data: {
      toggleNotification: { notify: newNotify },
    },
  },
) => {
  const data = cache.readQuery({
    query: GET_PROCEDURE,
    variables: { id: procedureId },
  });
  data.procedure.notify = newNotify;
  cache.writeQuery({
    query: GET_PROCEDURE,
    variables: { id: procedureId },
    data,
  });
};

// TODO https://github.com/apollographql/apollo-client/issues/4160 remove unnececary arrow function
class NotificationButton extends PureComponent {
  render() {
    const { notify, procedureId } = this.props;
    return (
      <Mutation
        mutation={TOGGLE_NOTIFICATION}
        variables={{ procedureId: procedureId }}
        optimisticResponse={optimisticResponse({ notify })}
        update={update({ procedureId })}
      >
        {toggleNotification => (
          <IntroButton onPress={() => toggleNotification()}>
            <NotificationButtonIcon active={notify} />
          </IntroButton>
        )}
      </Mutation>
    );
  }
}

NotificationButton.propTypes = {
  notify: PropTypes.bool,
  procedureId: PropTypes.string.isRequired,
};

NotificationButton.defaultProps = {
  notify: false,
};

export default NotificationButton;
