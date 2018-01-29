import React, { Component } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Navigator } from "react-native-navigation";
import { TouchableHighlight } from "react-native";

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

  onItemClick = ({ item }) => () => {
    const { navigator } = this.props;
    navigator.push({
      screen: "democracy.Detail",
      title: "Abstimmung".toUpperCase(),
      passProps: { ...item }
    });
  };

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
            <TouchableHighlight
              onPress={this.onItemClick({ item })}
              underlayColor="rgba(68, 148, 211, 0.1)"
            >
              <ListRow>
                <VoteListItem {...item} />
              </ListRow>
            </TouchableHighlight>
          )}
        />
      </Wrapper>
    );
  }
}

List.propTypes = {
  listType: PropTypes.string,
  navigator: PropTypes.instanceOf(Navigator).isRequired
};

List.defaultProps = {
  listType: "POLLS"
};

export default List;
