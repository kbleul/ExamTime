import React from 'react';
import {View} from 'react-native';
import UnitSItem from './UnitsItem';
import UnitsItem from './UnitsItem';
import {StyleSheet} from 'react-native';
const tempData = [
  {
    unit: 'Unit 1',
    title:
      'Fundamentals of mathematics , Introduction to Mathematics,Introduction to Mathematics, Introduction to Mathematics,Introduction to Mathematics',
    courses: [
      {
        title: 'Introduction to Mathematics',
        time: '15min',
        isVideo: false,
      },
      {
        title: 'Introduction to Mathematics Two',
        time: '15min',
        isVideo: true,
      },
      {
        title: 'Introduction to Mathematics Three',
        time: '15min',
        isVideo: false,
      },
      {
        title:
          'Introduction to Mathematics Four, Introduction to Mathematics Four',
        time: '15min',
        isVideo: false,
      },
    ],
  },
  {
    unit: 'Unit 2',
    title: 'Fundamentals of mathematics 2',
    courses: [
      {
        title: 'Introduction to Mathematics',
        time: '15min',
        isVideo: false,
      },
      {
        title: 'Introduction to Mathematics Two',
        time: '15min',
        isVideo: true,
      },
      {
        title: 'Introduction to Mathematics Three',
        time: '15min',
        isVideo: false,
      },
      {
        title: 'Introduction to Mathematics Four',
        time: '15min',
        isVideo: false,
      },
    ],
  },
  {
    unit: 'Unit 3',
    title: 'Fundamentals of mathematics 3',
    courses: [
      {
        title: 'Introduction to Mathematics',
        time: '15min',
        isVideo: false,
      },
      {
        title: 'Introduction to Mathematics Two',
        time: '15min',
        isVideo: true,
      },
      {
        title: 'Introduction to Mathematics Three',
        time: '15min',
        isVideo: false,
      },
      {
        title: 'Introduction to Mathematics Four',
        time: '15min',
        isVideo: false,
      },
    ],
  },
  {
    unit: 'Unit 4',
    title: 'Fundamentals of mathematics Four',
    courses: [
      {
        title: 'Introduction to Mathematics',
        time: '15min',
        isVideo: false,
      },
      {
        title: 'Introduction to Mathematics Two',
        time: '15min',
        isVideo: true,
      },
      {
        title: 'Introduction to Mathematics Three',
        time: '15min',
        isVideo: false,
      },
      {
        title: 'Introduction to Mathematics Four',
        time: '15min',
        isVideo: false,
      },
    ],
  },
  {
    unit: 'Unit 5',
    title: 'Fundamentals of mathematics Five',
    courses: [
      {
        title: 'Introduction to Mathematics',
        time: '15min',
        isVideo: false,
      },
      {
        title: 'Introduction to Mathematics Two',
        time: '15min',
        isVideo: true,
      },
      {
        title: 'Introduction to Mathematics Three',
        time: '15min',
        isVideo: false,
      },
      {
        title: 'Introduction to Mathematics Four',
        time: '15min',
        isVideo: false,
      },
    ],
  },
];

type UnitsAccordionType = {
  showAuthPromp: boolean;
  setShowAuthPromp: React.Dispatch<React.SetStateAction<boolean>>;
};

const UnitsAccordion: React.FC<UnitsAccordionType> = ({
  showAuthPromp,
  setShowAuthPromp,
}) => {
  return (
    <View style={styles.container}>
      {tempData.map(item => (
        <UnitsItem
          key={item.unit}
          unitData={item}
          setShowAuthPromp={setShowAuthPromp}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingBottom: 90,
    marginBottom: 250,
  },
});

export default UnitsAccordion;
