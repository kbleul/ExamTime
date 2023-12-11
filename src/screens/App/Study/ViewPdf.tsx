import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {screenHeight, screenWidth} from '../../../utils/Data/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../Realm/model';
import {Study} from '../../../Realm';
import {calculate_and_Assign_UnitProgress} from './logic';

const ViewPdf = ({route}) => {
  const {pdf, studyId} = route.params;
  const navigator: any = useNavigation();

  const {useRealm, useQuery} = AuthContext;
  const realm = useRealm();
  const savedStudy = useQuery(Study, studyItem => {
    return studyItem.filtered(`id == "${studyId}"`);
  });

  const [pdfCounter, setPdfCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const source = {
    uri: pdf[pdfCounter].pdfDocument,
    cache: true,
  };

  const saveProgress = useCallback((page: number, numberOfPages: number) => {
    if (
      page > numberOfPages / 2 &&
      savedStudy[0].pdf[pdfCounter].isViewed === false
    ) {
      calculate_and_Assign_UnitProgress(savedStudy[0], realm);

      realm.write(() => {
        savedStudy[0].pdf[pdfCounter].isViewed = true;
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        touchSoundDisabled
        style={styles.backBtn}
        onPress={() => navigator.goBack()}>
        <Ionicons name="arrow-back" color="#000" size={25} />
      </TouchableOpacity>
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={() => setIsLoading(false)}
        onPageChanged={(page, numberOfPages) =>
          saveProgress(page, numberOfPages)
        }
        onError={error => {
          console.log(error);
        }}
        style={styles.pdf}
      />

      {pdf.length > 1 && !isLoading && (
        <NavgateButtons
          totalPdfs={pdf.length}
          pdfCounter={pdfCounter}
          setPdfCounter={setPdfCounter}
          setIsLoading={setIsLoading}
        />
      )}
    </View>
  );
};

const NavgateButtons = ({
  totalPdfs,
  pdfCounter,
  setPdfCounter,
  setIsLoading,
}: {
  totalPdfs: number;
  pdfCounter: number;
  setPdfCounter: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <View style={buttonsStyles.container}>
      {pdfCounter > 0 && (
        <TouchableOpacity
          touchSoundDisabled
          style={buttonsStyles.button}
          onPress={() => {
            setIsLoading(true);
            setPdfCounter(prev => --prev);
          }}>
          <Text style={buttonsStyles.text}>Prev.</Text>
        </TouchableOpacity>
      )}
      {pdfCounter < totalPdfs - 1 && (
        <TouchableOpacity
          touchSoundDisabled
          style={buttonsStyles.button}
          onPress={() => {
            setIsLoading(true);
            setPdfCounter(prev => ++prev);
          }}>
          <Text style={buttonsStyles.text}>Next.</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: '#fff',
    paddingVertical: 10,
    position: 'relative',
  },
  backBtn: {
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 100,
  },
  pdf: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#fff',
  },
});

const buttonsStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 200,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CB050',
  },
  buttonSecondary: {
    backgroundColor: '#0081BA',
  },
  text: {
    fontFamily: 'PoppinsSemiBold',
    color: 'white',
    fontSize: 12,
  },
});

export default ViewPdf;
