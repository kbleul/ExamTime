import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkIsOnline} from '../Helper';
import {LocalObjectDataKeys} from '../../Data/data';
import {TipType, subjectType} from '../../../types';
import {Subject} from '../../../Realm';

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
  gradeId: string | null,
  setTips?: React.Dispatch<React.SetStateAction<TipType[] | null>>,
  selectedSubject?: Subject | subjectType,
) => {
  const isConnected = await checkIsOnline();
  if (isConnected) {
    try {
      const response: any = await getTips({
        gradeId,
      }).unwrap();

      if (response.tips && response.tips.length > 0) {
        saveTipsToRealm(response.tips, realm);

        if (selectedSubject && setTips) {
          setTips([
            ...response.tips.filter(
              (tip: TipType) =>
                tip.subject && tip.subject.id === selectedSubject.subject.id,
            ),
          ]);
        }

        return;
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export const saveTipsToRealm = (tips: any, realm: Realm) => {
  const savedTips = realm.objects(LocalObjectDataKeys.Tip);

  realm.write(() => {
    realm.delete(savedTips);
  });

  for (const tipObj of tips) {
    const {id, tipType, tip, subject} = tipObj;
    const savedSubject = realm
      .objects(LocalObjectDataKeys.SingleSubject)
      .filtered(`id="${subject.id}" OR subject = "${subject.subject}"`);

    realm.write(() => {
      let tipSubject;
      if (!savedSubject || savedSubject.length === 0) {
        tipSubject = realm.create(LocalObjectDataKeys.SingleSubject, {
          id: subject.id,
          subject: subject.subject,
          createdAt: subject.createdAt,
          updatedAt: subject.updatedAt,
        });
      } else {
        tipSubject = savedSubject[0];
      }

      realm.create(LocalObjectDataKeys.Tip, {
        id,
        tipType,
        tip,
        subject: tipSubject,
      });
    });
  }
};
