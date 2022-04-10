import { useState } from 'react';
import { ProcedureFilter } from '../../../__generated__/graphql';
import { FilterData, filterData, FilterEntry } from './initData';

export const useListFilter = () => {
  const [filter, setFilter] = useState(filterData);
  const [proceduresFilter, setProceduresFilter] = useState<ProcedureFilter>({});

  const formatFilterdata = (data: FilterEntry[]) => {
    return data.reduce<string[]>((prev, { name: subtype, title, value }) => {
      if (value) {
        return [...prev, subtype || title];
      }
      return prev;
    }, []);
  };

  const getFilterPrepared = (rawData: FilterData[]) => {
    const filters: ProcedureFilter = {};
    rawData.forEach(({ name, data }) => {
      switch (name) {
        case 'activity':
          if (data.some(({ value }) => !value)) {
            filters.activity = formatFilterdata(data);
          }
          break;
        case 'type':
          if (data.some(({ value }) => !value)) {
            filters.type = formatFilterdata(data);
          }
          break;
        case 'subjectGroups':
          if (data.some(({ value }) => !value)) {
            filters.subjectGroups = formatFilterdata(data);
          }
          break;

        default:
          break;
      }
    });

    return filters;
  };

  const onSetFilter = (rawData: FilterData[]) => {
    setFilter(rawData);
    setProceduresFilter(getFilterPrepared(rawData));
  };

  const active = Object.keys(getFilterPrepared(filter)).length !== 0;

  return {
    filter,
    setFilter: onSetFilter,
    proceduresFilter,
    active,
  };
};
