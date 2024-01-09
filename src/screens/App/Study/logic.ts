import {NavigationProp} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import {checkIsOnline} from '../../../utils/Functions/Helper';
import {useGetStudyMutation} from '../../../reduxToolkit/Services/auth';
import {examQuestionType, pdfType, studyType, videoType} from '../../../types';
import {LocalObjectDataKeys, NumberConverter} from '../../../utils/Data/data';
import {Study} from '../../../Realm';

type StudyMutationFn = ReturnType<typeof useGetStudyMutation>[11];

export const getAllStudies = async (
  getStudy: StudyMutationFn,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  token: string,
  realm: Realm,
  Toast: any,
) => {
  if (token) {
    checkIsOnline(navigator);

    let pageNumber = 1;
    let totalPages = 1;

    while (pageNumber <= totalPages) {
      try {
        const response = await getStudy({
          token,
          pageNumber,
        }).unwrap();

        ++pageNumber;

        totalPages = response.totalPages;

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
        //check if Study is aleady saved
        const isSaved = realm.objects(Study).filtered(`id = "${study.id}"`);

        if (isSaved.length === 0) {
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

          const yearString = year && year.year ? year.year : '';
          const unitString = unit && unit.unit ? unit.unit : '';
          const sectionString =
            section && section.section ? section.section : '';

          let savedGrade: Results<
            RealmObject<DefaultObject, never> & DefaultObject
          > | null = realm
            .objects(LocalObjectDataKeys.Grade)
            .filtered(`id = "${grade.id}"`);

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

            if (!savedGrade || savedGrade.length === 0) {
              savedGrade = realm.create(LocalObjectDataKeys.Grade, {
                id: grade.id,
                grade: grade.grade,
                createdAt: grade.createdAt,
                updatedAt: grade.updatedAt,
              });
            }

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
                    grade: savedGrade[0],
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
        }
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

  return pdfObjArr;
};

export const downloadAndCreatePDF = async (pdfItem: pdfType, realm: Realm) => {
  const pdfUrl = pdfItem.pdfDocument;

  const fileName = `pdf_${Date.now()}.pdf`;

  const directoryPath = `${RNFS.DocumentDirectoryPath}/pdfs`;

  const filePath = `${directoryPath}/${fileName}`;

  const downloadOptions = {
    fromUrl: pdfUrl,
    toFile: filePath,
  };

  try {
    return RNFS.mkdir(directoryPath)
      .then(() => RNFS.downloadFile(downloadOptions))
      .then(() => {
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
      })
      .catch(error => {
        // Handle download error
        console.error('Error downloading PDF:', error);
      });
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

  const sortedStudies = sortStudies(filteredStudies);
  setViewStudies([...sortedStudies]);
  setSelectedSection(selectedSection);
};

const sortStudies = (filteredStudies: ResultsType<Study>) => {
  return filteredStudies.sort((a, b) => {
    const nameA = a.unit.split(' ')[1].trim();
    const nameB = b.unit.split(' ')[1].trim();

    const num1 = NumberConverter.get(nameA);
    const num2 = NumberConverter.get(nameB);

    if (num1 && num2) {
      return num1 - num2;
    }

    return 0;
  });
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
