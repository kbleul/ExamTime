import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../reduxToolkit/Store';
import {userType} from '../../types';

type UnitsItemProps = {
  unitData: any;
  setShowAuthPromp: React.Dispatch<React.SetStateAction<boolean>>;
};

const UnitsItem: React.FC<UnitsItemProps> = ({unitData, setShowAuthPromp}) => {
  const navigation = useNavigation();
  const isSubscribed = useSelector(
    (state: RootState) => state.auth.isSubscribed,
  );

  const [showMore, setShowMore] = useState(false);

  const handleViewCourse = (unit: any) => {
    if (isSubscribed) {
      navigation.navigate('View-Course-Content', {
        isVideo: unit.isVideo,
      });
    } else {
      unitData.unit === 'Unit 1'
        ? navigation.navigate('View-Course-Content', {
            isVideo: unit.isVideo,
          })
        : setShowAuthPromp(true);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        touchSoundDisabled
        style={styles.unitsCOntainer}
        onPress={() => setShowMore(prev => !prev)}>
        <Text style={styles.unitText}>{unitData.unit}</Text>
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
          {unitData.title}
        </Text>
        {showMore ? (
          <AntDesign name="up" size={18} color="#008E97" />
        ) : (
          <AntDesign name="down" size={18} color="#008E97" />
        )}
      </TouchableOpacity>

      {showMore && (
        <View>
          {unitData?.courses?.map((unitCourse: any, index: number) => (
            <TouchableOpacity
              onPress={() => handleViewCourse(unitCourse)}
              touchSoundDisabled
              key={unitCourse.title + 'tail' + index}
              style={styles.moreContainer}>
              <View style={styles.leftSection}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={
                    isSubscribed || unitData.unit === 'Unit 1'
                      ? styles.moreTitle
                      : [styles.moreTitle, styles.moreTitleLocked]
                  }>
                  {unitCourse.title}
                </Text>
                <Text style={styles.timeText}>
                  {unitCourse.isVideo ? 'Video' : 'Reading'} {unitCourse.time}
                </Text>
              </View>

              {isSubscribed || unitData.unit === 'Unit 1' ? (
                <>
                  {++index === 1 ? (
                    <Feather name="check-square" size={22} color="#1E90FF" />
                  ) : unitCourse.isVideo ? (
                    <AntDesign name="playcircleo" size={22} color="#1E90FF" />
                  ) : (
                    <Feather name="square" size={22} color="#1E90FF" />
                  )}
                </>
              ) : (
                <Fontisto name="locked" size={18} color="#747575" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },

  unitsCOntainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 18,
  },
  unitText: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    fontSize: 18,
  },
  titleText: {
    fontFamily: 'Montserrat-Regular',
    color: 'black',
    width: '70%',
    marginRight: 2,
    fontSize: 17,
  },
  moreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '94%',
    marginLeft: '3%',
    backgroundColor: '#e4eaf0',
    borderRadius: 10,
    paddingVertical: 6,
    marginTop: 5,
  },
  leftSection: {
    width: '80%',
  },
  moreTitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: '#1E90FF',
  },
  moreTitleLocked: {
    color: '#747575',
  },
  timeText: {
    fontFamily: 'Montserrat-Regular',
    marginRight: 2,
    fontSize: 15,
  },
});

export default UnitsItem;
