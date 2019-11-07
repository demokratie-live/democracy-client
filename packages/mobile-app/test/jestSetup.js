/* eslint-disable no-undef */
// @ts-ignore
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import './mocks/react-native-reanimated';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
