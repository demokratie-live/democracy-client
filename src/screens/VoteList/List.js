/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { propType as gqlPropType } from "graphql-anywhere";
import { Navigator } from "react-native-navigation";
import { TouchableHighlight } from "react-native";
import { graphql } from "react-apollo";
import { unionBy } from "lodash";

import ListRow from "../../components/ListRow";
import VoteListItem from "../../components/VoteListItem";
import ListSectionHeader from "../../components/ListSectionHeader";

import getProcedures from "../../graphql/queries/getProcedures";

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
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
  }

  onItemClick = ({ item }) => () => {
    const { navigator } = this.props;
    navigator.push({
      screen: "democracy.Detail",
      title: "Abstimmung".toUpperCase(),
      passProps: { ...item }
    });
  };

  // Data
  sections = [
    {
      data: []
    }
    // {
    //   title: "Vergangen",
    //   data: []
    // }
  ];

  prepareData = () => {
    const { listType, data: { procedures } } = this.props;
    // const { listType, data: { procedures } } = this.props;
    if (!procedures) {
      return [];
    }
    const preparedData = [
      {
        data: []
      }
      // {
      //   title: "Vergangen",
      //   data: []
      // }
    ];
    if (listType === "VOTING") {
      preparedData.push({
        title: "Vergangen",
        data: []
      });
    }
    console.log(preparedData);
    procedures.forEach(procedure => {
      console.log("procedure", new Date(procedure.voteDate), new Date());

      if (listType === "VOTING" && new Date(procedure.voteDate) < new Date()) {
        preparedData[1].data.push({
          ...procedure,
          tags: procedure.tags,

          activityIndex: 0,
          active: false,
          date: procedure.voteDate
        });
      } else {
        preparedData[0].data.push({
          ...procedure,
          tags: procedure.tags,
          activityIndex: 0,
          active: false,
          date: procedure.voteDate || false
        });
      }
    });
    // console.log("data", preparedData);
    // console.log("oldData", dummyDataVoteLists[listType]);
    return preparedData;
  };

  render() {
    const { data, listType } = this.props;
    // const { listType, data } = this.props;
    // const data = dummyDataVoteLists[listType];
    console.log("listType", listType);
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
            console.log("onEndReached");
            data.fetchMore({
              variables: {
                offset: data.procedures ? data.procedures.length : PAGE_SIZE
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                // Don't do anything if there weren't any new items
                if (
                  !fetchMoreResult ||
                  fetchMoreResult.procedures.length === 0
                ) {
                  return previousResult;
                }
                return {
                  // Append the new feed results to the old one
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
  navigator: PropTypes.instanceOf(Navigator).isRequired
  // data: gqlPropType(getProcedures).isRequired
};

List.defaultProps = {
  listType: "VOTING"
};

export default graphql(getProcedures, {
  options: ({ listType }) => {
    console.log(listType);
    return {
      notifyOnNetworkStatusChange: true,
      variables: { type: listType, pageSize: PAGE_SIZE, offset: 0 }
    };
  }
})(List);
