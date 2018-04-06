import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { graphql } from "react-apollo";

import GET_NETWORK_STATUS from "../../graphql/queries/getNetworkStatus";

const Wrapper = styled.View`
  flex: 1;
`;

const Notification = styled.View`
  background-color: ${({ offline }) => (offline ? "#ec3e31" : "orange")};
  justify-content: center;
  align-items: center;
  padding-vertical: 2;
`;

const NotificationText = styled.Text`
  text-align: center;
`;

export default ComposedComponent => {
  const NetworkStatus = ({ isConnected, requestError, ...rest }) => (
      <Wrapper>
        <ComposedComponent
          {...rest}
          connectionError={!!(!isConnected || requestError)}
        />
        {(!isConnected || !!requestError) && (
          <Notification offline={!isConnected}>
            <NotificationText>
              {requestError || "Keine Internetverbindung"}
            </NotificationText>
          </Notification>
        )}
      </Wrapper>
    );

  NetworkStatus.propTypes = {
    isConnected: PropTypes.bool,
    requestError: PropTypes.string
  };

  NetworkStatus.defaultProps = {
    isConnected: true,
    requestError: ""
  };

  return graphql(GET_NETWORK_STATUS, {
    props: ({ data: { networkStatus } }) => ({ ...networkStatus })
  })(NetworkStatus);
};
