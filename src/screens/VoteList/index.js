// @flow

import React, { Component } from "react";
import {
  Platform,
  SegmentedControlIOS,
  Dimensions,
  AsyncStorage
} from "react-native";
import { graphql, compose } from "react-apollo";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Navigation, Navigator } from "react-native-navigation";
import Config from "react-native-config";
import RSAKey from "react-native-rsa";
import DeviceInfo from "react-native-device-info";
import { sha256 } from "react-native-sha256";
import { propType } from "graphql-anywhere";

import List from "./List";
import Header from "./Header";

import SET_INSTRUCTIONS_SHOWN from "../../graphql/mutations/setInstructinosShown";
import ME from "../../graphql/queries/me";
import SIGN_UP from "../../graphql/mutations/signUp";

Navigation.registerComponent("democracy.VoteList.Header", () => Header);

const Screen = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const ScrollView = styled.ScrollView.attrs({
  horizontal: true,
  pagingEnabled: true
})``;

const SegmentControlsWrapper = styled.View`
  background-color: #4494d3;
  height: 50;
  padding-left: 16;
  padding-right: 16;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 10;
`;

class VoteList extends Component {
  static navigatorStyle = {
    navBarNoBorder: true,
    navBarButtonColor: "#FFFFFF",
    navBarBackgroundColor: "#4494d3",
    navBarTextColor: "#FFFFFF",
    navBarTextFontSize: 17,
    selectedTopTabTextColor: "#ffffff",
    selectedTopTabIndicatorColor: "#ffffff",
    selectedTopTabIndicatorHeight: 5
  };

  state = {
    selectedIndex: 0
  };

  componentDidUpdate() {
    const { me, meLoading } = this.props;
    if (!me && !meLoading) {
      this.signIn();
    }
  }

  onScrollEndDrag = e => {
    if (this.width === Dimensions.get("window").width) {
      const { contentOffset } = e.nativeEvent;
      const viewSize = e.nativeEvent.layoutMeasurement;

      // Divide the horizontal offset by the width of the view to see which page is visible
      const pageNum = Math.floor(contentOffset.x / viewSize.width);
      if (this.state.selectedIndex !== pageNum) {
        this.setState({ selectedIndex: pageNum });
      }
    }
  };

  width = Dimensions.get("window").width;

  lists = [
    { key: "VOTING", title: "in Abstimmung", smallTitle: "Abstimmung" },
    {
      key: "PREPARATION",
      title: "in Vorbereitung",
      smallTitle: "Vorbereitung"
    },
    { key: "HOT", title: "What's hot?", smallTitle: "What's hot?" }
  ];

  showIntroAgain = () => {
    const { setInstructionsShown } = this.props;
    setInstructionsShown({
      variables: {
        isInstructionsShown: false
      }
    });
  };

  signIn = async () => {
    const rsa = new RSAKey();
    rsa.setPublicString(Config.PUBLIC_KEY); // return json encoded string
    const uniqueID = await sha256(DeviceInfo.getUniqueID());
    const deviceHashEncrypted = rsa.encrypt(uniqueID);

    await this.props
      .signUp({
        variables: {
          deviceHashEncrypted
        }
      })
      .then(({ data: { signUp: { token } } }) => {
        AsyncStorage.setItem("authorization", token);
      });
  };

  renderSegmentControls = () => {
    if (Platform.OS === "ios") {
      return (
        <SegmentControlsWrapper>
          <SegmentedControlIOS
            style={{
              alignSelf: "flex-end",
              width: "100%"
            }}
            values={this.lists.map(
              ({ title, smallTitle }) => (this.width > 320 ? title : smallTitle)
            )}
            selectedIndex={this.state.selectedIndex}
            tintColor="#ffffff"
            onChange={event => {
              this.setState({
                selectedIndex: event.nativeEvent.selectedSegmentIndex
              });
              this.scrollView.scrollTo({
                y: 0,
                x: event.nativeEvent.selectedSegmentIndex * this.width
              });
            }}
          />
        </SegmentControlsWrapper>
      );
    }
    return null;
  };

  renderList = () => {
    if (Platform.OS === "ios") {
      return (
        <ScrollView
          onContentSizeChange={contentWidth => {
            this.width = contentWidth / this.lists.length;
            this.scrollView.scrollTo({
              y: 0,
              x: this.state.selectedIndex * this.width
            });
          }}
          onMomentumScrollEnd={this.onScrollEndDrag}
          innerRef={e => {
            this.scrollView = e;
          }}
        >
          {this.lists.map(list => (
            <List
              key={list.key}
              listType={list.key}
              navigator={this.props.navigator}
            />
          ))}
        </ScrollView>
      );
    }
    return null;
  };

  render() {
    return (
      <Screen>
        {this.renderSegmentControls()}
        {this.renderList()}
      </Screen>
    );
  }
}

VoteList.propTypes = {
  setInstructionsShown: PropTypes.func.isRequired,
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  meLoading: PropTypes.bool.isRequired,
  signUp: PropTypes.func.isRequired,
  me: PropTypes.oneOfType([propType(ME), PropTypes.bool])
};

VoteList.defaultProps = {
  me: false
};

export default compose(
  graphql(SET_INSTRUCTIONS_SHOWN, {
    name: "setInstructionsShown"
  }),
  graphql(SIGN_UP, {
    name: "signUp"
  }),
  graphql(ME, {
    props: ({ data: { me, loading } }) => ({ me, meLoading: loading }),
    options: { fetchPolicy: "network-only" }
  })
)(VoteList);
