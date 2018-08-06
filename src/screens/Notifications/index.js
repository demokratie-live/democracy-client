/* eslint no-underscore-dangle: ["error", { "allow": ["__typename"] }] */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import {
  Platform,
  Switch,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  View,
  Text,
  Linking,
  Button,
  AppState
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Navigator } from "react-native-navigation";
import { graphql, compose } from "react-apollo";
import _ from "lodash";
import NotificationsIOS from "react-native-notifications";

import Row from "../../components/ListRow";
import Header from "../../components/ListSectionHeader";
import ListItem from "../../components/VoteListItem";

import GET_NOTIFICATION_SETTINGS from "../../graphql/queries/notificationSettings";
import GET_NOTIFIED_PROCEDURES from "../../graphql/queries/notifiedProcedures";
import UPDATE_NOTIFICATION_SETTINGS from "../../graphql/mutations/updateNotificationSettings";
import TOGGLE_NOTIFICATION from "../../graphql/mutations/toggleNotification";

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

const ProcedureDetailWrapper = styled.View`
  flex-direction: row;
  margin-top: 20;
  align-items: center;
`;

// const NotificationButtonIcon = styled(Ionicons).attrs({
//   size: 32,
//   name: ({ active }) =>
//     active ? "ios-notifications" : "ios-notifications-outline",
//   color: ({ active }) => (active ? "rgb(255, 171, 33)" : "rgb(0, 0, 0)")
// })``;

const ProcedureDescription = styled.Text`
  font-size: 13;
  color: #8f8e94;
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
    title: "Abonnierte Benachrichtigungen",
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
  }

  state = {
    notificationsAllowed: Platform.OS === "ios" ? null : true,
    appState: AppState.currentState
  };

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);

    if (Platform.OS === "ios") {
      NotificationsIOS.checkPermissions().then(currentPermissions => {
        this.setState({
          notificationsAllowed:
            !!currentPermissions.badge ||
            !!currentPermissions.sound ||
            !!currentPermissions.alert
        });
      });
    } else {
      // TODO: Check android permissions
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

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

  onItemClick = ({ item }) => () => {
    const { navigator } = this.props;
    navigator.push({
      screen: "democracy.Detail",
      title: "Abstimmung".toUpperCase(),
      passProps: { ...item },
      backButtonTitle: ""
    });
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

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      if (Platform.OS === "ios") {
        NotificationsIOS.checkPermissions().then(currentPermissions => {
          this.setState({
            notificationsAllowed:
              !!currentPermissions.badge ||
              !!currentPermissions.sound ||
              !!currentPermissions.alert
          });
        });
      }
    }
    this.setState({ appState: nextAppState });
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
    const { item, item: { type, title, key } } = args;

    switch (type) {
      case "switch":
        return this.renderSwitch({ title, key });

      default:
        return (
          <TouchableHighlight
            onPress={this.onItemClick({ item })}
            underlayColor="rgba(68, 148, 211, 0.1)"
          >
            <Row>
              <ListItem {...item} date={item.voteDate}>
                <ProcedureDetailWrapper>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.toggleNotification({
                        procedureId: item.procedureId
                      })
                    }
                  >
                    {/* <NotificationButtonIcon active /> */}
                  </TouchableOpacity>
                  <ProcedureDescription>
                    {item.currentStatus}
                  </ProcedureDescription>
                </ProcedureDetailWrapper>
              </ListItem>
            </Row>
          </TouchableHighlight>
        );
    }
  };

  render() {
    if (this.state.notificationsAllowed === null) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else if (this.state.notificationsAllowed === false) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", paddingHorizontal: 18 }}
        >
          <Text>
            Bitte Push benachrichtigungen für die App in den Einstellungen
            aktivieren.
          </Text>
          <Button
            title="Einstellungen"
            onPress={() =>
              Linking.openURL(
                "app-settings://notification/de.democracy-deutschland.clientapp"
              )
            }
          />
        </View>
      );
    }

    const { notifiedProcedures } = this.props;
    const preparedSections = sections.map(section => {
      const { key } = section;
      const sect = { ...section };
      if (key === "abos") {
        sect.data = notifiedProcedures || [];
      }
      return sect;
    });
    return (
      <Wrapper
        sections={preparedSections}
        renderItem={this.renderItem}
        renderSectionHeader={({ section }) => <Header title={section.title} />}
        keyExtractor={({ key, procedureId }) => key || procedureId}
      />
    );
  }
}

Notifications.propTypes = {
  loading: PropTypes.bool.isRequired,
  notificationSettings: PropTypes.shape({
    enabled: PropTypes.bool,
    disableUntil: PropTypes.string
  }),
  toggleNotification: PropTypes.func.isRequired,
  notifiedProcedures: PropTypes.arrayOf(PropTypes.shape())
};

Notifications.defaultProps = {
  notificationSettings: {
    enabled: true
  },
  notifiedProcedures: []
};

export default compose(
  graphql(GET_NOTIFICATION_SETTINGS, {
    props: ({
      data: { loading, notificationSettings = { enabled: true } }
    }) => ({
      loading,
      notificationSettings
    }),
    options: {
      fetchPolicy: "cache-and-network"
    }
  }),
  graphql(GET_NOTIFIED_PROCEDURES, {
    props: ({ data: { notifiedProcedures } }) => ({
      notifiedProcedures
    }),
    options: () => ({
      fetchPolicy: "cache-and-network"
    })
  }),
  graphql(UPDATE_NOTIFICATION_SETTINGS, {
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
              try {
                const data = cache.readQuery({
                  query: GET_NOTIFICATION_SETTINGS
                });
                data.notificationSettings = { ...updateNotificationSettings };
                cache.writeQuery({
                  query: GET_NOTIFICATION_SETTINGS,
                  data
                });
              } catch (error) {
                // Error
              }
            }
          });
        }
      };
    }
  }),

  graphql(TOGGLE_NOTIFICATION, {
    props({ mutate }) {
      return {
        toggleNotification: ({ procedureId }) => {
          // const { data: { procedure: { notify, procedureId } } } = ownProps;
          mutate({
            variables: { procedureId },
            optimisticResponse: {
              __typename: "Mutation",
              toggleNotification: {
                __typename: "Procedure",
                notify: false
              }
            },
            update: cache => {
              const data = cache.readQuery({
                query: GET_NOTIFIED_PROCEDURES
              });
              data.notifiedProcedures = data.notifiedProcedures.filter(
                ({ procedureId: pId }) => pId !== procedureId
              );
              cache.writeQuery({
                query: GET_NOTIFIED_PROCEDURES,
                data
              });
            }
          });
        }
      };
    }
  })
)(Notifications);
