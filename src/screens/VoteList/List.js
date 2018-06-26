/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component } from "react";
import {
  Dimensions,
  Platform,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Navigator } from "react-native-navigation";
import { graphql, compose } from "react-apollo";
import _, { unionBy } from "lodash";
import Ionicons from "react-native-vector-icons/Ionicons";

import preventNavStackDuplicate from "../../hocs/preventNavStackDuplicate";

import ListSectionHeader from "../../components/ListSectionHeader";
import ListItem from "./ListItem";

import getProcedures from "../../graphql/queries/getProcedures";
import GET_FILTERS from "../../graphql/queries/local/filters";

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
let onNavigatorEventAdded = false;
const STORAGE_KEY = "VoteList.Filters";

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

    this.setRightButtons({ filterActive: false });

    if (!onNavigatorEventAdded) {
      this.props.navigator.addOnNavigatorEvent(this.onNavigatorEvent);
    }
    onNavigatorEventAdded = true;

    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      if (data) {
        const jsonObj = JSON.parse(data);
        this.prepareFilter(jsonObj);
      }
    });
  }

  state = {
    width: Platform.OS === "ios" ? Dimensions.get("window").width : "auto",
    fetchedAll: false,
    filters: false
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

    if (nextProps.filters !== this.props.filters) {
      this.prepareFilter(JSON.parse(nextProps.filters));
    }
  }

  onNavigatorEvent = event => {
    if (event.type) {
      // NavBar Events
      switch (event.id) {
        case "filter":
          this.props.navigator.showModal({
            screen: "democracy.VoteList.Filter"
          });
          break;

        default:
          break;
      }
    }
  };

  onChangeFilter = filters => {
    this.prepareFilter(filters);
  };

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

  setRightButtons = ({ filterActive }) => {
    const searchIcon = Platform.OS === "ios" ? "ios-search" : "md-search";
    const filterIcon = filterActive ? "ios-funnel" : "ios-funnel-outline";
    Ionicons.getImageSource(searchIcon, 24, "#FFFFFF").then(iconSearch => {
      Ionicons.getImageSource(filterIcon, 24, "#FFFFFF").then(iconFilter => {
        this.props.navigator.setButtons({
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
  };

  prepareFilter = filterObj => {
    const filters = Object.keys(filterObj).reduce(
      (prev, key) => ({
        ...prev,
        [key]: Object.keys(filterObj[key]).reduce((prevSub, keySub) => {
          if (filterObj[key][keySub]) {
            return { ...prevSub, [keySub]: filterObj[key][keySub] };
          }
          return prevSub;
        }, {})
      }),
      {}
    );
    if (
      !filters ||
      (filters.type.all && filters.subjectGroups.all && filters.userStatus.all)
    ) {
      this.setRightButtons({ filterActive: false });
    } else {
      this.setRightButtons({ filterActive: true });
    }
    this.setState({ filters });
  };

  filterProcedures = ({ type, subjectGroups, voted, viewedStatus }) => {
    const { filters } = this.state;
    if (
      !filters ||
      (filters.type.all && filters.subjectGroups.all && filters.userStatus.all)
    ) {
      return true;
    }
    let doFilter = true;
    if (!filters.type.all) {
      if (!_.has(filters.type, type)) {
        doFilter = false;
      }
    }
    if (!filters.subjectGroups.all) {
      if (
        !Object.keys(filters.subjectGroups).some(g =>
          subjectGroups.some(sg => g === sg)
        )
      ) {
        doFilter = false;
      }
    }
    if (!filters.userStatus.all) {
      if (filters.userStatus["Nicht Abgestimmt"] && voted) {
        doFilter = false;
      }
      if (filters.userStatus.Push && viewedStatus !== "PUSH") {
        doFilter = false;
      }
    }
    return doFilter;
  };

  prepareData = () => {
    const { listType, data: { procedures } } = this.props;
    const { filters } = this.state;
    console.log(filters);
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
      if (!this.filterProcedures(procedure)) {
        return;
      }
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
    console.log(this.props.listType);
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
  data: PropTypes.shape().isRequired,
  filters: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired
};

List.defaultProps = {
  listType: "VOTING"
};

export default compose(
  graphql(getProcedures, {
    options: ({ listType }) => ({
      notifyOnNetworkStatusChange: true,
      variables: { type: listType, pageSize: PAGE_SIZE, offset: 0 },
      fetchPolicy: "cache-and-network"
    })
  }),
  graphql(GET_FILTERS, {
    props: ({ data: { filters } }) => ({
      filters: filters && filters.filters ? filters.filters : false
    })
  })
)(preventNavStackDuplicate(List));
