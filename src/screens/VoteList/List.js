/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component } from "react";
import { Dimensions, Platform, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Navigator } from "react-native-navigation";
import { graphql } from "react-apollo";
import { unionBy } from "lodash";
import Ionicons from "react-native-vector-icons/Ionicons";

import preventNavStackDuplicate from "../../hocs/preventNavStackDuplicate";

import ListSectionHeader from "../../components/ListSectionHeader";
import ListItem from "./ListItem";

import getProcedures from "../../graphql/queries/getProcedures";

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  width: ${({ width }) => width};
`;

const Loading = styled.View`
  height: 50;
  align-items: center;
  justify-content: center;
`;

const SectionList = styled.SectionList``;

const PAGE_SIZE = 20;

class List extends Component {
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

    const searchIcon = Platform.OS === "ios" ? "ios-search" : "md-search";
    const filterIcon = "ios-funnel-outline";
    Ionicons.getImageSource(searchIcon, 24, "#FFFFFF").then(iconSearch => {
      Ionicons.getImageSource(filterIcon, 24, "#FFFFFF").then(iconFilter => {
        console.log("iconFilter");
        props.navigator.setButtons({
          rightButtons: [
            {
              icon: iconSearch,
              id: "search"
            },
            {
              icon: iconFilter,
              id: "filter"
            }
          ]
        });
      });
    });
  }

  state = {
    width: Platform.OS === "ios" ? Dimensions.get("window").width : "auto",
    fetchedAll: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.listType !== this.props.listType) {
      nextProps.data.procedures = false; // eslint-disable-line
    }

    if (
      nextProps.data.procedures &&
      nextProps.data.procedures.length < PAGE_SIZE &&
      !this.state.fetchedAll
    ) {
      this.setState({ fetchedAll: true });
    }
  }

  onLayout = () => {
    if (Platform.OS === "ios") {
      const { width } = Dimensions.get("window");
      if (width !== this.state.width) {
        this.setState({ width });
      }
    }
  };

  onItemClick = ({ item }) => () => {
    this.props.navigateTo({
      screen: "democracy.Detail",
      title: "Abstimmung".toUpperCase(),
      passProps: { ...item },
      backButtonTitle: ""
    });
  };

  prepareData = () => {
    const { listType, data: { procedures } } = this.props;
    if (!procedures || procedures.length === 0) {
      return [];
    }
    const preparedData = [
      {
        data: []
      }
    ];
    if (listType === "VOTING") {
      preparedData.push({
        title: "Vergangen",
        data: []
      });
    }
    procedures.forEach(procedure => {
      if (
        listType === "VOTING" &&
        ((new Date(procedure.voteDate) < new Date() &&
          procedure.voteDate !== null) ||
          procedure.completed)
      ) {
        preparedData[1].data.push({
          ...procedure,
          date: procedure.voteDate || false,
          listType
        });
      } else {
        preparedData[0].data.push({
          ...procedure,
          date: procedure.voteDate || false,
          listType
        });
      }
    });
    return preparedData;
  };

  renderItem = onClick => ({ item }) => (
    <ListItem item={item} onClick={onClick} />
  );

  render() {
    const { data } = this.props;
    const { fetchedAll } = this.state;
    return (
      <Wrapper onLayout={this.onLayout} width={this.state.width}>
        <SectionList
          ListFooterComponent={() =>
            data.loading || !fetchedAll ? (
              <Loading>
                <ActivityIndicator />
              </Loading>
            ) : null
          }
          sections={this.prepareData()}
          stickySectionHeadersEnabled
          keyExtractor={({ _id }) => _id}
          onRefresh={() => {
            this.setState({ fetchedAll: false });
            data.refetch();
          }}
          refreshing={data.networkStatus === 4}
          renderItem={this.renderItem(this.onItemClick)}
          renderSectionHeader={({ section }) => (
            <ListSectionHeader title={section.title} />
          )}
          onEndReached={() => {
            if (!data.loading && !fetchedAll) {
              data.fetchMore({
                variables: {
                  offset: data.procedures ? data.procedures.length : PAGE_SIZE
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  if (
                    !fetchMoreResult ||
                    fetchMoreResult.procedures.length === 0
                  ) {
                    this.setState({ fetchedAll: true });
                    return previousResult;
                  }
                  return {
                    procedures: unionBy(
                      previousResult.procedures,
                      fetchMoreResult.procedures,
                      "_id"
                    )
                  };
                }
              });
            }
          }}
        />
      </Wrapper>
    );
  }
}

List.propTypes = {
  listType: PropTypes.string,
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  navigateTo: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired
};

List.defaultProps = {
  listType: "VOTING"
};

export default graphql(getProcedures, {
  options: ({ listType }) => ({
    notifyOnNetworkStatusChange: true,
    variables: { type: listType, pageSize: PAGE_SIZE, offset: 0 },
    fetchPolicy: "cache-and-network"
  })
})(preventNavStackDuplicate(List));
