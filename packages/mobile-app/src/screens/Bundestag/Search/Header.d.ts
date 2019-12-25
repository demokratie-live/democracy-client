// This file exists for two purposes:
// 1. Ensure that both ios and android files present identical types to importers.
// 2. Allow consumers to import the module as if typescript understood react-native suffixes.
import * as ios from './Header.ios';
import * as android from './Header.android';

declare const SearchHeader: typeof ios;
declare const SearchHeader: typeof android;

export * from './Header.ios';
