/* eslint no-empty: "off" */

import AsyncStorage from '@react-native-community/async-storage';
import SensitiveStorage from 'react-native-sensitive-info';

const keychainPrefixKey = 'keychainPrefix';

const keychainPrefixResolver = async () => {
  let prefix = await AsyncStorage.getItem(keychainPrefixKey);

  if (prefix) {
    return prefix;
  }

  // eslint-disable-next-line
  prefix = (new Date().getTime()).toString();

  await AsyncStorage.setItem(keychainPrefixKey, prefix);

  return prefix;
};

const generateKeychainKey = async (key) => {
  const prefix = await keychainPrefixResolver();

  return `${prefix}_${key}`;
};

const save = async (key, snapshot) => {
  const data = JSON.stringify(snapshot);

  const resolvedKey = await generateKeychainKey(key);

  return SensitiveStorage.setItem(resolvedKey, data, {});
};

const load = async (key) => {
  try {
    const resolvedKey = await generateKeychainKey(key);

    const raw = await SensitiveStorage.getItem(resolvedKey, {});

    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}

  return undefined;
};

export default {
  save,
  load,
};