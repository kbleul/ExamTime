import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import {AuthContext} from '../../Realm/model';
import {StudyTips, Subject, UserData} from '../../Realm';

import {useGetTipsMutation} from '../../reduxToolkit/Services/auth';
import {fetchTips} from '../../utils/Functions/Get';
import {TipType, subjectType} from '../../types';
import AllTipsModal from './AllTipsModal';

const Tips: React.FC<{
  selectedSubject: Subject | subjectType | null;
}> = ({selectedSubject}) => {
  const {useQuery, useRealm} = AuthContext;
  const realm = useRealm();

  const userData = useQuery(UserData);

  const savedTips = useQuery(StudyTips);

  const [tips, setTips] = useState<TipType[] | null>(null);

  const [showTipsModal, setShowTipsModal] = useState(false);

  const [getTips] = useGetTipsMutation();

  useEffect(() => {
    if (savedTips.length === 0 && selectedSubject) {
      fetchTips(
        getTips,
        realm,
        setTips,
        selectedSubject,
        userData[0]?.grade ? userData[0].grade.id || null : null,
      );
    }
  }, []);

  useEffect(() => {
    if (savedTips) {
      setTips([
        ...savedTips.filter(
          tip => tip?.subject?.id === selectedSubject?.subject?.id,
        ),
      ]);
    }
  }, [selectedSubject, savedTips]);

  return (
    <>
      {(!tips || tips.length === 0) && (
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/Images//Practice/tip.png')}
              resizeMode="cover"
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.tipTitle}>
              No tips found for {selectedSubject?.subject?.subject}
            </Text>
            <Text style={styles.tipText}>Try anonther subject</Text>
          </View>
        </View>
      )}
      {tips && tips.length > 0 && (
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/Images//Practice/tip.png')}
              resizeMode="cover"
            />
          </View>

          <TouchableOpacity
            touchSoundDisabled
            style={styles.textContainer}
            onPress={() => setShowTipsModal(true)}>
            <Text style={styles.tipTitle}>{tips[0].tipType}</Text>
            <Text style={styles.tipText}>{tips[0].tip}</Text>
            <Text style={[styles.readmore, styles.readmore]}>Read more</Text>
          </TouchableOpacity>

          <AllTipsModal
            showTipsModal={showTipsModal}
            setShowTipsModal={setShowTipsModal}
            tips={tips}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginTop: screenHeight * 0.028,
    marginBottom: screenHeight * 0.015,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#5EB4CF',
  },
  imgContainer: {
    width: '14%',
    borderRadius: 300,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    minWidth: 25,
    height: 37,
  },
  textContainer: {
    width: '86%',
    paddingHorizontal: '2%',
  },
  tipTitle: {
    fontFamily: 'PoppinsSemiBold',
    color: 'black',
    fontSize: screenWidth * 0.032,
  },
  tipText: {
    fontFamily: 'PoppinsRegular',
    color: 'black',
    fontSize: screenWidth * 0.028,
    maxHeight: screenHeight * 0.05,
  },
  readmore: {
    color: '#1E90FF',
    fontSize: screenWidth * 0.032,
  },
});

export default Tips;
