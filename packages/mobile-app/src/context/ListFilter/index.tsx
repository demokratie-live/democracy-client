import React, { createContext, useState } from 'react';
import { FilterData, filterData } from './initData';

interface ListFilterInterface {
  filter: FilterData[];
  setFilter: (filter: FilterData[]) => void;
}

const defaults: ListFilterInterface = {
  filter: filterData,
  setFilter: () => {
    throw new Error('ListFilterContext: setFilter function is not defined');
  },
};

export const ListFilterContext = createContext<ListFilterInterface>(defaults);

export const ListFilterProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = useState(filterData);

  return (
    <ListFilterContext.Provider
      value={{
        filter,
        setFilter,
      }}>
      {children}
    </ListFilterContext.Provider>
  );
};
