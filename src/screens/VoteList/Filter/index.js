import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import styled from "styled-components/native";
import { Navigation } from "react-native-navigation";
import { graphql } from "react-apollo";

import Header from "./Header";
import SegmentHeader from "../../../components/ListSectionHeader";
import Checkbox from "../../../components/Checkbox";

import SET_FILTERS from "../../../graphql/mutations/local/setFilters";
import GET_FILTERS from "../../../graphql/queries/local/filters";

Navigation.registerComponent("democracy.VoteList.Filter.Header", () => Header);

const FilterData = [
  {
    title: "Vorgangstyp",
    name: "type",
    data: [
      {
        title: "Alle Vorgangstypen",
        type: "switch",
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
    name: "subjectGroups",
    data: [
      {
        title: "Alle Sachgebite",
        type: "switch",
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

const STORAGE_KEY = "VoteList.Filters";

class Filter extends Component {
  constructor(props) {
    super(props);
    console.log("onChangeFilter", props);
    props.navigator.setStyle({
      navBarCustomView: "democracy.VoteList.Filter.Header",
      navBarComponentAlignment: "fill",
      navBarNoBorder: true,
      navBarCustomViewInitialProps: {
        navigator: this.props.navigator,
        onSave: this.onSave
      }
    });

    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      if (data) {
        const jsonObj = JSON.parse(data);
        console.log("ASYMC", jsonObj);
        this.setState({ data: jsonObj });
      }
    });
  }

  state = {
    data: {
      type: {
        all: true
      },
      userStatus: {
        all: true
      },
      subjectGroups: {
        all: true
      }
    }
  };

  onSave = async () => {
    const jsonString = JSON.stringify(this.state.data);
    await AsyncStorage.setItem(STORAGE_KEY, jsonString);
    // this.props.onChangeFilter(this.state.data);
    console.log(jsonString);
    this.props.setFilters({
      variables: { filters: jsonString },
      refetchQueries: [{ query: GET_FILTERS }]
    });
  };

  onChange = ({ type, subType, value }) => {
    const { data } = this.state;
    if (subType) {
      this.setState({
        data: { ...data, [type]: { ...data[type], [subType]: value } }
      });
    } else {
      this.setState({
        data: { ...data, [type]: { ...data[type], all: value } }
      });
    }
  };

  getValue = ({ type, subType }) => {
    if (subType) {
      return this.state.data[type][subType];
    }
    return this.state.data[type].all;
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
                  this.onChange({
                    type: section.name,
                    value: !this.getValue({ type: section.name })
                  })
                }
                value={this.getValue({ type: section.name })}
              />
            </Row>
            {data &&
              !this.getValue({ type: section.name }) &&
              data.map(({ title: subtitle }) => (
                <ListRowSub
                  key={subtitle}
                  onPress={() => {
                    this.onChange({
                      type: section.name,
                      subType: subtitle,
                      value: !this.getValue({
                        type: section.name,
                        subType: subtitle
                      })
                    });
                  }}
                >
                  <Row>
                    <TitleSub>{subtitle}</TitleSub>
                    <Checkbox
                      value={this.getValue({
                        type: section.name,
                        subType: subtitle
                      })}
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

export default graphql(SET_FILTERS, { name: "setFilters" })(Filter);
