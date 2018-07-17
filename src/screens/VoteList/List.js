/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component } from "react";
import {
  Dimensions,
  Platform,
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  Picker
} from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Navigator } from "react-native-navigation";
import { graphql, compose } from "react-apollo";
import { unionBy } from "lodash";
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

const PickerWrapper = styled.View``;

const PickerHeader = styled.View`
  background-color: #f9f9f9;
  align-items: flex-end;
`;

const PickerFinishButton = styled.Button``;

const SectionList = styled.SectionList``;

const PAGE_SIZE = 20;
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
  }

  state = {
    width: Platform.OS === "ios" ? Dimensions.get("window").width : "auto",
    fetchedAll: false,
    filters: false,
    sort: "time",
    sorterOpened: false
  };

  componentDidMount() {
    this.setRightButtons({ filterActive: false });

    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      if (data) {
        const jsonObj = JSON.parse(data);
        this.prepareFilter(jsonObj);
      }
    });
  }

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
    const filters = Object.keys(filterObj).reduce((prev, key) => {
      if (key === "notifications") {
        if (filterObj.notifications.value) {
          return { ...prev, notifications: filterObj.notifications.value };
        }
        return { ...prev };
      }
      if (!filterObj[key].every(({ value }) => value)) {
        return { ...prev, [key]: filterObj[key].filter(({ value }) => value) };
      }
      return prev;
    }, {});
    this.setState({ filters });
  };

  filterProcedures = ({
    type,
    subjectGroups,
    voted,
    viewedStatus,
    currentStatus
  }) => {
    const { filters } = this.state;
    if (!filters || filters.length === 0) {
      return true;
    }
    let doFilter = true;
    Object.keys(filters).forEach(key => {
      switch (key) {
        case "notifications":
          if (filters[key] && viewedStatus !== "PUSH") {
            doFilter = false;
          }
          break;
        case "activity":
          if (filters[key][0].name === "voted" && !voted) {
            doFilter = false;
          } else if (filters[key][0].name === "notVoted" && voted) {
            doFilter = false;
          }
          break;
        case "type":
          if (filters[key][0].title !== type) {
            doFilter = false;
          }
          break;
        case "subjectGroups": {
          const showSubjectGroups = filters[key].map(({ title }) => title);
          doFilter = subjectGroups.some(
            subjectGroup =>
              showSubjectGroups.findIndex(
                subject => subject === subjectGroup
              ) !== -1
          );
          break;
        }
        case "currentStatus": {
          const states = filters[key].map(({ title }) => title);
          doFilter = states.findIndex(state => state === currentStatus) !== -1;
          break;
        }

        default:
          break;
      }
    });

    return doFilter;
  };

  prepareData = () => {
    const { listType, data: { procedures } } = this.props;
    const { sort } = this.state;

    if (!procedures || procedures.length === 0) {
      return [];
    }
    const preparedData = [
      {
        data: [{ type: "sort" }]
      }
    ];
    if (listType === "VOTING" && sort === "time") {
      preparedData.push({
        title: "Vergangen",
        data: []
      });
    }
    const proceduresSorted = [...procedures];
    if (sort === "activityIndex") {
      proceduresSorted.sort(
        (a, b) => b.activityIndex.activityIndex - a.activityIndex.activityIndex
      );
    }
    proceduresSorted.forEach(procedure => {
      if (!this.filterProcedures(procedure)) {
        return;
      }
      if (
        listType === "VOTING" &&
        sort === "time" &&
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

  renderItem = onClick => ({ item }) => {
    if (item.type === "sort") {
      if (Platform.OS === "ios") {
        return (
          <TouchableOpacity
            onPress={() => this.setState({ sorterOpened: true })}
          >
            <ListSectionHeader title="Nach Restzeit sortieren" />
          </TouchableOpacity>
        );
      }
      return (
        <Picker
          selectedValue={this.state.sort}
          style={{ paddingLeft: 18, height: 35, backgroundColor: "#e6edf2" }}
          onValueChange={itemValue => this.setState({ sort: itemValue })}
        >
          <Picker.Item label="nach Restzeit sortieren" value="time" />
          <Picker.Item
            label="nach Aktivitätsindex sortieren"
            value="activityIndex"
          />
        </Picker>
      );
    }
    return <ListItem item={item} onClick={onClick} />;
  };

  render() {
    const { data } = this.props;
    const { fetchedAll, sorterOpened, sort } = this.state;

    return (
      <Wrapper onLayout={this.onLayout} width={this.state.width}>
        <SectionList
          contentOffset={{ y: 35 }}
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
          renderSectionHeader={({ section }) => {
            if (section.data.length > 0) {
              return <ListSectionHeader title={section.title} />;
            }
            return null;
          }}
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
        {Platform.OS === "ios" &&
          sorterOpened && (
            <PickerWrapper>
              <PickerHeader>
                <PickerFinishButton
                  title="Fertig"
                  onPress={() => this.setState({ sorterOpened: false })}
                />
              </PickerHeader>
              <Picker
                selectedValue={sort}
                style={{ height: 200 }}
                onValueChange={itemValue => this.setState({ sort: itemValue })}
              >
                <Picker.Item label="nach Restzeit sortieren" value="time" />
                <Picker.Item
                  label="nach Aktivitätsindex sortieren"
                  value="activityIndex"
                />
              </Picker>
            </PickerWrapper>
          )}
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
