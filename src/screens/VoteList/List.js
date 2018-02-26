/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Navigator } from "react-native-navigation";
import { TouchableHighlight, Dimensions } from "react-native";
import { graphql } from "react-apollo";
import { unionBy } from "lodash";

import ListRow from "../../components/ListRow";
import VoteListItem from "../../components/VoteListItem";
import ListSectionHeader from "../../components/ListSectionHeader";

import getProcedures from "../../graphql/queries/getProcedures";

import onNavigationEvent from "../onNavigationEvent";

const { width: DEVICE_WIDTH } = Dimensions.get("window");

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  width: ${DEVICE_WIDTH};
`;

const SectionList = styled.SectionList``;

const PAGE_SIZE = 20;

class List extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setStyle({
      navBarCustomView: "democracy.VoteList.Header",
      navBarComponentAlignment: "fill",
      navBarCustomViewInitialProps: {
        title: "Bundestag",
        navigator: this.props.navigator
      }
    });
    this.props.navigator.setOnNavigatorEvent(onNavigationEvent.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listType !== this.props.listType) {
      nextProps.data.procedures = false; // eslint-disable-line
    }
  }

  onItemClick = ({ item }) => () => {
    const { navigator } = this.props;
    navigator.push({
      screen: "democracy.Detail",
      title: "Abstimmung".toUpperCase(),
      passProps: { ...item }
    });
  };

  sections = [
    {
      data: []
    }
  ];

  prepareData = () => {
    const { listType, data: { procedures } } = this.props;
    if (!procedures) {
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
        procedure.voteDate &&
        new Date(procedure.voteDate) < new Date()
      ) {
        preparedData[1].data.push({
          ...procedure,
          tags: procedure.tags,
          procedureId: procedure.procedureId,
          activityIndex: 0,
          active: false,
          date: procedure.voteDate,
          listType
        });
      } else {
        preparedData[0].data.push({
          ...procedure,
          tags: procedure.tags,
          procedureId: procedure.procedureId,
          activityIndex: 0,
          active: false,
          date: procedure.voteDate || false,
          listType
        });
      }
    });
    return preparedData;
  };

  render() {
    const { data } = this.props;
    return (
      <Wrapper>
        <SectionList
          sections={this.prepareData()}
          stickySectionHeadersEnabled
          keyExtractor={({ _id }) => _id}
          onRefresh={() => data.refetch()}
          refreshing={data.networkStatus === 4}
          renderSectionHeader={({ section }) => (
            <ListSectionHeader title={section.title} />
          )}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={this.onItemClick({ item })}
              underlayColor="rgba(68, 148, 211, 0.1)"
            >
              <ListRow>
                <VoteListItem {...item} />
              </ListRow>
            </TouchableHighlight>
          )}
          onEndReached={() => {
            data.fetchMore({
              variables: {
                offset: data.procedures ? data.procedures.length : PAGE_SIZE
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (
                  !fetchMoreResult ||
                  fetchMoreResult.procedures.length === 0
                ) {
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
          }}
        />
      </Wrapper>
    );
  }
}

List.propTypes = {
  listType: PropTypes.string,
  navigator: PropTypes.instanceOf(Navigator).isRequired,
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
})(List);
