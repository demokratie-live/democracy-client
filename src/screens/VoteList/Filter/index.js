import React, { Component } from "react";
import styled from "styled-components/native";
import { Navigation } from "react-native-navigation";

import Header from "./Header";
import SegmentHeader from "../../../components/ListSectionHeader";
import Checkbox from "../../../components/Checkbox";

Navigation.registerComponent("democracy.VoteList.Filter.Header", () => Header);

const FilterData = [
  {
    title: "Vorgangstyp",
    data: [
      {
        title: "Alle Vorgangstypen",
        type: "switch",
        name: "type",
        data: [
          {
            title: "Antrag"
          },
          {
            title: "Gesetzgebung"
          }
        ]
      }
    ]
  },
  {
    title: "Status",
    name: "userStatus",
    data: [
      {
        title: "Alle",
        type: "radio",
        data: [
          {
            title: "Push",
            type: "radio"
          },
          {
            title: "Nicht Abgestimmt",
            type: "radio"
          }
        ]
      }
    ]
  },
  {
    title: "Sachgebite",
    data: [
      {
        title: "Alle Sachgebite",
        type: "switch",
        name: "subjectGroups",
        data: [
          {
            title: "Arbeit und Beschäftigung",
            type: "checkbox"
          },
          {
            title: "Ausländerpolitik, Zuwanderung",
            type: "checkbox"
          },
          {
            title: "Außenpolitik und internationale Beziehungen",
            type: "checkbox"
          },
          {
            title: "Medien, Kommunikation und Informationstechnologie",
            type: "checkbox"
          }
        ]
      }
    ]
  }
];

const Wrapper = styled.SectionList`
  flex: 1;
`;

const ListRowMain = styled.View`
  padding-horizontal: 18;
  padding-vertical: 11;
  justify-content: center;
`;

const ListRowSub = styled.TouchableOpacity`
  padding-left: 8;
  padding-vertical: 11;
  justify-content: center;
  border-top-width: 1;
  border-top-color: rgba(0, 0, 0, 0.1);
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TitleMain = styled.Text`
  font-size: 17;
`;

const TitleSub = styled.Text`
  flex: 0.98;
  font-size: 15;
`;

const Switch = styled.Switch`
  margin-bottom: 3;
`;

class Filter extends Component {
  constructor(props) {
    super(props);
    props.navigator.setStyle({
      navBarCustomView: "democracy.VoteList.Filter.Header",
      navBarComponentAlignment: "fill",
      navBarNoBorder: true,
      navBarCustomViewInitialProps: {
        navigator: this.props.navigator,
        onChangeTerm: this.onChangeTerm
      }
    });
  }

  state = {
    data: {}
  };

  render() {
    return (
      <Wrapper
        sections={FilterData}
        renderSectionHeader={({ section: { title } }) => (
          <SegmentHeader title={title} />
        )}
        renderItem={({ item: { title, data }, section }) => (
          <ListRowMain>
            <Row>
              <TitleMain>{title}</TitleMain>
              <Switch
                onValueChange={value =>
                  this.setState({ [`${section.title}|${title}`]: value })
                }
                value={this.state[`${section.title}|${title}`]}
              />
            </Row>
            {data &&
              !this.state[`${section.title}|${title}`] &&
              data.map(({ title: subtitle }) => (
                <ListRowSub
                  key={subtitle}
                  onPress={() => {
                    this.setState({
                      [`${section.title}|${title}|${subtitle}`]: !this.state[
                        `${section.title}|${title}|${subtitle}`
                      ]
                    });
                  }}
                >
                  <Row>
                    <TitleSub>{subtitle}</TitleSub>
                    <Checkbox
                      value={
                        this.state[`${section.title}|${title}|${subtitle}`]
                      }
                    />
                  </Row>
                </ListRowSub>
              ))}
          </ListRowMain>
        )}
        keyExtractor={({ title }) => title}
      />
    );
  }
}

export default Filter;
