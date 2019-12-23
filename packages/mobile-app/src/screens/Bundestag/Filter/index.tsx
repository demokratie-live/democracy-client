import React, { useEffect, useState, useContext } from 'react';
import { SectionList, View, Alert } from 'react-native';
import styled from 'styled-components/native';
import { FilterData, FilterEntry } from '../../../context/ListFilter/initData';
import { Segment } from '../List/Components/Segment';
import Checkbox from './components/Checkbox';
import { ListFilterContext } from '../../../context/ListFilter';
import { StackNavigationProp } from '@react-navigation/stack';
import { BundestagRootStackParamList } from '../../../routes/Sidebar/Bundestag';
import { InitialStateContext } from '../../../context/InitialStates';

// import SegmentHeader from '../../../components/ListSectionHeader';
// import Checkbox from '../../../components/Checkbox';

// import SET_FILTERS from '../../../graphql/mutations/local/setFilters';
// import GET_FILTERS from '../../../graphql/queries/local/filters';

const Container = styled.View`
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

const SaveButton = styled.Button.attrs({
  color: '#fff',
})``;

type FilterScreenNavigationProp = StackNavigationProp<
  BundestagRootStackParamList,
  'Filter'
>;

type Props = {
  navigation: FilterScreenNavigationProp;
};

export const Filter: React.FC<Props> = ({ navigation }) => {
  const { isVerified } = useContext(InitialStateContext);
  const { filter, setFilter } = useContext(ListFilterContext);
  const [data, setData] = useState<FilterData[]>(filter);

  useEffect(() => {
    if (
      !isVerified &&
      data.findIndex(({ name }) => name === 'activity') !== -1
    ) {
      setData(data.filter(({ name }) => name !== 'activity'));
    }
  }, [data, setData, isVerified]);

  const getValue = ({ type, subType }: { type: string; subType?: string }) => {
    const filterCategory = data.find(({ name }) => {
      return name === type;
    });
    if (filterCategory) {
      if (subType) {
        const filterEntry = filterCategory.data.find(
          ({ name, title }) => subType === name || subType === title,
        );
        if (filterEntry) {
          return filterEntry.value;
        }
        return false;
      }
      const someFalse = filterCategory.data.some(({ value }) => !value);
      if (!someFalse) {
        return true;
      }
      const someTrue = filterCategory.data.some(({ value }) => value);
      if (!someTrue) {
        return false;
      }
      return 'mixed';
    }
    return false;
  };

  const onSave = async () => {
    const saveError = data.find(({ name }) => !getValue({ type: name }));
    if (saveError) {
      let indefiniteArticle;
      switch (saveError.name) {
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
        `Speichern war nicht möglich – wähle mindestens ${indefiniteArticle} ${saveError.title} aus`,
      );
      return false;
    }
    setFilter(data);
    navigation.goBack();
  };

  navigation.setOptions({
    headerRight: () => <SaveButton onPress={onSave} title="Speichern" />,
  });

  const onChange = ({
    type,
    subType,
    value,
  }: {
    type: string;
    subType?: string;
    value: boolean;
  }) => {
    const newData = data.map(category => {
      if (category.name === type) {
        const allSelected = getValue({ type: category.name }) === true;
        const newEntryData = category.data.map(entry => {
          if (subType && (entry.name === subType || entry.title === subType)) {
            return { ...entry, value: allSelected ? !value : value };
          } else if (subType && allSelected) {
            return { ...entry, value: allSelected ? value : !value };
          } else if (!subType) {
            return { ...entry, value };
          }
          return entry;
        });
        return { ...category, data: newEntryData };
      }
      return category;
    });
    setData(newData);
  };

  const lightgrey = 'lightgrey';
  return (
    <Container>
      <SectionList<FilterEntry>
        stickySectionHeadersEnabled={false}
        sections={data}
        renderSectionHeader={({ section: { title, name } }) => {
          const sectionValue = getValue({ type: name });
          const mainCheckboxColor = sectionValue ? '#1c659f' : '#fff';
          const mainCheckboxDisabledColor = sectionValue ? '#1c659f' : '#fff';
          return (
            <View>
              <Segment text={title} />
              <Row
                style={{
                  paddingVertical: 11,
                  paddingHorizontal: 11,
                  borderBottomWidth: 1,
                  borderColor: lightgrey,
                }}
                onPress={() => {
                  const curValue = getValue({ type: name });
                  onChange({
                    type: name,
                    value: !!(curValue === 'mixed' || !curValue),
                  });
                }}>
                <TitleMain>{title}</TitleMain>
                <Checkbox
                  value={sectionValue === true}
                  color={mainCheckboxColor}
                  disabledColor={mainCheckboxDisabledColor}
                  disabledCheckmarkColor={mainCheckboxDisabledColor}
                />
              </Row>
            </View>
          );
        }}
        renderItem={({ item: { title: subtitle, name: subName }, section }) => {
          return (
            <ListRowMain>
              <ListRowSub key={subtitle}>
                <Row
                  onPress={() => {
                    const curValue = getValue({
                      type: section.name,
                      subType: subName || subtitle,
                    });
                    onChange({
                      type: section.name,
                      subType: subName || subtitle,
                      value: !curValue,
                    });
                  }}>
                  <TitleSub>{subtitle}</TitleSub>
                  <Checkbox
                    value={getValue({
                      type: section.name,
                      subType: subName || subtitle,
                    })}
                  />
                </Row>
              </ListRowSub>
            </ListRowMain>
          );
        }}
        keyExtractor={({ title }) => title}
      />
    </Container>
  );
};
