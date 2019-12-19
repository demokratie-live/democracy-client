import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface SearchInterface {
  term: string;
  setTerm: (term: string) => void;
  history: string[];
  addToHistory: (term: string) => void;
}

const defaults: SearchInterface = {
  term: '',
  setTerm: () => {
    throw new Error('SearchContext: setTerm function is not defined');
  },
  history: [],
  addToHistory: () => {
    throw new Error('SearchContext: addToHistory function is not defined');
  },
};

export const SearchContext = createContext<SearchInterface>(defaults);

const STORAGE_KEY_HISTORY = 'search_history';

export const SearchProvider: React.FC = ({ children }) => {
  const [term, setTerm] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY_HISTORY).then(historyString =>
      historyString ? setHistory(JSON.parse(historyString)) : null,
    );
  }, []);

  const addToHistory = (newTerm: string) => {
    // TODO remove duplicates
    // TODO handle max history length
    const newHistory = [...history, newTerm];
    setHistory(newHistory);
    AsyncStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(newHistory));
  };

  return (
    <SearchContext.Provider
      value={{
        term,
        setTerm,
        history,
        addToHistory,
      }}>
      {children}
    </SearchContext.Provider>
  );
};
