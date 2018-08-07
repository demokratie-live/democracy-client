import React, { Component } from "react";
import { Platform, SegmentedControlIOS, Dimensions } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Navigation } from "react-native-navigation";

import List from "./List";
import Header from "./Header";

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
  constructor(props) {
    super(props);

    Navigation.mergeOptions(props.componentId, {
      topBar: {
        title: {
          text: "Bundestag".toUpperCase()
        }
      }
    });

    Navigation.events().bindComponent(this);
  }

  state = {
    selectedIndex: 0
  };

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

  navigationButtonPressed = ({ componentId, buttonId }) => {
    switch (buttonId) {
      case "filterButton":
        Navigation.showModal({
          stack: {
            children: [
              {
                component: {
                  name: "democracy.VoteList.Filter",
                  options: {
                    topBar: {
                      title: {
                        text: "Filter"
                      }
                    }
                  }
                }
              }
            ]
          }
        });
        break;
      case "searchButton":
        Navigation.push(componentId, {
          component: {
            name: "democracy.Search"
          }
        });
        break;

      default:
        break;
    }
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
            <List key={list.key} listType={list.key} {...this.props} />
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
  componentId: PropTypes.string.isRequired
};

VoteList.defaultProps = {};

export default VoteList;
