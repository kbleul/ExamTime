import AsyncStorage from '@react-native-async-storage/async-storage';

export const set_to_localStorage = async (
  key: string,
  value: string | boolean,
) => {
  try {
    await AsyncStorage.setItem(key, value.toString());
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};

export const setObject_to_localStorage = async (key: string, value: {}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};
