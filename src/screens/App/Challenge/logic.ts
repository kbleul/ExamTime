import {NavigationProp} from '@react-navigation/native';
import {checkIsOnline} from '../../../utils/Functions/Helper';
import {
  useGetChallengesMutation,
  useSaveChallengeProgressMutation,
} from '../../../reduxToolkit/Services/auth';
import {ChallangeDayType, ChallangeType, singleChallenge} from '../../../types';
import {
  Challange,
  ChallangeDay,
  SingleChallenge,
  SingleSubject,
} from '../../../Realm';

type GetChallengesMutationFn = ReturnType<typeof useGetChallengesMutation>[0];
type saveChallengeProgressFn = ReturnType<
  typeof useSaveChallengeProgressMutation
>[0];

export const fetchChallenges = async (
  getChallenges: GetChallengesMutationFn,
  token: string | null,
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  realm: Realm,
  savedChallengeId: string | null,
  saveChallengeProgress: saveChallengeProgressFn,
) => {
  if (token) {
    try {
      checkIsOnline(navigator);

      const response: any = await getChallenges({token}).unwrap();
      const challnges = response.challenges ? response.challenges : null;

      if (challnges) {
        if (challnges.length > 0 && challnges[0].id !== savedChallengeId) {
          saveChallengeToRealm(response.challenges, realm);
        } else {
          //save challenge progress to DB
          updateProgress(token, saveChallengeProgress, realm);
        }

        setIsPending(false);
      }
    } catch (err) {
      console.log('Error getting challenges', err);
    }
  }
};

const updateProgress = async (
  token: string,
  saveChallengeProgress: saveChallengeProgressFn,
  realm: Realm,
) => {
  try {
    const savedChallenge = realm.objects(Challange);

    if (!savedChallenge || savedChallenge.length < 0) {
      return;
    }

    const challengeProgress = Math.round(savedChallenge[0].progress);

    let progress = 0;
    if (challengeProgress >= 0 && challengeProgress <= 100) {
      progress = challengeProgress;
    } else if (challengeProgress > 100) {
      progress = 100;
    }

    const res = await saveChallengeProgress({
      token,
      challengeId: savedChallenge[0].id,
      progress,
    }).unwrap();

    console.log(res);
  } catch (err) {
    console.log('Error saving challenges progress', err);
  }
};

const saveChallengeToRealm = (challenges: ChallangeType[], realm: Realm) => {
  if (challenges.length > 0) {
    const challenge = challenges[0];
    try {
      const challengeDayArr = challenge.challengeDay;

      const newChallengeDayArr = saveChallengeDays_ToRealm(
        realm,
        challengeDayArr,
      );

      realm.write(() => {
        const savedChallenges = realm.objects(Challange);

        realm.delete(savedChallenges);
        realm.create(Challange, {
          id: challenge.id,
          title: challenge.title,
          isPublished: challenge.isPublished,
          createdAt: challenge.createdAt,
          updatedAt: challenge.updatedAt,
          challengeDay: newChallengeDayArr,
          progress: 0,
          fetchChallenges: [],
        });
      });
    } catch (err) {
      console.log('Error saving challenges', err);
    }
  }
};

const saveChallengeDays_ToRealm = (
  realm: Realm,
  challengeDayArr: [] | ChallangeDayType[],
) => {
  if (!challengeDayArr || challengeDayArr.length === 0) {
    return [];
  }

  try {
    const newChallengeDayArr: ChallangeDay[] = [];

    for (const challengeDay of challengeDayArr) {
      const singleChallengeArr = challengeDay.singleChallenge;

      const newSingleChallengeArr: SingleChallenge[] =
        saveSingleChallenges_ToRealm(realm, singleChallengeArr);

      realm.write(() => {
        const scheduleDate = createSchedule(challengeDay.day - 1);
        const newChallengeDay = realm.create(ChallangeDay, {
          id: challengeDay.id,
          day: challengeDay.day,
          rest: challengeDay.rest,
          singleChallenge: newSingleChallengeArr,
          scheduledDate: scheduleDate,
        });
        newChallengeDayArr.push(newChallengeDay);
      });
    }

    return newChallengeDayArr;
  } catch (err) {
    console.log('Error saving challenges to realm', err);
  }
};

const saveSingleChallenges_ToRealm = (
  realm: Realm,
  singleChallengeArr: singleChallenge[],
) => {
  if (!singleChallengeArr || singleChallengeArr.length === 0) {
    return [];
  }

  try {
    const newSingleChallengeArr: SingleChallenge[] = [];

    for (const singleChallengeItem of singleChallengeArr) {
      const subjectObj = realm
        .objects(SingleSubject)
        .filtered(
          `id = "${singleChallengeItem.subject?.id}" OR id = "${singleChallengeItem.subject}" OR subject = "${singleChallengeItem.subject?.subject}"`,
        );

      if (
        subjectObj &&
        subjectObj.length > 0 &&
        singleChallengeItem.section &&
        singleChallengeItem.section.section &&
        singleChallengeItem.unit &&
        singleChallengeItem.unit.unit
      ) {
        realm.write(() => {
          const newSingleChallenge = realm.create(SingleChallenge, {
            id: singleChallengeItem.id,
            unit: singleChallengeItem.unit.unit,
            section: singleChallengeItem.section.section,
            subject: subjectObj[0],
          });
          newSingleChallengeArr.push(newSingleChallenge);
        });
      }
    }

    return newSingleChallengeArr;
  } catch (err) {
    console.log('Error saving single challenge', err);
  }
};

const createSchedule = (dayCounter: number) => {
  const currentDate = new Date(); // Get current date

  const scheduleDate = new Date(currentDate); // Create a new date object for each day
  scheduleDate.setDate(currentDate.getDate() + dayCounter); // Increment the date by 'i' days

  return scheduleDate.toString();
};

export const parseDate = (dateString: string | null) => {
  if (!dateString) {
    return null;
  }

  const date = new Date(dateString);

  const currentDate = new Date();

  let day = date.toLocaleString('default', {weekday: 'short'});

  const dateValue = date.getDate();

  const isActive = date.getDate() === currentDate.getDate();

  return {
    day: day,
    date: dateValue,
    isActive: isActive,
  };
};

//datestring === 'Wed Dec 20 2023 08:00:43 GMT-0500'   - format
export const compareDayToCurrentDay = (dateString: string | null) => {
  if (!dateString) {
    return false;
  }
  const providedDate = new Date(dateString);

  //'Sat Dec 15 2023 08:00:43 GMT-0500'
  const currentDate = new Date();

  const providedDay = providedDate.getDate();
  const providedMonth = providedDate.getMonth();
  const providedYear = providedDate.getFullYear();

  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return (
    providedDay === currentDay &&
    providedMonth === currentMonth &&
    providedYear === currentYear
  );
};

export const calculateWeeks = (challengeDay: ChallangeDayType[] | []) => {
  let weeks: {
    id: number;
    isActive: boolean;
  }[] = [];

  if (challengeDay.length > 28 || challengeDay.length <= 0) {
    return weeks;
  } else if (challengeDay.length <= 7) {
    weeks = [
      {
        id: 1,
        isActive: false,
      },
    ];
  } else if (challengeDay.length <= 14) {
    weeks = [
      {
        id: 1,
        isActive: false,
      },
      {
        id: 2,
        isActive: false,
      },
    ];
  } else if (challengeDay.length <= 21) {
    weeks = [
      {
        id: 1,
        isActive: false,
      },
      {
        id: 2,
        isActive: false,
      },
      {
        id: 3,
        isActive: false,
      },
    ];
  } else {
    weeks = [
      {
        id: 1,
        isActive: false,
      },
      {
        id: 2,
        isActive: false,
      },
      {
        id: 3,
        isActive: false,
      },
      {
        id: 4,
        isActive: false,
      },
    ];
  }

  for (const [index, day] of challengeDay.entries()) {
    if (compareDayToCurrentDay(day.scheduledDate)) {
      if (index <= 6) {
        weeks[0].isActive = true;
      } else if (index <= 13) {
        weeks[1].isActive = true;
      } else if (index <= 20) {
        weeks[2].isActive = true;
      } else {
        weeks[3].isActive = true;
      }
    }
  }
  return weeks;
};

export const getDaysOfArray = (
  challengeDays: [] | ChallangeDayType[],
  weeksArr: {
    id: number;
    isActive: boolean;
  }[],
) => {
  let daysArray: ChallangeDayType[] = [];
  if (weeksArr.length === 1) {
    daysArray = [...challengeDays].splice(weeksArr.length * 7 - 7, 7);
  } else {
    weeksArr.forEach((week, index: number) => {
      if (week.isActive) {
        daysArray = [...challengeDays].splice(index * 7, 7);
      }
    });
  }

  return daysArray;
};
