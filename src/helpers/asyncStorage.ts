import AsyncStorage from '@react-native-async-storage/async-storage';

export type AsyncStorageType = {
  value?: unknown;
  item: 'token' | 'user';
};

export const storeData = async ({value, item}: AsyncStorageType) => {
  try {
    await AsyncStorage.setItem(item, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const removeData = async ({item}: AsyncStorageType) => {
  try {
    await AsyncStorage.removeItem(item);
  } catch (error) {
    console.log(error);
  }
};

export const getData = async ({item}: AsyncStorageType) => {
  try {
    const data = await AsyncStorage.getItem(item);
    return data;
  } catch (error) {
    console.log(error);
  }
};
