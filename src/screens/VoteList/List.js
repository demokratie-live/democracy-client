import React, { Component } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

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
  render() {
    const { listType } = this.props;
    const data = dummyDataVoteLists[listType];
    return (
      <Wrapper>
        <SectionList
          sections={data}
          stickySectionHeadersEnabled
          keyExtractor={({ title }) => title}
          onRefresh={() => undefined}
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

List.propTypes = {
  listType: PropTypes.string
};

List.defaultProps = {
  listType: "POLLS"
};

export default List;
