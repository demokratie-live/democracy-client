// migrates data from native AsyncStorage to @react-native-async-storage/async-storage

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorage as DeprecatedAsyncStorage } from 'react-native';

const STORAGE_KEY = 'MIGRATED_NATIVE_ASYNC_STORAGE';

export const migrateAsyncStorageData = async () => {
  // check if new AsyncStorage has already keys
  const checkKeys = await AsyncStorage.getAllKeys();
  if (checkKeys.length > 0) {
    return;
  }

  // get all keys from deprecated AsyncStorage
  const keys = await DeprecatedAsyncStorage.getAllKeys();

  // get all values from deprecated AsyncStorage
  const values = await DeprecatedAsyncStorage.multiGet(keys);

  if (values.length === 0) {
    return;
  }
  // set all values to new AsyncStorage
  await AsyncStorage.multiSet(values);

  // set migrated flag
  await AsyncStorage.setItem(STORAGE_KEY, 'true');
};
