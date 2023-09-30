import AsyncStorage from '@react-native-async-storage/async-storage';

export const get_from_localStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return {
        value,
        status: true,
      };
    }
    return {
      status: false,
    };
  } catch (e) {
    // error reading value
    return {
      status: false,
    };
  }
};

export const getObject_from_localStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null
      ? {
          value: JSON.parse(jsonValue),
          status: true,
        }
      : {
          status: false,
        };
  } catch (e) {
    // error reading value
    return {
      status: false,
    };
  }
};
