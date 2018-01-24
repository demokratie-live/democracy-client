import React, { Component } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

import ListRow from "../../components/ListRow";
import VoteListItem from "../../components/VoteListItem";
import ListSectionHeader from "../../components/ListSectionHeader";

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

const SectionList = styled.SectionList``;

const data = [
  {
    data: [
      {
        title:
          "Effektivere und praxistauglichere Ausgeschaltung des Strafverfahrens?",
        tags: "Staatstrojaner, Überwaschung, Online-durchsuchung, Sicherheit",
        date: "00:33",
        active: true
      },
      {
        title: "Eheschließung für Personen gleichen Geschlechts?",
        tags: "Homoehe, Gleichberechtigung, Gleichstellung, Menschenrechte",
        active: false
      },
      {
        title: "Bundeswehreinsatz United Nations Interim Force in Lebanon",
        tags: "Deutsche Kriegsbeteiligung, Bundeswehr, Außenpolitik",
        date: "2 Tage",
        active: true
      }
    ]
  },
  {
    title: "Vergangen",
    data: [
      {
        title: "Änderung von Art. 21 des GG (Parteifinanzierung)?",
        tags: "Parteien, Parteifinanzierung, Parteispenden",
        date: "22.09.17",
        active: false
      },
      {
        title: "2 Änderung von Art. 21 des GG (Parteifinanzierung)?",
        tags: "Parteien, Parteifinanzierung, Parteispenden",
        date: "22.09.17",
        active: false
      },
      {
        title: "3 Änderung von Art. 21 des GG (Parteifinanzierung)?",
        tags: "Parteien, Parteifinanzierung, Parteispenden",
        date: "22.09.17",
        active: false
      },
      {
        title: "4 Änderung von Art. 21 des GG (Parteifinanzierung)?",
        tags: "Parteien, Parteifinanzierung, Parteispenden",
        date: "22.09.17",
        active: false
      },
      {
        title: "5 Änderung von Art. 21 des GG (Parteifinanzierung)?",
        tags: "Parteien, Parteifinanzierung, Parteispenden",
        date: "22.09.17",
        active: false
      },
      {
        title: "6 Änderung von Art. 21 des GG (Parteifinanzierung)?",
        tags: "Parteien, Parteifinanzierung, Parteispenden",
        date: "22.09.17",
        active: false
      }
    ]
  }
];

class List extends Component {
  render() {
    const { listType } = this.props;
    return (
      <Wrapper>
        <SectionList
          sections={data}
          stickySectionHeadersEnabled
          keyExtractor={({ title }) => title}
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
