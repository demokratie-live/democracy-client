/* eslint no-underscore-dangle: ["error", { "allow": ["__typename"] }] */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Platform, Text, Switch, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Navigator } from "react-native-navigation";
import { graphql, compose } from "react-apollo";
import _ from "lodash";

import Row from "../../components/ListRow";
import Header from "../../components/ListSectionHeader";

import onNavigationEvent from "../onNavigationEvent";

import GET_NOTIFICATION_SETTINGS from "../../graphql/queries/notificationSettings";
import UPDATE_NOTIFICATION_SETTINGS from "../../graphql/mutations/updateNotificationSettings";

const Wrapper = styled.SectionList`
  flex: 1;
  background-color: #fff;
`;

const SwitchItemWrapper = styled.View`
  flex-direction: row;
`;

const SwitchItemTitle = styled.Text`
  flex: 1;
  align-self: center;
`;

const SwitchItemIcon = styled(Ionicons).attrs({
  color: "#000",
  size: 20,
  backgroundColor: "transparent"
})`
  align-self: center;
  padding-right: 11;
`;

const sections = [
  {
    key: "global",
    data: [{ title: "Benachrichtigungen", key: "enabled", type: "switch" }]
  },
  {
    title: "Kategorie",
    key: "categories",
    data: [
      {
        title: "Neu in Abstimmung",
        key: "newVote",
        type: "switch"
      },
      {
        title: "Neu in Vorbereitung",
        key: "newPreperation",
        type: "switch"
      }
    ]
  },
  {
    title: "Abonierte Benachrichtigungen",
    key: "abos",
    data: []
  }
];

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

  onToggleSwitch = key => async () => {
    const { update, notificationSettings } = this.props;
    switch (key) {
      case "enabled":
        this.enabledToggle();
        break;

      default:
        await update({
          variables: { [key]: !notificationSettings[key] }
        });
        break;
    }
    return false;
  };

  enabledToggle = async () => {
    const { update, notificationSettings: { enabled } } = this.props;
    let disableUntil;
    if (enabled) {
      disableUntil = await new Promise(resolve => {
        Alert.alert(
          "Benachrichtigungen abschalten",
          "Wie lange möchtest du eine Pause von der Politik?",
          [
            {
              text: "Ein Jahr",
              onPress: () =>
                resolve(
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() + 1)
                  ).toString()
                )
            },
            {
              text: "Eine Woche",
              onPress: () => {
                const now = new Date();
                now.setDate(now.getDate() + 7);
                resolve(now.toString());
              }
            },
            {
              text: "Einen Tag",
              onPress: () => {
                const now = new Date();
                now.setDate(now.getDate() + 1);
                resolve(now.toString());
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

    if (disableUntil !== "cancel" || !enabled)
      await update({
        variables: { enabled: !enabled, disableUntil }
      });
  };
  renderSwitch = ({ title, key }) => {
    const { notificationSettings } = this.props;

    let icon;
    let style = {};
    const value = notificationSettings[key];

    switch (key) {
      case "enabled":
        icon =
          Platform.OS === "ios" ? "ios-paper-plane-outline" : "md-paper-plane";
        break;
      case "newVote":
        icon = Platform.OS === "ios" ? "ios-pie-outline" : "md-pie";
        break;
      case "newPreperation":
        style = {
          transform: [{ scaleX: -1 }],
          paddingLeft: 11,
          paddingRight: 0
        };
        icon = Platform.OS === "ios" ? "ios-undo" : "md-undo";
        break;

      default:
        break;
    }

    return (
      <Row>
        <SwitchItemWrapper>
          <SwitchItemIcon name={icon} style={style} />
          <SwitchItemTitle>{title}</SwitchItemTitle>
          <Switch
            value={value}
            onValueChange={this.onToggleSwitch(key)}
            disabled={key !== "enabled" && !notificationSettings.enabled}
          />
        </SwitchItemWrapper>
      </Row>
    );
  };

  renderItem = args => {
    const { item: { type, title, key } } = args;

    switch (type) {
      case "switch":
        return this.renderSwitch({ title, key });

      default:
        break;
    }

    return null;
  };

  render() {
    const { loading, notificationSettings } = this.props;
    return (
      <Wrapper
        sections={sections}
        renderItem={this.renderItem}
        renderSectionHeader={({ section }) => <Header title={section.title} />}
      >
        <Text>Benachrichtigungen</Text>
        <Switch
          disabled={loading}
          value={notificationSettings.enabled}
          onValueChange={this.onToggleSwitch}
        />
      </Wrapper>
    );
  }
}

Notifications.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  loading: PropTypes.bool.isRequired,
  notificationSettings: PropTypes.shape({
    enabled: PropTypes.bool,
    disableUntil: PropTypes.string
  })
};

Notifications.defaultProps = {
  notificationSettings: {
    enabled: true
  }
};

export default compose(
  graphql(GET_NOTIFICATION_SETTINGS, {
    options: {
      fetchPolicy: "cache-and-network"
    },
    props: ({
      data: { loading, notificationSettings = { enabled: true } }
    }) => ({
      loading,
      notificationSettings
    })
  }),
  graphql(UPDATE_NOTIFICATION_SETTINGS, {
    options: {
      refetchQueries: [{ query: GET_NOTIFICATION_SETTINGS }]
    },
    props({ mutate, ownProps: { notificationSettings } }) {
      return {
        update: ({ variables }) => {
          mutate({
            variables,
            optimisticResponse: {
              __typename: "Mutation",
              updateNotificationSettings: {
                __typename: notificationSettings.__typename,
                ...notificationSettings,
                ..._.omitBy(variables, _.isNil)
              }
            },
            update: (cache, { data: { updateNotificationSettings } }) => {
              const data = cache.readQuery({
                query: GET_NOTIFICATION_SETTINGS
              });
              data.notificationSettings = { ...updateNotificationSettings };
              cache.writeQuery({
                query: GET_NOTIFICATION_SETTINGS,
                data
              });
            }
          });
        }
      };
    }
  })
)(Notifications);
