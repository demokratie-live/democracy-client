import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Platform, Text, Switch, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Navigator } from "react-native-navigation";
import { graphql, compose } from "react-apollo";

import onNavigationEvent from "../onNavigationEvent";

import GET_NOTIFICATION_SETTINGS from "../../graphql/queries/notificationSettings";
import UPDATE_NOTIFICATION_SETTINGS from "../../graphql/mutations/updateNotificationSettings";

const Wrapper = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

class Notifications extends Component {
  static navigatorStyle = {
    navBarButtonColor: "#FFFFFF",
    navBarBackgroundColor: "#4494d3",
    navBarTextColor: "#FFFFFF",
    navBarTextFontSize: 17
  };

  constructor(props) {
    super(props);

    const menuIcon = Platform.OS === "ios" ? "ios-menu" : "md-menu";

    Ionicons.getImageSource(menuIcon, 24, "#FFFFFF").then(icon => {
      props.navigator.setButtons({
        leftButtons: [
          {
            icon,
            id: "menu"
          }
        ]
      });
    });

    this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent);
  }

  onNavigationEvent = event => {
    onNavigationEvent({ event, navigator: this.props.navigator });
  };

  disableAll = async () => {
    const { update, notificationSettings: { disableAll } } = this.props;
    let disableUntil;
    if (!disableAll) {
      disableUntil = await new Promise(resolve => {
        Alert.alert(
          "Benachrichtigungen abschalten",
          "Wie lange möchtest du eine Pause von der Politik?",
          [
            {
              text: "Ein Jahr",
              onPress: () =>
                resolve(
                  new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                )
            },
            {
              text: "Eine Woche",
              onPress: () => {
                const now = new Date();
                now.setDate(now.getDate() + 7);
                resolve(now);
              }
            },
            {
              text: "Einen Tag",
              onPress: () => {
                const now = new Date();
                now.setDate(now.getDate() + 1);
                resolve(now);
              }
            },
            {
              text: "Garnicht",
              onPress: () => "cancel"
            }
          ],
          { cancelable: false }
        );
      });
    }
    if (disableUntil !== "cancel" || disableAll)
      await update({
        variables: { disableAll: !disableAll, disableUntil }
      });
  };

  render() {
    const { loading, notificationSettings } = this.props;
    return (
      <Wrapper>
        <Text>Benachrichtigungen</Text>
        <Switch
          disabled={loading}
          value={!notificationSettings.disableAll}
          onValueChange={this.disableAll}
        />
      </Wrapper>
    );
  }
}

Notifications.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  loading: PropTypes.bool.isRequired,
  notificationSettings: PropTypes.shape({
    disableAll: PropTypes.bool.isRequired,
    disableUntil: PropTypes.string.isRequired
  }).isRequired
};

export default compose(
  graphql(GET_NOTIFICATION_SETTINGS, {
    options: {
      fetchPolicy: "cache-and-network"
    },
    props: ({
      data: { loading, notificationSettings = { disableAll: true } }
    }) => ({
      loading,
      notificationSettings
    })
  }),
  graphql(UPDATE_NOTIFICATION_SETTINGS, {
    options: {
      refetchQueries: [{ query: GET_NOTIFICATION_SETTINGS }]
    },
    name: "update"
  })
)(Notifications);
