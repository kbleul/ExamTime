import {NavigationProp} from '@react-navigation/native';
// import RNFetchBlob from 'rn-fetch-blob';
import {checkIsOnline} from '../../../utils/Functions/Helper';
import {useGetStudyMutation} from '../../../reduxToolkit/Services/auth';
import {examQuestionType, pdfType, studyType, videoType} from '../../../types';
import {LocalObjectDataKeys} from '../../../utils/Data/data';
import {Study} from '../../../Realm';

type StudyMutationFn = ReturnType<typeof useGetStudyMutation>[11];

export const getAllStudies = async (
  getStudy: StudyMutationFn,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  token: string | null,
  realm: Realm,
  Toast: any,
) => {
  if (token) {
    checkIsOnline(navigator);

    try {
      const response = await getStudy({
        token,
      }).unwrap();
      saveStudyToRealm(realm, response.studies, Toast);
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message === 'Network request failed'
      ) {
        navigator.navigate('network-error');
      }

      Toast.show({
        type: 'error',
        text1: 'Error fetching studeies',
      });
      return false;
    }
  }
};

export const saveStudyToRealm = async (
  realm: Realm,
  studies: studyType[] | [],
  Toast: any,
) => {
  if (studies && studies.length > 0) {
    try {
      studies.forEach(study => {
        const {
          id,
          title,
          objective,
          isPublished,
          createdAt,
          updatedAt,
          grade,
          subject,
          year,
          unit,
          section,
          selectedQuestion,
          pdf,
          videoLink,
        } = study;

        const yearString = year.year;
        const unitString = unit.unit;
        const sectionString = section.section;

        realm.write(async () => {
          const subjectObject = realm.create(
            LocalObjectDataKeys.SingleSubject,
            {
              id: subject.id,
              subject: subject.subject,
              createdAt: subject.createdAt,
              updatedAt: subject.updatedAt,
            },
          );

          const gradeObject = realm.create(LocalObjectDataKeys.Grade, {
            id: grade.id,
            grade: grade.grade,
            createdAt: grade.createdAt,
            updatedAt: grade.updatedAt,
          });

          const examQuestionArr: examQuestionType[] = [];
          const pdfObjArr: pdfType[] = [];
          const videoObjArr: videoType[] = [];

          selectedQuestion.forEach(question => {
            let {
              id: qId,
              number,
              questionType,
              question: questionText,
              A,
              B,
              C,
              D,
              answer,
              description,
              createdAt: qCreatedAt,
              updatedAt: qUpdatedAt,
            } = question;

            const questiontObject = realm.create(
              LocalObjectDataKeys.ExamQuestion,
              {
                id: qId,
                number,
                questionType,
                question: questionText,
                A,
                B,
                C,
                D,
                answer,
                description,
                createdAt: qCreatedAt,
                updatedAt: qUpdatedAt,
              },
            );

            examQuestionArr.push(questiontObject);
          });

          videoLink.forEach(videoItem => {
            const {id: videoId, videoLink} = videoItem;

            const videoObject = realm.create(LocalObjectDataKeys.VideoLink, {
              id: videoId,
              videoLink,
              isViewed: false,
            });

            videoObjArr.push(videoObject);
          });

          await savePdfs(pdf, pdfObjArr, realm).then(() => {
            realm.write(() => {
              try {
                realm.create(LocalObjectDataKeys.Study, {
                  id,
                  title,
                  objective,
                  isPublished,
                  createdAt,
                  updatedAt,
                  grade: gradeObject,
                  subject: subjectObject,
                  year: yearString,
                  unit: unitString,
                  section: sectionString,
                  selectedQuestion: examQuestionArr,
                  progress: 0,
                  pdf: pdfObjArr,
                  videoLink: videoObjArr,
                  userExamAnswers: [],
                });
              } catch (e) {
                console.log('Error saving study to realm DB', e);
              }
            });
          });
        });
      });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Error saving studies for offline use',
      });
    }
  }
};

const savePdfs = async (
  pdf: [] | pdfType[],
  pdfObjArr: pdfType[],
  realm: Realm,
) => {
  for (const pdfItem of pdf) {
    const pdfObject = await downloadAndCreatePDF(pdfItem, realm);
    pdfObject && pdfObjArr.push(pdfObject);
  }
};

export const downloadAndCreatePDF = async (pdfItem: pdfType, realm: Realm) => {
  try {
    const response = await RNFetchBlob.config({
      fileCache: true,
      appendExt: 'pdf',
      path: `${RNFetchBlob.fs.dirs.DocumentDir}/pdfs/${Date.now()}`,
    }).fetch('GET', pdfItem.pdfDocument);

    console.log('PDF file downloaded and saved:', response.path());

    const filePath = response.path();

    let pdfObject = null;

    realm.write(() => {
      try {
        pdfObject = realm.create(LocalObjectDataKeys.Pdf, {
          id: pdfItem.id,
          pdfDocument: filePath,
          isViewed: false,
        });
      } catch (e) {
        console.log('Error saving pdf file ', e);
      }
    });

    return pdfObject;
  } catch (error) {
    console.error('Error downloading PDF file:', error);
    return null;
  }
};

export const getSections = (studies: ResultsType<Study>) => {
  const sections: string[] = [];

  studies.forEach(
    (savedStudy: Study) =>
      savedStudy.section &&
      !sections.includes(savedStudy.section) &&
      sections.push(savedStudy.section),
  );

  return sections;
};

export const filterStudies = (
  studies: ResultsType<Study>,
  selectedSection: string,
  setViewStudies: React.Dispatch<React.SetStateAction<Study[]>>,
  setSelectedSection: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const filteredStudies = studies.filter(
    (study: Study) => study.section === selectedSection,
  );

  setViewStudies([...filteredStudies]);
  setSelectedSection(selectedSection);
};

export const calculateStudyProgress = (studyUnits: Study[]) => {
  if (studyUnits.length === 0) return 0;

  const prepareProgressArr = studyUnits.map(item => {
    if (
      item.selectedQuestion.length === 0 &&
      item.pdf.length === 0 &&
      item.videoLink.length === 0
    ) {
      return 100;
    }
    return item.progress;
  });
  // Perform calculations or further operations with prepareProgressArr if needed
  const singleStudyPrecentage = 100 / studyUnits.length;

  let totalPreogress = 0;
  prepareProgressArr.forEach(item => {
    if (item !== 0) {
      totalPreogress += (item * singleStudyPrecentage) / 100;
    }
  });
  return Math.round(totalPreogress);
};

export const calculate_and_Assign_UnitProgress = (
  study: Study,
  realm: Realm,
) => {
  const assessmentValue = study.selectedQuestion.length === 0 ? 0 : 1;
  const percentageValue =
    100 / (assessmentValue + study.pdf.length + study.videoLink.length);

  try {
    realm.write(() => {
      study.progress = study.progress + percentageValue;
    });
  } catch (e) {
    console.log('Error updating progress,  ', e);
  }
};
