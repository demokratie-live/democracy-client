import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyValuePair } from "@react-native-async-storage/async-storage/lib/typescript/types";
import { useEffect, useState } from "react";

export const useGetAllStorageKeys = () => {
  const [allStorageKeys, setAllStorageKeys] = useState<readonly string[]>([]);
  const [allStoragesWithValues, setAllStoragesWithValues] = useState<
    readonly KeyValuePair[]
  >([]);

  const fetchAllStorageKeys = async () => {
    const keys = await AsyncStorage.getAllKeys();
    setAllStorageKeys(keys);
  };

  const fetchAllStoragesWithValues = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys);
    setAllStoragesWithValues(values);
  };

  useEffect(() => {
    fetchAllStorageKeys();
    fetchAllStoragesWithValues();
  }, []);

  return { allStorageKeys, allStoragesWithValues };
};
