import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Navigation, Navigator } from 'react-native-navigation';
import { graphql } from 'react-apollo';

import Header from './Header';
import SegmentHeader from '../../../components/ListSectionHeader';
import Checkbox from '../../../components/Checkbox';

import SET_FILTERS from '../../../graphql/mutations/local/setFilters';
import GET_FILTERS from '../../../graphql/queries/local/filters';

Navigation.registerComponent('democracy.VoteList.Filter.Header', () => Header);

const FilterData = [
  // {
  //   name: "notifications",
  //   data: [
  //     {
  //       title: "Benachrichtigungen",
  //       name: "notifications",

  //       value: false
  //     }
  //   ]
  // },
  {
    title: 'Aktivität',
    name: 'activity',
    data: [
      {
        title: 'Eigene Aktivitäten',
        value: true,
        data: [
          // {
          //   title: "Ungelesen",
          //   name: "unreaded",
          //   value: true
          // },
          {
            title: 'Nicht Abgestimmt',
            name: 'notVoted',
            value: true,
          },
          {
            title: 'Abgestimmt',
            name: 'voted',
            value: true,
          },
        ],
      },
    ],
  },
  {
    title: 'Vorgangstyp',
    name: 'type',
    data: [
      {
        title: 'Alle Vorgangstypen',
        value: true,
        data: [
          {
            title: 'Antrag',
            value: true,
          },
          {
            title: 'Gesetzgebung',
            value: true,
          },
        ],
      },
    ],
  },
  // {
  //   title: "Abstimmungstyp",
  //   name: "voteType",
  //   data: [
  //     {
  //       title: "Alle Abstimmungen",
  //       value: true,
  //       data: [
  //         {
  //           title: "Namentliche Abstimmung",
  //           value: true
  //         },
  //         {
  //           title: "Nicht-namentliche Abstimmungen",
  //           value: true
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    title: 'Sachgebiete',
    name: 'subjectGroups',
    data: [
      {
        title: 'Alle Sachgebiete',
        value: true,
        data: [
          {
            title: 'Arbeit und Beschäftigung',
            value: true,
          },
          {
            title: 'Ausländerpolitik, Zuwanderung',
            value: true,
          },
          {
            title: 'Außenpolitik und internationale Beziehungen',
            value: true,
          },
          {
            title: 'Außenwirtschaft',
            value: true,
          },
          {
            title: 'Bildung und Erziehung',
            value: true,
          },
          {
            title: 'Bundestag',
            value: true,
          },
          {
            title: 'Energie',
            value: true,
          },
          {
            title: 'Entwicklungspolitik',
            value: true,
          },
          {
            title: 'Europapolitik und Europäische Union',
            value: true,
          },
          {
            title: 'Gesellschaftspolitik, soziale Gruppen',
            value: true,
          },
          {
            title: 'Gesundheit',
            value: true,
          },
          {
            title: 'Innere Sicherheit',
            value: true,
          },
          {
            title: 'Kultur',
            value: true,
          },
          {
            title: 'Landwirtschaft und Ernährung',
            value: true,
          },
          {
            title: 'Medien, Kommunikation und Informationstechnik',
            value: true,
          },
          {
            title: 'Neue Bundesländer',
            value: true,
          },
          {
            title: 'Öffentliche Finanzen, Steuern und Abgaben',
            value: true,
          },
          {
            title: 'Politisches Leben, Parteien',
            value: true,
          },
          {
            title: 'Raumordnung, Bau- und Wohnungswesen',
            value: true,
          },
          {
            title: 'Recht',
            value: true,
          },
          {
            title: 'Soziale Sicherung',
            value: true,
          },
          {
            title: 'Sport, Freizeit und Tourismus',
            value: true,
          },
          {
            title: 'Staat und Verwaltung',
            value: true,
          },
          {
            title: 'Umwelt',
            value: true,
          },
          {
            title: 'Verkehr',
            value: true,
          },
          {
            title: 'Verteidigung',
            value: true,
          },
          {
            title: 'Wirtschaft',
            value: true,
          },
          {
            title: 'Wissenschaft, Forschung und Technologie',
            value: true,
          },
        ],
      },
    ],
  },
  // {
  //   title: "Beratungszustand",
  //   name: "currentStatus",
  //   data: [
  //     {
  //       title: "Alle Beratungszustände",
  //       value: true,
  //       data: [
  //         {
  //           title: "Dem Bundesrat zugeleitet – Noch nicht beraten",
  //           value: true
  //         },
  //         {
  //           title: "Den Ausschüssen zugewiesen",
  //           value: true
  //         },
  //         {
  //           title: "Einbringung beschlossen",
  //           value: true
  //         },
  //         {
  //           title: "Einbringung abgelehnt",
  //           value: true
  //         },
  //         {
  //           title: "Dem Bundestag zugeleitet – Noch nicht beraten",
  //           value: true
  //         },
  //         {
  //           title: "Noch nicht beraten",
  //           value: true
  //         },
  //         {
  //           title: "Überwiesen",
  //           value: true
  //         },
  //         {
  //           title: "In der Beratung",
  //           value: true
  //         },
  //         {
  //           title: "Beschlussempfehlung liegt vor",
  //           value: true
  //         },
  //         {
  //           title: "Angenommen",
  //           value: true
  //         },
  //         {
  //           title: "Verabschiedet",
  //           value: true
  //         },
  //         {
  //           title: "Verkündet",
  //           value: true
  //         },
  //         {
  //           title: "Zurückgezogen",
  //           value: true
  //         },
  //         {
  //           title: "Für erledigt erklärt",
  //           value: true
  //         }
  //       ]
  //     }
  //   ]
  // }
];

const Wrapper = styled.SectionList`
  flex: 1;
  background-color: #fff;
`;

const ListRowMain = styled.View`
  padding-horizontal: 18;
  padding-vertical: 11;
  justify-content: center;
`;

const ListRowSub = styled.View`
  padding-left: 8;
  padding-vertical: 11;
  justify-content: center;
`;

const Row = styled.TouchableOpacity`
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

const STORAGE_KEY = 'VoteList.Filters';

class Filter extends Component {
  constructor(props) {
    super(props);
    props.navigator.setStyle({
      navBarCustomView: 'democracy.VoteList.Filter.Header',
      navBarComponentAlignment: 'fill',
      navBarNoBorder: true,
      navBarCustomViewInitialProps: {
        navigator: this.props.navigator,
        onSave: this.onSave,
      },
    });

    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      const jsonObj = JSON.parse(data);
      const filterData = FilterData.reduce((prev, obj) => {
        let dataReturn = [];
        if (obj.data[0].data) {
          dataReturn = obj.data[0].data.map(subObj => {
            if (jsonObj && jsonObj[obj.name]) {
              const subObjfind = jsonObj[obj.name].find(
                ({ name, title }) =>
                  (name && subObj.name === name) || (title && subObj.title === title),
              );
              return {
                ...subObjfind,
                value: subObjfind ? subObjfind.value : false,
              };
            }

            return subObj;
          });
        } else {
          if (jsonObj && jsonObj[obj.name]) {
            dataReturn = jsonObj[obj.name];
          } else {
            [dataReturn] = obj.data;
          }
          return { ...prev, [obj.name]: dataReturn };
        }

        if (dataReturn.length === 0) {
          if (jsonObj) {
            dataReturn = jsonObj[obj.name];
          } else {
            dataReturn = obj.data[0].value;
          }
        }
        return { ...prev, [obj.name]: dataReturn };
      }, {});
      this.setState({ data: filterData });
    });
  }

  state = {
    data: {},
  };

  onSave = async () => {
    const saveError = Object.keys(this.state.data).find(filterType => {
      if (Array.isArray(this.state.data[filterType])) {
        return this.state.data[filterType].every(({ value }) => !value);
      }
      return false;
    });
    if (saveError) {
      const filterTitle = FilterData.find(({ name }) => name === saveError).title;
      let indefiniteArticle;
      switch (saveError) {
        case 'activity':
          indefiniteArticle = 'eine';
          break;
        case 'type':
        case 'voteType':
        case 'currentStatus':
          indefiniteArticle = 'einen';
          break;
        default:
          indefiniteArticle = 'ein';
          break;
      }
      Alert.alert(
        `Speichern war nicht möglich – wähle mindestens ${indefiniteArticle} ${filterTitle} aus`,
      );
      return false;
    }

    const jsonString = JSON.stringify(this.state.data);
    await AsyncStorage.setItem(STORAGE_KEY, jsonString);
    this.props.setFilters({
      variables: { filters: jsonString },
      awaitRefetchQueries: true,
      refetchQueries: [{ query: GET_FILTERS }],
    });

    Navigation.dismissModal({
      animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
    return true;
  };

  onChange = ({ type, subType, value }) => {
    const { data } = this.state;
    if (subType) {
      const index = data[type].findIndex(
        ({ name, title }) => subType === name || subType === title,
      );
      if (index !== -1) {
        data[type][index].value = value;
      } else {
        const filterData = FilterData.find(
          ({ name, title }) => (name && type === name) || (title && type === title),
        );
        const subFilterData = filterData.data[0].data.find(
          ({ name, title }) => (name && subType === name) || (title && subType === title),
        );
        subFilterData.value = value;
        data[type].push(subFilterData);
      }
      this.setState({ data });
      return true;
    }
    if (typeof data[type] === 'object' && !Array.isArray(data[type])) {
      this.setState({
        data: {
          ...data,
          [type]: { ...data[type], value },
        },
      });
      return true;
    }
    this.setState({
      data: {
        ...data,
        [type]: data[type].map(obj => ({ ...obj, value })),
      },
    });
    return false;
  };

  getValue = ({ type, subType }) => {
    if (this.state.data[type]) {
      if (subType) {
        const filterEntry = this.state.data[type].find(
          ({ name, title }) => subType === name || subType === title,
        );
        if (filterEntry) {
          return filterEntry.value;
        }
        return false;
      }
      if (typeof this.state.data[type] === 'object' && !Array.isArray(this.state.data[type])) {
        return this.state.data[type].value;
      }
      const someFalse = this.state.data[type].some(({ value }) => !value);
      if (!someFalse) {
        return true;
      }
      const someTrue = this.state.data[type].some(({ value }) => value);
      if (!someTrue) {
        return false;
      }
      return 'mixed';
    }
    return false;
  };

  render() {
    return (
      <Wrapper
        sections={FilterData}
        renderSectionHeader={({ section: { title } }) => <SegmentHeader title={title} />}
        renderItem={({ item: { title, data }, section }) => {
          const sectionValue = this.getValue({ type: section.name });
          const mainCheckboxColor = sectionValue ? '#1c659f' : '#fff';
          const mainCheckboxDisabledColor = sectionValue ? '#1c659f' : '#fff';
          return (
            <ListRowMain>
              <Row
                style={{
                  paddingBottom: data && data.length > 0 ? 12 : 0,
                  borderBottomWidth: data && data.length > 0 ? 1 : 0,
                  borderColor: 'lightgrey',
                }}
                onPress={() => {
                  const curValue = this.getValue({ type: section.name });
                  this.onChange({
                    type: section.name,
                    value: !!(curValue === 'mixed' || !curValue),
                  });
                }}
              >
                <TitleMain>{title}</TitleMain>
                <Checkbox
                  value={sectionValue === true}
                  color={mainCheckboxColor}
                  disabledColor={mainCheckboxDisabledColor}
                  disabledCheckmarkColor={mainCheckboxDisabledColor}
                />
              </Row>
              {data &&
                data.map(({ title: subtitle, type: subType, name: subName }) => (
                  <ListRowSub key={subtitle}>
                    <Row
                      onPress={() => {
                        this.onChange({
                          type: section.name,
                          subType: subName || subtitle,
                          element: subType,
                          value: !this.getValue({
                            type: section.name,
                            subType: subName || subtitle,
                          }),
                        });
                      }}
                    >
                      <TitleSub>{subtitle}</TitleSub>
                      <Checkbox
                        value={this.getValue({
                          type: section.name,
                          subType: subName || subtitle,
                        })}
                      />
                    </Row>
                  </ListRowSub>
                ))}
            </ListRowMain>
          );
        }}
        keyExtractor={({ title }) => title}
      />
    );
  }
}

Filter.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default graphql(SET_FILTERS, { name: 'setFilters' })(Filter);
