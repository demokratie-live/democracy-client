import React, { Component } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

import ListRow from "../../components/ListRow";
import VoteListItem from "../../components/VoteListItem";
import ListSectionHeader from "../../components/ListSectionHeader";

import dummyDataVoteLists from "../../../dummy/voteLists";

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

const SectionList = styled.SectionList``;

class List extends Component {
  render() {
    const { listType } = this.props;
    const data = dummyDataVoteLists[listType];
    console.log(data);
    return (
      <Wrapper>
        <SectionList
          sections={data}
          stickySectionHeadersEnabled
          keyExtractor={({ title }) => title}
          onRefresh={() => console.log("refresh")}
          refreshing={false}
          renderSectionHeader={({ section }) => (
            <ListSectionHeader title={section.title} />
          )}
          renderItem={({ item }) => (
            <ListRow>
              <VoteListItem {...item} />
            </ListRow>
          )}
        />
      </Wrapper>
    );
  }
}

export default List;
