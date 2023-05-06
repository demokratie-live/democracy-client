import React, { useCallback, useEffect, useState } from 'react';
import { SectionList, View, Alert } from 'react-native';
import { Segment } from '../List/Components/Segment';
import Checkbox from './components/Checkbox';
import styled from 'styled-components/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes';
import { FilterData } from '../../../api/hooks/useListFilter/initData';
import { useInitialState } from '../../../api/state/initialState';
import { FilterEntry } from '../../../api/hooks/useListFilter/initData';
import { useRecoilState } from 'recoil';
import { filterState } from '../../../api/state/filter';

const Save = styled.TouchableOpacity``;

const SaveText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

const Container = styled.View`
  background-color: #fff;
`;

const ListRowMain = styled.View`
  padding-top: 4px;
  justify-content: center;
`;

const ListRowSub = styled.View`
  padding-left: ${({ theme }) => theme.spaces.default};
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* background-color: #ffff0055; */
`;

const TitleMain = styled.Text`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TitleSub = styled.Text`
  flex: 0.98;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

type FilterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Filter'>;

type Props = {
  navigation: FilterScreenNavigationProp;
};

export const FilterScreen: React.FC<Props> = ({ navigation }) => {
  const { isVerified } = useInitialState();
  const [filter, setFilter] = useRecoilState(filterState);
  const [data, setData] = useState<FilterData[]>(filter);

  useEffect(() => {
    if (!isVerified) {
      setData(d => d.filter(({ name }) => name !== 'activity'));
    } else if (isVerified && !data.some(({ name }) => name === 'activity')) {
      setData(d => [...filter.filter(({ name }) => name === 'activity'), ...d]);
    }
  }, [data, setData, isVerified, filter]);

  const getValue = useCallback(
    ({ type, subType }: { type: string; subType?: string }) => {
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
    },
    [data],
  );

  const onSave = useCallback(() => {
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
  }, [data, getValue, navigation, setFilter]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Save onPress={onSave}>
          <SaveText>Speichern</SaveText>
        </Save>
      ),
    });
  }, [navigation, onSave]);

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
        const newEntryData = category.data.map(entry => {
          if (subType && (entry.name === subType || entry.title === subType)) {
            return { ...entry, value: value };
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
        scrollIndicatorInsets={{ right: 1 }}
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
                  paddingHorizontal: 18,
                  borderBottomWidth: 1,
                  borderColor: lightgrey,
                }}
                onPress={() => {
                  const curValue = getValue({ type: name });
                  onChange({
                    type: name,
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
            </View>
          );
        }}
        renderItem={({ item: { title: subtitle, name: subName }, section }) => {
          return (
            <ListRowMain>
              <ListRowSub key={subtitle}>
                <Row
                  style={{
                    borderBottomWidth: 1,
                    borderColor: 'rgba(0,0,0,0.1)',
                    paddingLeft: 8,
                    paddingVertical: 8,
                    paddingRight: 18,
                  }}
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
                  }}
                >
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
