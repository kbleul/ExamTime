import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkIsOnline} from '../Helper';
import {LocalObjectDataKeys} from '../../Data/data';
import {TipType} from '../../../types';

type TipMutationFn = ReturnType<typeof useGetTipsMutation>[0];

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

export const fetchTips = async (
  getTips: TipMutationFn,
  realm: Realm,
  token: string | null,
  setTips: React.Dispatch<React.SetStateAction<TipType[] | null>>,
) => {
  const isConnected = await checkIsOnline();

  if (isConnected) {
    try {
      const response: any = await getTips({
        token,
      }).unwrap();

      if (response.tips && response.tips.length > 0) {
        saveTipsToRealm(response.tips, realm);
        setTips([...(response.tips.subject.id === selectedSubject.id)]);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export const saveTipsToRealm = (tips: any, realm: Realm) => {
  for (const tipObj of tips) {
    const {id, tipType, tip, subject} = tipObj;

    realm.write(() => {
      const newSubject = realm.create(LocalObjectDataKeys.SingleSubject, {
        id: subject.id,
        subject: subject.subject,
        createdAt: subject.createdAt,
        updatedAt: subject.updatedAt,
      });
      realm.create(LocalObjectDataKeys.Tip, {
        id,
        tipType,
        tip,
        subject: newSubject,
      });
    });
  }
};
